# Create a name for environment:
### ```$myvenv = venv```

# Create virtual environment:
### ```$ python -m venv ${venv}```

# Activate the virtual environment:
### ```.\${myenv}\Scripts\activate```

# Install requirements for app:
### ```pip install -r .\requirements.txt```

# Install server for the app:
### ```pip install uvicorn```

# Run server on desired ports:
### Use:
### 1) .env file with starting script !!!Not implemented!!!
### 2) Use environment variables with starting script
### 3) Type manually port number
### ```uvicorn app.app:app --host 0.0.0.0 --port ${PORT:-4000}```

# To test, install these packages:
### ```pip install pytest pytest-asyncio httpx pytest-mock```

# To run tests:
### ```pytest```