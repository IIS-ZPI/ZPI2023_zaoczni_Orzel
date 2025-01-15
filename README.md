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

3. Create environment files:
   - **`frontend/.env.development`**:
     ```env
     VITE_BASE_URL=http://localhost:4000
     ```
   - **`frontend/.env.production`**:
     ```env
     VITE_BASE_URL=https://zpi2024-zaoczni-orzel.onrender.com
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
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
   python3 -m venv venv
   venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   ./start.sh
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