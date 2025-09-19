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

## Tech Stack
- **Backend:** Python, Django REST Framework  
- **Frontend:** React, Axios, Bootstrap / Custom CSS  
- **Database:** SQLite (can switch to PostgreSQL or MongoDB)  
- **Auth:** JWT (JSON Web Tokens)  

---

## User Authentication: 

Secure login/register with JWT tokens

Product Catalog: Browse sweets with images, descriptions, and pricing

Advanced Search & Filtering: Search by name, filter by category, price range, stock availability

Purchase System: Quantity-based purchasing (kg/grams) with real-time stock updates.

Responsive Design: Clean, minimal Bootstrap UI

**Admin Features**

Product Management: Add, edit, and manage sweets

Inventory Control: Track stock levels and sales

Image Upload: Store product images in backend media folder

---
## Screenshots:


---
## Setup
**Backend**
cd backend_shop
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py create_sample_data
python manage.py runserver

**Frontend**:
cd frontend_shop
npm install
npm start

Open http://localhost:3000

---
## AI Usage & Development Process
**AI-Assisted Development**
Code Generation: AI helped generate initial Django models, serializers, and views

Frontend Components: React components created with AI assistance

API Integration: AI assisted in connecting frontend to backend APIs

Error Resolution: AI helped debug authentication and CORS issues

Documentation: README and code comments generated with AI

## AI Tools Used
Claude Sonnet 4: Primary AI assistant for code generation and debugging

GitHub Copilot: Code completion and suggestions

ChatGPT: Alternative AI for problem-solving

---
