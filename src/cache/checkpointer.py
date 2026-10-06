import base64
import json
import sqlite3
import threading
from pathlib import Path
from typing import Any, AsyncIterator, Iterator, Sequence

from langchain_core.runnables import RunnableConfig
from langgraph.checkpoint.base import (
    WRITES_IDX_MAP,
    BaseCheckpointSaver,
    ChannelVersions,
    Checkpoint,
    CheckpointMetadata,
    CheckpointTuple,
    get_checkpoint_id,
    get_checkpoint_metadata,
)
from langgraph.checkpoint.serde.jsonplus import JsonPlusSerializer

from src.cache.radis_cache import get_redis_client, is_redis_available
from src.logger import logger
from src.storage import get_checkpoints_db_path, is_production


class DurableCheckpointSaver(BaseCheckpointSaver):
    """
    Production-grade durable checkpoint saver for LangGraph.
    - In Production (Free Render): External Redis is the primary durable store.
      Checkpoints, channel blobs, and writes are persisted without requiring Render Persistent Disk.
      Silent fallback to ephemeral storage is strictly prevented.
    - In Development: Uses local SQLite with optional Redis mirroring for offline local workflows.
    """

    def __init__(self, db_path: str | Path | None = None):
        super().__init__(serde=JsonPlusSerializer())
        if db_path is None:
            self.db_path = str(get_checkpoints_db_path())
        else:
            self.db_path = str(db_path)
        self._lock = threading.Lock()
        self._init_db()

    def _get_conn(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self) -> None:
        try:
            Path(self.db_path).parent.mkdir(parents=True, exist_ok=True)
            with self._lock, self._get_conn() as conn:
                conn.executescript("""
                    CREATE TABLE IF NOT EXISTS checkpoints (
                        thread_id TEXT,
                        checkpoint_ns TEXT,
                        checkpoint_id TEXT,
                        parent_checkpoint_id TEXT,
                        cp_type TEXT,
                        cp_data BLOB,
                        md_type TEXT,
                        md_data BLOB,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        PRIMARY KEY (thread_id, checkpoint_ns, checkpoint_id)
                    );
                    CREATE TABLE IF NOT EXISTS writes (
                        thread_id TEXT,
                        checkpoint_ns TEXT,
                        checkpoint_id TEXT,
                        task_id TEXT,
                        idx INTEGER,
                        channel TEXT,
                        val_type TEXT,
                        val_data BLOB,
                        task_path TEXT,
                        PRIMARY KEY (thread_id, checkpoint_ns, checkpoint_id, task_id, idx)
                    );
                    CREATE TABLE IF NOT EXISTS blobs (
                        thread_id TEXT,
                        checkpoint_ns TEXT,
                        channel TEXT,
                        version TEXT,
                        blob_type TEXT,
                        blob_data BLOB,
                        PRIMARY KEY (thread_id, checkpoint_ns, channel, version)
                    );
                    CREATE INDEX IF NOT EXISTS idx_checkpoints_thread
                        ON checkpoints(thread_id, checkpoint_ns, checkpoint_id);
                """)
        except Exception as e:
            if is_production():
                logger.info(f"Local SQLite DB init bypassed/skipped in production ({e}).")
            else:
                logger.warning(f"Could not initialize local SQLite checkpointer db: {e}")

    def put(
        self,
        config: RunnableConfig,
        checkpoint: Checkpoint,
        metadata: CheckpointMetadata,
        new_versions: ChannelVersions,
    ) -> RunnableConfig:
        c = checkpoint.copy()
        thread_id = config["configurable"]["thread_id"]
        checkpoint_ns = config["configurable"].get("checkpoint_ns", "")
        values = c.pop("channel_values")
        cp_type, cp_data = self.serde.dumps_typed(c)
        md_type, md_data = self.serde.dumps_typed(get_checkpoint_metadata(config, metadata))
        parent_cp_id = config["configurable"].get("checkpoint_id")

        # 1. Primary persistence in Production: External Redis
        redis_saved = False
        client = get_redis_client()
        if client:
            try:
                cp_key = f"sdlc:cp:{thread_id}:{checkpoint_ns}:{checkpoint['id']}"
                payload = {
                    "parent_id": parent_cp_id or "",
                    "cp_type": cp_type,
                    "cp_data": base64.b64encode(cp_data).decode("ascii"),
                    "md_type": md_type,
                    "md_data": base64.b64encode(md_data).decode("ascii"),
                }
                client.set(cp_key, json.dumps(payload), ex=604800)

                # Update thread checkpoints list & global thread registry
                idx_key = f"sdlc:thread_cps:{thread_id}:{checkpoint_ns}"
                client.rpush(idx_key, checkpoint["id"])
                client.expire(idx_key, 604800)
                client.sadd("sdlc:threads", f"{thread_id}:{checkpoint_ns}")

                # Save blobs in Redis
                for k, v in new_versions.items():
                    if k in values:
                        b_type, b_data = self.serde.dumps_typed(values[k])
                    else:
                        b_type, b_data = ("empty", b"")
                    blob_key = f"sdlc:blob:{thread_id}:{checkpoint_ns}:{k}:{str(v)}"
                    blob_payload = {
                        "b_type": b_type,
                        "b_data": base64.b64encode(b_data).decode("ascii"),
                    }
                    client.set(blob_key, json.dumps(blob_payload), ex=604800)
                redis_saved = True
            except Exception as e:
                logger.error(f"Error persisting checkpoint to Redis: {e}")
                if is_production():
                    raise RuntimeError(
                        f"CRITICAL PRODUCTION ERROR: Failed to persist checkpoint to external Redis: {e}. "
                        "Aborting to prevent data loss on ephemeral infrastructure."
                    ) from e

        # Production Guard: Must have saved to external Redis
        if is_production() and not redis_saved:
            raise RuntimeError(
                "CRITICAL PRODUCTION ERROR: Cannot save checkpoint because external Redis is unavailable. "
                "Silent fallback to local ephemeral storage is disabled in production."
            )

        # 2. Auxiliary local persistence for development or local process cache
        try:
            with self._lock, self._get_conn() as conn:
                for k, v in new_versions.items():
                    if k in values:
                        b_type, b_data = self.serde.dumps_typed(values[k])
                    else:
                        b_type, b_data = ("empty", b"")
                    conn.execute(
                        "INSERT OR REPLACE INTO blobs VALUES (?, ?, ?, ?, ?, ?)",
                        (thread_id, checkpoint_ns, k, str(v), b_type, b_data),
                    )
                conn.execute(
                    "INSERT OR REPLACE INTO checkpoints VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
                    (
                        thread_id,
                        checkpoint_ns,
                        checkpoint["id"],
                        parent_cp_id,
                        cp_type,
                        cp_data,
                        md_type,
                        md_data,
                    ),
                )
        except Exception as e:
            if not is_production():
                logger.warning(f"Failed to write to local SQLite ({e})")

        logger.info(
            f"Workflow checkpoint saved: thread={thread_id}, checkpoint={checkpoint['id']} "
            f"[backend={'redis' if redis_saved else 'sqlite'}]"
        )
        return {
            "configurable": {
                "thread_id": thread_id,
                "checkpoint_ns": checkpoint_ns,
                "checkpoint_id": checkpoint["id"],
            }
        }

    async def aput(
        self,
        config: RunnableConfig,
        checkpoint: Checkpoint,
        metadata: CheckpointMetadata,
        new_versions: ChannelVersions,
    ) -> RunnableConfig:
        return self.put(config, checkpoint, metadata, new_versions)

    def put_writes(
        self,
        config: RunnableConfig,
        writes: Sequence[tuple[str, Any]],
        task_id: str,
        task_path: str = "",
    ) -> None:
        thread_id = config["configurable"]["thread_id"]
        checkpoint_ns = config["configurable"].get("checkpoint_ns", "")
        checkpoint_id = config["configurable"]["checkpoint_id"]

        # Primary: Persist writes to Redis
        client = get_redis_client()
        redis_saved = False
        if client:
            try:
                writes_list_key = f"sdlc:writes_list:{thread_id}:{checkpoint_ns}:{checkpoint_id}"
                for idx, (c, v) in enumerate(writes):
                    write_idx = WRITES_IDX_MAP.get(c, idx)
                    val_type, val_data = self.serde.dumps_typed(v)
                    write_key = f"sdlc:write:{thread_id}:{checkpoint_ns}:{checkpoint_id}:{task_id}:{write_idx}"
                    payload = {
                        "task_id": task_id,
                        "write_idx": write_idx,
                        "channel": c,
                        "val_type": val_type,
                        "val_data": base64.b64encode(val_data).decode("ascii"),
                        "task_path": task_path,
                    }
                    client.set(write_key, json.dumps(payload), ex=604800)
                    client.rpush(writes_list_key, json.dumps(payload))
                client.expire(writes_list_key, 604800)
                redis_saved = True
            except Exception as e:
                logger.error(f"Error persisting writes to Redis: {e}")
                if is_production():
                    raise RuntimeError(f"CRITICAL PRODUCTION ERROR: Failed to persist writes to Redis: {e}") from e

        if is_production() and not redis_saved:
            raise RuntimeError(
                "CRITICAL PRODUCTION ERROR: Cannot save pending writes because external Redis is unavailable."
            )

        # Auxiliary: Persist writes to local SQLite (dev)
        try:
            with self._lock, self._get_conn() as conn:
                for idx, (c, v) in enumerate(writes):
                    write_idx = WRITES_IDX_MAP.get(c, idx)
                    val_type, val_data = self.serde.dumps_typed(v)
                    conn.execute(
                        "INSERT OR REPLACE INTO writes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        (
                            thread_id,
                            checkpoint_ns,
                            checkpoint_id,
                            task_id,
                            write_idx,
                            c,
                            val_type,
                            val_data,
                            task_path,
                        ),
                    )
        except Exception as e:
            if not is_production():
                logger.warning(f"Failed to write pending writes to local SQLite ({e})")

    async def aput_writes(
        self,
        config: RunnableConfig,
        writes: Sequence[tuple[str, Any]],
        task_id: str,
        task_path: str = "",
    ) -> None:
        self.put_writes(config, writes, task_id, task_path)

    def _load_blobs_from_redis(
        self, thread_id: str, checkpoint_ns: str, versions: ChannelVersions
    ) -> dict[str, Any] | None:
        client = get_redis_client()
        if not client:
            return None
        result = {}
        for k, ver in versions.items():
            blob_key = f"sdlc:blob:{thread_id}:{checkpoint_ns}:{k}:{str(ver)}"
            raw = client.get(blob_key)
            if raw:
                try:
                    data = json.loads(raw)
                    b_type = data["b_type"]
                    b_data = base64.b64decode(data["b_data"])
                    if b_type != "empty":
                        result[k] = self.serde.loads_typed((b_type, b_data))
                except Exception as e:
                    logger.warning(f"Error deserializing blob for channel {k} from Redis: {e}")
            else:
                logger.debug(f"Blob not found in Redis for key: {blob_key}")
        return result

    def _load_blobs_from_sqlite(
        self, thread_id: str, checkpoint_ns: str, versions: ChannelVersions
    ) -> dict[str, Any]:
        result = {}
        with self._lock, self._get_conn() as conn:
            for k, ver in versions.items():
                cur = conn.execute(
                    "SELECT blob_type, blob_data FROM blobs WHERE thread_id=? AND checkpoint_ns=? AND channel=? AND version=?",
                    (thread_id, checkpoint_ns, k, str(ver)),
                )
                row = cur.fetchone()
                if row:
                    b_type, b_data = row[0], row[1]
                    if b_type != "empty":
                        result[k] = self.serde.loads_typed((b_type, b_data))
        return result

    def get_tuple(self, config: RunnableConfig) -> CheckpointTuple | None:
        thread_id = config["configurable"]["thread_id"]
        checkpoint_ns = config["configurable"].get("checkpoint_ns", "")
        checkpoint_id = get_checkpoint_id(config)

        # 1. Try Redis first (Primary durable store)
        if is_redis_available():
            tup = self._get_tuple_from_redis(thread_id, checkpoint_ns, checkpoint_id, config)
            if tup is not None:
                return tup
            if is_production():
                # In production, do not fall back to local SQLite
                logger.info(f"Checkpoint not found in Redis for thread={thread_id}, id={checkpoint_id}")
                return None

        # Production Guard: If Redis is unavailable in production, do not silently query local SQLite
        if is_production():
            raise RuntimeError(
                "CRITICAL PRODUCTION ERROR: Cannot retrieve checkpoint because external Redis is unavailable."
            )

        # 2. Local SQLite lookup (Development mode)
        return self._get_tuple_from_sqlite(thread_id, checkpoint_ns, checkpoint_id, config)

    def _get_tuple_from_redis(
        self,
        thread_id: str,
        checkpoint_ns: str,
        checkpoint_id: str | None,
        config: RunnableConfig,
    ) -> CheckpointTuple | None:
        client = get_redis_client()
        if not client:
            return None
        try:
            if not checkpoint_id:
                idx_key = f"sdlc:thread_cps:{thread_id}:{checkpoint_ns}"
                latest = client.lindex(idx_key, -1)
                if not latest:
                    return None
                checkpoint_id = latest

            cp_key = f"sdlc:cp:{thread_id}:{checkpoint_ns}:{checkpoint_id}"
            raw = client.get(cp_key)
            if not raw:
                return None
            data = json.loads(raw)
            cp_type = data["cp_type"]
            cp_data = base64.b64decode(data["cp_data"])
            md_type = data["md_type"]
            md_data = base64.b64decode(data["md_data"])
            parent_id = data.get("parent_id") or None

            checkpoint_ = self.serde.loads_typed((cp_type, cp_data))
            metadata = self.serde.loads_typed((md_type, md_data))

            # Channel values from Redis blobs
            channel_values = self._load_blobs_from_redis(
                thread_id, checkpoint_ns, checkpoint_["channel_versions"]
            )
            if channel_values is None:
                channel_values = {}

            # Load pending writes from Redis
            writes_list_key = f"sdlc:writes_list:{thread_id}:{checkpoint_ns}:{checkpoint_id}"
            raw_writes = client.lrange(writes_list_key, 0, -1)
            pending_writes = []
            for item_raw in raw_writes:
                try:
                    w = json.loads(item_raw)
                    val = self.serde.loads_typed((w["val_type"], base64.b64decode(w["val_data"])))
                    pending_writes.append((w["task_id"], w["channel"], val))
                except Exception as ex:
                    logger.warning(f"Error loading pending write from Redis: {ex}")

            logger.info(f"Workflow checkpoint restored from Redis: thread={thread_id}, checkpoint={checkpoint_id}")
            return CheckpointTuple(
                config={
                    "configurable": {
                        "thread_id": thread_id,
                        "checkpoint_ns": checkpoint_ns,
                        "checkpoint_id": checkpoint_id,
                    }
                },
                checkpoint={
                    **checkpoint_,
                    "channel_values": channel_values,
                },
                metadata=metadata,
                parent_config=(
                    {
                        "configurable": {
                            "thread_id": thread_id,
                            "checkpoint_ns": checkpoint_ns,
                            "checkpoint_id": parent_id,
                        }
                    }
                    if parent_id
                    else None
                ),
                pending_writes=pending_writes,
            )
        except Exception as e:
            logger.warning(f"Error reading checkpoint from Redis: {e}")
            return None

    def _get_tuple_from_sqlite(
        self,
        thread_id: str,
        checkpoint_ns: str,
        checkpoint_id: str | None,
        config: RunnableConfig,
    ) -> CheckpointTuple | None:
        try:
            with self._lock, self._get_conn() as conn:
                if checkpoint_id:
                    cur = conn.execute(
                        "SELECT checkpoint_id, parent_checkpoint_id, cp_type, cp_data, md_type, md_data "
                        "FROM checkpoints WHERE thread_id=? AND checkpoint_ns=? AND checkpoint_id=?",
                        (thread_id, checkpoint_ns, checkpoint_id),
                    )
                else:
                    cur = conn.execute(
                        "SELECT checkpoint_id, parent_checkpoint_id, cp_type, cp_data, md_type, md_data "
                        "FROM checkpoints WHERE thread_id=? AND checkpoint_ns=? ORDER BY checkpoint_id DESC LIMIT 1",
                        (thread_id, checkpoint_ns),
                    )
                row = cur.fetchone()
                if not row:
                    return None

                cp_id, parent_id, cp_type, cp_data, md_type, md_data = row
                cur_w = conn.execute(
                    "SELECT task_id, channel, val_type, val_data FROM writes "
                    "WHERE thread_id=? AND checkpoint_ns=? AND checkpoint_id=?",
                    (thread_id, checkpoint_ns, cp_id),
                )
                writes = cur_w.fetchall()

            checkpoint_ = self.serde.loads_typed((cp_type, cp_data))
            metadata = self.serde.loads_typed((md_type, md_data))
            pending_writes = [
                (w[0], w[1], self.serde.loads_typed((w[2], w[3]))) for w in writes
            ]

            logger.info(f"Workflow checkpoint restored from SQLite: thread={thread_id}, checkpoint={cp_id}")
            return CheckpointTuple(
                config={
                    "configurable": {
                        "thread_id": thread_id,
                        "checkpoint_ns": checkpoint_ns,
                        "checkpoint_id": cp_id,
                    }
                },
                checkpoint={
                    **checkpoint_,
                    "channel_values": self._load_blobs_from_sqlite(
                        thread_id, checkpoint_ns, checkpoint_["channel_versions"]
                    ),
                },
                metadata=metadata,
                parent_config=(
                    {
                        "configurable": {
                            "thread_id": thread_id,
                            "checkpoint_ns": checkpoint_ns,
                            "checkpoint_id": parent_id,
                        }
                    }
                    if parent_id
                    else None
                ),
                pending_writes=pending_writes,
            )
        except Exception as e:
            logger.warning(f"Error reading checkpoint from SQLite: {e}")
            return None

    async def aget_tuple(self, config: RunnableConfig) -> CheckpointTuple | None:
        return self.get_tuple(config)

    def list(
        self,
        config: RunnableConfig | None,
        *,
        filter: dict[str, Any] | None = None,
        before: RunnableConfig | None = None,
        limit: int | None = None,
    ) -> Iterator[CheckpointTuple]:
        # 1. If Redis is available, enumerate from Redis
        client = get_redis_client()
        if client:
            thread_id = config["configurable"]["thread_id"] if config else None
            checkpoint_ns = config["configurable"].get("checkpoint_ns", "") if config else ""

            if thread_id:
                idx_key = f"sdlc:thread_cps:{thread_id}:{checkpoint_ns}"
                cp_ids = client.lrange(idx_key, 0, -1)
                yielded = 0
                for cid in reversed(cp_ids):
                    cfg = {
                        "configurable": {
                            "thread_id": thread_id,
                            "checkpoint_ns": checkpoint_ns,
                            "checkpoint_id": cid,
                        }
                    }
                    tup = self.get_tuple(cfg)
                    if tup:
                        yield tup
                        yielded += 1
                        if limit and yielded >= limit:
                            return
                return
            else:
                # Iterate across all registered threads
                thread_entries = client.smembers("sdlc:threads")
                yielded = 0
                for entry in thread_entries:
                    parts = entry.split(":", 1)
                    t_id = parts[0]
                    t_ns = parts[1] if len(parts) > 1 else ""
                    idx_key = f"sdlc:thread_cps:{t_id}:{t_ns}"
                    cp_ids = client.lrange(idx_key, 0, -1)
                    for cid in reversed(cp_ids):
                        cfg = {
                            "configurable": {
                                "thread_id": t_id,
                                "checkpoint_ns": t_ns,
                                "checkpoint_id": cid,
                            }
                        }
                        tup = self.get_tuple(cfg)
                        if tup:
                            yield tup
                            yielded += 1
                            if limit and yielded >= limit:
                                return
                return

        if is_production():
            raise RuntimeError("CRITICAL PRODUCTION ERROR: Cannot list checkpoints because Redis is unavailable.")

        # 2. SQLite fallback in development
        thread_id = config["configurable"]["thread_id"] if config else None
        checkpoint_ns = config["configurable"].get("checkpoint_ns") if config else None
        query = "SELECT thread_id, checkpoint_ns, checkpoint_id FROM checkpoints WHERE 1=1"
        params = []
        if thread_id:
            query += " AND thread_id=?"
            params.append(thread_id)
        if checkpoint_ns is not None:
            query += " AND checkpoint_ns=?"
            params.append(checkpoint_ns)
        query += " ORDER BY checkpoint_id DESC"
        if limit:
            query += f" LIMIT {limit}"

        try:
            with self._lock, self._get_conn() as conn:
                rows = conn.execute(query, params).fetchall()

            for r in rows:
                cfg = {
                    "configurable": {
                        "thread_id": r[0],
                        "checkpoint_ns": r[1],
                        "checkpoint_id": r[2],
                    }
                }
                tup = self.get_tuple(cfg)
                if tup:
                    yield tup
        except Exception as e:
            logger.warning(f"Error querying checkpoints from SQLite: {e}")

    async def alist(
        self,
        config: RunnableConfig | None,
        *,
        filter: dict[str, Any] | None = None,
        before: RunnableConfig | None = None,
        limit: int | None = None,
    ) -> AsyncIterator[CheckpointTuple]:
        for item in self.list(config, filter=filter, before=before, limit=limit):
            yield item

    def delete_thread(self, thread_id: str) -> None:
        # Delete from Redis
        client = get_redis_client()
        if client:
            try:
                for pat in [
                    f"sdlc:cp:{thread_id}:*",
                    f"sdlc:thread_cps:{thread_id}:*",
                    f"sdlc:blob:{thread_id}:*",
                    f"sdlc:write:{thread_id}:*",
                    f"sdlc:writes_list:{thread_id}:*",
                ]:
                    keys = client.keys(pat)
                    if keys:
                        client.delete(*keys)
                # Remove from registered threads set
                entries = client.smembers("sdlc:threads")
                for entry in entries:
                    if entry.startswith(f"{thread_id}:"):
                        client.srem("sdlc:threads", entry)
            except Exception as e:
                logger.warning(f"Error deleting thread {thread_id} from Redis: {e}")

        # Delete from SQLite
        try:
            with self._lock, self._get_conn() as conn:
                conn.execute("DELETE FROM checkpoints WHERE thread_id=?", (thread_id,))
                conn.execute("DELETE FROM writes WHERE thread_id=?", (thread_id,))
                conn.execute("DELETE FROM blobs WHERE thread_id=?", (thread_id,))
        except Exception as e:
            if not is_production():
                logger.warning(f"Error deleting thread {thread_id} from SQLite: {e}")

    async def adelete_thread(self, thread_id: str) -> None:
        self.delete_thread(thread_id)

    def get_next_version(self, current: str | None, channel: None) -> str:
        import random

        if current is None:
            current_v = 0
        elif isinstance(current, int):
            current_v = current
        else:
            current_v = int(current.split(".")[0])
        next_v = current_v + 1
        next_h = random.random()
        return f"{next_v:032}.{next_h:016}"


_default_checkpointer: DurableCheckpointSaver | None = None
_checkpointer_lock = threading.Lock()


def get_durable_checkpointer() -> DurableCheckpointSaver:
    """Return a singleton durable checkpointer instance."""
    global _default_checkpointer
    with _checkpointer_lock:
        if _default_checkpointer is None:
            _default_checkpointer = DurableCheckpointSaver()
        return _default_checkpointer
