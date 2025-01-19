# PowerShell script equivalent to the Bash script
# This script runs a Uvicorn server for a Python FastAPI app
# Default port is set to 4000 if the $env:PORT environment variable is not set

$port = $env:PORT -ne $null ? $env:PORT : 4000
uvicorn app.app:app --host 0.0.0.0 --port $port