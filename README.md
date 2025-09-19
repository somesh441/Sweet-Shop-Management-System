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
**Welcome page**

![image](https://github.com/somesh441/Sweet-Shop-Management-System/blob/4bb29ce50f628a62fd3651638500e8c14638541c/screenshot2.jpg/login.png)

**Register Page**

![image](https://github.com/somesh441/Sweet-Shop-Management-System/blob/39960adc72cdc82cd35a1176964f302ef32d9972/screenshot2.jpg/REGISTER.png)

**Customer Page**

![image](https://github.com/somesh441/Sweet-Shop-Management-System/blob/4bb29ce50f628a62fd3651638500e8c14638541c/screenshot2.jpg/main1.png)

**Listed Products**

![image](https://github.com/somesh441/Sweet-Shop-Management-System/blob/4bb29ce50f628a62fd3651638500e8c14638541c/screenshot2.jpg/main2.png)

**Backend Page**

![image](https://github.com/somesh441/Sweet-Shop-Management-System/blob/4bb29ce50f628a62fd3651638500e8c14638541c/screenshot2.jpg/ss1.png)

**Backend page**

![image](https://github.com/somesh441/Sweet-Shop-Management-System/blob/4bb29ce50f628a62fd3651638500e8c14638541c/screenshot2.jpg/ss2.png)
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
## Key API Endpoints

POST /api/register/ - User registration

POST /api/login/ - User login

GET /api/sweets/simple/ - Get all sweets

POST /api/sweets/<id>/purchase/ - Purchase a sweet

GET /api/purchases/user/ - User's purchase history

---
## Reflection on AI Impact

**Positive Impacts**

Rapid Prototyping: AI enabled quick creation of full-stack application

Learning Acceleration: AI explanations helped understand complex concepts

Bug Resolution: AI quickly identified and fixed authentication issues

Code Quality: AI-generated code followed best practices

**Challenges Faced**

Authentication Complexity: JWT setup required multiple iterations

CORS Configuration: Cross-origin issues needed careful debugging

Type Handling: Decimal/float type mismatches in purchase calculations

Component Structure: React component organization needed refinement

**Lessons Learned**

AI as Assistant: AI is most effective when used as a collaborative tool

Iterative Development: Multiple iterations often needed for complex features

Testing Importance: TDD helps catch issues early in AI-assisted development

Documentation: Clear documentation crucial when working with AI-generated code

---
