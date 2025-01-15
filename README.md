# ZPI2023_zaoczni_Orzel

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/IIS-ZPI/ZPI2024_zaoczni_Orzel.git
cd ZPI2024_zaoczni_Orzel
```

---

### **2. Frontend Setup**

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

### **3. Backend Setup**

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate    # Linux
   venv\Scripts\activate       # Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   uvicorn app:app --host 0.0.0.0 --port 4000
   ```

5. The backend is now running at:
   ```
   http://localhost:4000
   ```

---

## **Running unit tests**
   ```bash
    cd backend
    pytest tests/
    ```