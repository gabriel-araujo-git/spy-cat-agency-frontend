
# 🐾 Spy Cat Agency – Frontend (Next.js)

This is the **frontend application** for the Spy Cat Agency system, built with Next.js.  
It provides a simple dashboard to manage spy cats by interacting with the backend API.

---

## 🔧 Tech Stack

- Next.js (React framework)  
- Axios (for API requests)  
- Tailwind CSS (optional, can be replaced with any CSS framework)  

---

## 📦 Features

- List all spy cats retrieved from the backend  
- Add a new spy cat (Name, Years of Experience, Breed, Salary)  
- Edit spy cat salary  
- Delete a spy cat  
- Graceful error handling for API errors  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gabriel-araujo-git/spy-cat-agency-frontend.git
cd spy-cat-agency-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🔌 Configuration

Make sure the backend API is running and accessible (default at `http://localhost:8000`).  
You may need to update the API base URL in the frontend code if your backend runs on a different host or port.

---

## 📝 Notes

- This frontend focuses only on the Spy Cats CRUD functionality, not missions or targets.  
- The project uses a `.gitignore` to exclude `node_modules` and build artifacts from version control.

---

## 📁 Project Structure

```
spy-cat-agency-frontend/
├── components/
├── pages/
├── public/
├── styles/
├── .gitignore
├── package.json
├── README.md
└── next.config.js
```

---
