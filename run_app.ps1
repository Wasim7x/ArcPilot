Write-Host "Starting ArcPilot with Ollama LLM..." -ForegroundColor Cyan
$env:PYTHONPATH = "$PSScriptRoot\.venv\Lib\site-packages;$PSScriptRoot"
& "C:\Users\wasim\AppData\Roaming\uv\python\cpython-3.12-windows-x86_64-none\python.exe" -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
