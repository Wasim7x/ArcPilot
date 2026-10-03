/**
 * Artifact Export and File Download Utilities
 */

export function downloadBlob(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportArtifact(type, format, data, taskId = 'task') {
  if (!data) return;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `ArcPilot-${type}-${timestamp}`;

  if (format === 'json') {
    const jsonStr = JSON.stringify(data, null, 2);
    downloadBlob(jsonStr, `${filename}.json`, 'application/json');
  } else if (format === 'txt') {
    const textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    downloadBlob(textContent, `${filename}.txt`, 'text/plain');
  } else if (format === 'html') {
    const rawContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ArcPilot Export: ${type.toUpperCase()}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; background: #f8fafc; color: #1e293b; line-height: 1.6; }
    .header { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #e2e8f0; }
    h1 { margin: 0 0 8px 0; font-size: 24px; color: #0f172a; }
    .meta { font-size: 13px; color: #64748b; font-family: monospace; }
    pre { background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; overflow-x: auto; font-size: 13px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>ArcPilot SDLC Export — ${type.replace(/_/g, ' ').toUpperCase()}</h1>
    <div class="meta">Workflow Task ID: ${taskId} | Exported: ${new Date().toLocaleString()}</div>
  </div>
  <pre>${rawContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>`;
    downloadBlob(htmlContent, `${filename}.html`, 'text/html');
  }
}
