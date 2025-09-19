# Sweet Shop Management System

A full-stack Sweet Shop Management System built as part of the **AI Kata TDD exercise**.  
This project demonstrates **API development, authentication, database integration, frontend SPA, testing, and AI-assisted workflows**.

---

##  Features

### Backend (Django REST Framework)
- User registration & login with JWT authentication.
- Manage sweets:
  - Add, update, delete (Admin only).
  - Search sweets by name, category, or price range.
- Inventory management:
  - Purchase sweets (decrease stock).
  - Restock sweets (Admin only).
- PostgreSQL/MongoDB/SQLite database integration.

### Frontend (React)
- User-friendly login & registration forms.
- Dashboard displaying available sweets.
- Search & filter sweets.
- Purchase sweets (disabled when stock = 0).
- Admin features: add, update, delete sweets.
- Responsive and visually appealing design with background images and gradients.

---

## 🛠️ Tech Stack
- **Backend:** Python, Django REST Framework  
- **Frontend:** React, Axios, Bootstrap / Custom CSS  
- **Database:** SQLite (can switch to PostgreSQL or MongoDB)  
- **Auth:** JWT (JSON Web Tokens)  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash

