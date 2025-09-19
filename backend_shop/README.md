# Sweet Shop Backend

A Django REST Framework backend for the Sweet Shop application.

## Features

- Custom User model with roles (customer, admin, staff)
- Sweet products management
- RESTful API endpoints
- Token-based authentication
- Admin interface

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

3. Create a superuser:
```bash
python manage.py createsuperuser --name "Admin User" --email "admin@example.com" --password "your_password"
```

4. Run the development server:
```bash
python manage.py runserver
```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login and get token
- `GET /api/auth/profile/` - Get current user profile (requires authentication)

### Users (requires authentication)
- `GET /api/users/` - List all users
- `POST /api/users/` - Create a new user
- `GET /api/users/{id}/` - Get user details
- `PUT /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user

### Sweets (requires authentication for management)
- `GET /api/sweets/` - List all sweets
- `POST /api/sweets/` - Create a new sweet
- `GET /api/sweets/{id}/` - Get sweet details
- `PUT /api/sweets/{id}/` - Update sweet
- `DELETE /api/sweets/{id}/` - Delete sweet

### Public Sweet Endpoints
- `GET /api/sweets/public/` - List all sweets (public)
- `GET /api/sweets/public/{id}/` - Get sweet details (public)

## Models

### User
- `id` - Auto-incrementing primary key
- `name` - User's full name
- `email` - Unique email address
- `password_hash` - Hashed password
- `role` - User role (customer, admin, staff)
- `created_at` - Creation timestamp

### Sweet
- `id` - Auto-incrementing primary key
- `name` - Sweet name
- `category` - Sweet category (traditional, modern, chocolate, fruit, nut, other)
- `price` - Price in decimal format
- `quantity` - Available quantity
- `created_at` - Creation timestamp

## Authentication

The API uses JWT (JSON Web Token) authentication. Include the access token in the Authorization header:
```
Authorization: Bearer your_access_token_here
```

### JWT Endpoints:
- `POST /api/auth/login/` - Login and get access/refresh tokens
- `POST /api/auth/refresh/` - Refresh access token using refresh token
- `POST /api/auth/register/` - Register a new user

## Admin Interface

Access the Django admin interface at `/admin/` to manage users and sweets through the web interface. 