from src.cache.radis_cache import delete_from_redis, flush_redis_cache, get_state_from_redis, save_state_to_redis


def test_cache_save_and_retrieve():
    task_id = "test-task-cache-01"
    state = {
        "project_name": "Test Project",
        "progress": 50,
        "status": "in_progress"
    }
    save_state_to_redis(task_id, state)
    retrieved = get_state_from_redis(task_id)
    assert retrieved is not None
    assert retrieved["project_name"] == "Test Project"
    assert retrieved["progress"] == 50

def test_cache_isolation_between_workflows():
    task_a = "workflow-alpha"
    task_b = "workflow-beta"

    save_state_to_redis(task_a, {"project": "Alpha", "step": 1})
    save_state_to_redis(task_b, {"project": "Beta", "step": 2})

    state_a = get_state_from_redis(task_a)
    state_b = get_state_from_redis(task_b)

    assert state_a["project"] == "Alpha"
    assert state_b["project"] == "Beta"

    # Deleting alpha must not affect beta
    delete_from_redis(task_a)
    assert get_state_from_redis(task_a) is None
    assert get_state_from_redis(task_b)["project"] == "Beta"

    # Cleanup
    delete_from_redis(task_b)

def test_safe_flush_with_task_id():
    task_c = "workflow-gamma"
    save_state_to_redis(task_c, {"project": "Gamma"})
    assert get_state_from_redis(task_c) is not None

    flush_redis_cache(task_id=task_c)
    assert get_state_from_redis(task_c) is None
