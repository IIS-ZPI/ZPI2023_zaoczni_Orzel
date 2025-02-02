# ZPI2024_zaoczni_Orzel

## 1. Project implementation technology
The project utilizes the following technologies:

### Frontend:
- React (^18.3.1)
- Vite (^6.0.5)
- Styled Components (^6.1.14)
- Chart.js (^4.4.7)

### Backend:
- FastAPI (^0.115.6)
- Pydantic (^2.10.5)
- Uvicorn (^0.34.0)
- Pytest (for testing)

### Package Management:
- npm (for frontend)
- pip (for backend)

## 2. Software deployment location and execution method

### Deployment location
- Backend Deployment: Render (via GitHub Actions deployment pipeline)
- Frontend Deployment: GitHub Pages (via GitHub Actions workflow)

### To launch locally:

#### **1. Clone the Repository**
```bash
git clone https://github.com/IIS-ZPI/ZPI2024_zaoczni_Orzel.git
cd ZPI2024_zaoczni_Orzel
```

---

#### **2. Frontend Setup**

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

#### **3. Backend Setup**

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
   uvicorn app.app:app --host 0.0.0.0 --port 4000
   ```

5. The backend is now running at:
   ```
   http://localhost:4000
   ```

6. To deactivate virtual environment run:
   ```bash
   deactivate
   ```

---

#### **4. Running unit tests**
   ```bash
    cd backend
    pytest tests/
   ```

## 3. Location of project documentation
Project documentation can be found in the [_./docs_](./docs/) directory.

## 4. Location of backlog
Project backlog can be found under the following link: https://github.com/orgs/IIS-ZPI/projects/24

## 5. Method of CI/CD Implementation with Unit Test Automation

### Continuous Integration (CI) 
Continuous integration is implemented using GitHub Actions, ensuring that code quality and stability are maintained automatically. CI runs automatically on pull requests targeting main, release, and develop branches. It builds the application and runs unit tests. Passing these steps is required to merge pull request to the target branch.

### Continuous Deployment (CD) 
Continuous Deployment ensures that every merged change is automatically built and deployed to the appropriate environment. CD deploys changes on merges to develop (for development) and main (for production). There is additional workflow for deployment to test anvironment that can be run manually for chosen pull request. When pull request is completes the cleanup pipeline removes test environment related to this pull request.

## 6. Location of Reports from the Software Testing and Fixing Procedure

Reports from the acceptance tests are located in the [_./docs_](./docs/) folder. Tests results from testing each story in the backlog can be found under relevant Github issues on our board: https://github.com/orgs/IIS-ZPI/projects/24.