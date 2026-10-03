/**
 * Utility functions for safe text rendering and artifact formatting.
 * Strictly guarantees that no "[object Object]" is ever rendered to the user.
 */

export function safeText(val, fallback = '') {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);

  if (Array.isArray(val)) {
    return val.map((v) => safeText(v)).filter(Boolean).join(', ');
  }

  if (typeof val === 'object') {
    // If it has recognized text attributes, prioritize them
    if (typeof val.description === 'string') return val.description;
    if (typeof val.title === 'string') return val.title;
    if (typeof val.name === 'string') return val.name;
    if (typeof val.summary === 'string') return val.summary;
    if (typeof val.text === 'string') return val.text;
    if (typeof val.content === 'string') return val.content;
    if (typeof val.message === 'string') return val.message;
    if (typeof val.value === 'string') return val.value;

    try {
      return JSON.stringify(val, null, 2);
    } catch {
      return fallback;
    }
  }

  return String(val);
}

export function safeList(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    return val.split('\n').map((s) => s.trim()).filter(Boolean);
  }
  return [val];
}
