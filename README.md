<div align="center">

# 🚀 VertexLearn AI

### AI-Powered Learning Management System with an Intelligent AI Tutor

**Learn smarter. Learn faster. Learn with AI.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20VertexLearn-7C3AED?style=for-the-badge)](https://vertexlearn-ai.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Source%20Code-181717?style=for-the-badge&logo=github)](https://github.com/AryaRaj487567/vertexlearn-ai)
[![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![AI Service](https://img.shields.io/badge/AI%20Service-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

</div>

---

## 🌐 Live Application

### 👉 [Open VertexLearn AI](https://vertexlearn-ai.vercel.app/)

**Backend:** `https://vertexlearn-ai.onrender.com`  
**AI Service:** `https://vertexlearn-ai-production.up.railway.app`

---

## 📌 About the Project

**VertexLearn AI** is a full-stack, AI-powered Learning Management System (LMS) designed to provide a modern and personalized online learning experience.

The platform combines a traditional LMS with an **AI Tutor powered by Retrieval-Augmented Generation (RAG)**. The AI Tutor retrieves relevant information from course and lecture content before generating contextual responses.

### Core architecture

- 🎨 React + Vite frontend
- ⚙️ Node.js + Express backend
- 🗄️ MongoDB + Mongoose
- 🤖 Dedicated FastAPI AI service
- 🔎 FAISS vector search
- 🧠 Gemini-powered responses
- 🔐 JWT authentication
- ☁️ Vercel + Render + Railway deployment

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Protected routes
- Role-based access control
- Student, instructor and admin workflows

### 📚 Learning Management
- Course browsing and management
- Course enrollment
- Lecture-based learning
- Progress tracking
- Assignments
- Quizzes
- Certificates
- Gamification
- Discussions
- Notifications
- Administrative functionality

### 🤖 AI Tutor
- Course-aware question answering
- Retrieval-Augmented Generation (RAG)
- Lecture-specific retrieval
- Semantic search using FAISS
- Gemini-powered answer generation
- Source/context-aware responses
- Conversation history
- Course and lecture scoped queries

---

## 🧠 AI Tutor Workflow

```text
Student Question
      │
      ▼
React AI Tutor
      │
      ▼
Node.js / Express Backend
      │
      ▼
FastAPI AI Service
      │
      ▼
Query Embedding
      │
      ▼
FAISS Vector Search
      │
      ▼
Relevant Lecture Chunks
      │
      ▼
Gemini / LLM
      │
      ▼
Contextual Answer + Sources
      │
      ▼
React AI Tutor
```

### RAG Pipeline

1. Student submits a question.
2. Frontend sends it to the LMS backend.
3. Backend authenticates the user and validates course context.
4. Backend forwards the request to the FastAPI AI service.
5. AI service searches the relevant FAISS index.
6. Relevant lecture chunks are retrieved.
7. Retrieved context is supplied to the LLM.
8. The LLM generates a contextual answer.
9. Answer and sources are returned to the LMS.
10. Conversation data can be stored for history.

---

## 🏗️ System Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                       VertexLearn AI                         │
└──────────────────────────────────────────────────────────────┘

        ┌───────────────────┐
        │   React Frontend  │
        │      Vercel       │
        └─────────┬─────────┘
                  │ HTTPS / REST
                  ▼
        ┌───────────────────┐
        │ Node.js + Express │
        │      Render       │
        └──────┬─────┬──────┘
               │     │
               ▼     ▼
        ┌──────────┐ ┌──────────────────┐
        │ MongoDB  │ │ FastAPI AI       │
        │          │ │ Service          │
        └──────────┘ └────────┬─────────┘
                              │
                              ▼
                       ┌─────────────┐
                       │    FAISS    │
                       └──────┬──────┘
                              │
                              ▼
                       ┌─────────────┐
                       │ Gemini / LLM│
                       └─────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript, HTML, CSS |
| Build Tool | Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| AI Service | Python, FastAPI |
| Vector Search | FAISS |
| AI / LLM | Gemini |
| API | REST |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| AI Deployment | Railway |
| Version Control | Git, GitHub |

---

## 📁 Project Structure

```text
vertexlearn-ai/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── courses/
│   │   │   ├── enrollments/
│   │   │   ├── lectures/
│   │   │   ├── progress/
│   │   │   ├── assignments/
│   │   │   ├── quizzes/
│   │   │   ├── certificates/
│   │   │   ├── gamification/
│   │   │   ├── discussions/
│   │   │   ├── notifications/
│   │   │   ├── admin/
│   │   │   └── ai/
│   │   └── services/
│   └── package.json
│
├── ai-service/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   └── main.py
│   ├── vectors/
│   ├── requirements.txt
│   └── Dockerfile
│
├── .gitignore
└── README.md
```

---

## 🔑 Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:5000
```

Production:

```env
VITE_API_URL=https://vertexlearn-ai.onrender.com
```

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_SERVICE_URL=your_ai_service_url
```

### AI Service

```env
GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ Never commit `.env` files, API keys, JWT secrets or database credentials to GitHub.

---

## 🚀 Run Locally

### 1. Clone

```bash
git clone https://github.com/AryaRaj487567/vertexlearn-ai.git
cd vertexlearn-ai
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. AI Service

```bash
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Local services:

```text
Frontend:   http://localhost:5173
Backend:    http://localhost:5000
AI Service: http://localhost:8000
```

---

## 🔌 Important API Routes

### Authentication

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Courses

```text
GET  /api/v1/courses
POST /api/v1/courses
```

### AI Tutor

```text
POST   /api/v1/ai/chat
GET    /api/v1/ai/history
DELETE /api/v1/ai/history
```

### AI Service

```text
POST /chat
```

---

## 🧪 AI Tutor Request

```json
{
  "question": "What is Node.js?",
  "top_k": 3,
  "course_id": "course_id",
  "lecture_id": "lecture_id"
}
```

Example response:

```json
{
  "success": true,
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime environment that allows JavaScript to run outside the browser.",
  "sources": [
    {
      "course_id": "course_id",
      "lecture_id": "lecture_id"
    }
  ]
}
```

---

## 🔐 Security

- JWT-based authentication
- Password hashing
- Protected API routes
- Role-based authorization
- Course enrollment validation
- Lecture-level access validation
- Environment variables for secrets
- Separated frontend, backend and AI services

---

## ☁️ Production Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://vertexlearn-ai.vercel.app/ |
| Backend | Render | https://vertexlearn-ai.onrender.com |
| AI Service | Railway | https://vertexlearn-ai-production.up.railway.app |

---

## 📸 Application

The platform provides interfaces for:

- 🔐 Login & Signup
- 🏠 LMS Dashboard
- 📚 Courses
- 🎓 Enrollment
- 📈 Progress Tracking
- 🤖 AI Tutor
- 💬 Conversation History
- 📝 Assignments
- ❓ Quizzes
- 🏆 Certificates
- 🔔 Notifications
- 💭 Discussions
- ⚙️ Administrative workflows

> Add screenshots of the live application here to make the repository even more impressive for recruiters and reviewers.

---

## 🎯 Project Goals

VertexLearn AI combines conventional LMS functionality with AI-assisted learning to provide:

- Personalized learning assistance
- Course-grounded AI answers
- Context-aware tutoring
- Faster access to educational content
- Better student engagement
- Centralized learning management
- A scalable foundation for future AI-powered educational features

---

## 🔮 Future Enhancements

- 🎙️ Voice-based AI tutoring
- 📊 Advanced student analytics
- 🧠 Personalized learning recommendations
- 📝 Adaptive AI-generated assessments
- 📄 Expanded document ingestion
- 🔍 Hybrid semantic + keyword search
- ⚡ AI response caching and optimization
- 📱 Progressive Web App / mobile experience
- 📈 Instructor analytics dashboards
- 🧪 Automated end-to-end testing

---

## 📊 Project Status

| Component | Status |
|---|---|
| React Frontend | ✅ Deployed |
| Node.js Backend | ✅ Deployed |
| Authentication | ✅ Working |
| LMS Modules | ✅ Implemented |
| AI Tutor UI | ✅ Working |
| FastAPI AI Service | ✅ Deployed |
| FAISS Retrieval | ✅ Working |
| Gemini Integration | ✅ Working |
| Conversation History | ✅ Implemented |
| Production API Integration | ✅ Working |

---

## 👨‍💻 Developer

### Arya Raj

**Integrated M.Sc. — Mathematics & Computing**  
Birla Institute of Technology, Mesra

Interested in:

- Full-Stack Development
- Backend Engineering
- Artificial Intelligence
- RAG Systems
- REST API Development
- Data Structures & Algorithms

---

<div align="center">

## 🚀 Try VertexLearn AI

### [🌐 Live Demo](https://vertexlearn-ai.vercel.app/)

### [💻 View Source Code](https://github.com/AryaRaj487567/vertexlearn-ai)

**Built with ❤️ using React, Node.js, FastAPI, MongoDB, FAISS and Gemini**

</div>
