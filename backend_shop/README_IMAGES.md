# Image Upload Functionality

## Overview
The Sweet Shop backend now supports image uploads for sweets with both file upload and URL support.

## Folder Structure
```
sweetshop_backend/
├── media/
│   └── sweets/          # Uploaded sweet images
├── api/
│   └── models.py        # Sweet model with image fields
└── settings.py          # Media configuration
```

## Image Fields in Sweet Model
- **`image`**: ImageField for file uploads (stored in `media/sweets/`)

## Configuration
1. **Media Settings** (settings.py):
   ```python
   MEDIA_URL = '/media/'
   MEDIA_ROOT = BASE_DIR / 'media'
   ```

2. **URL Configuration** (urls.py):
   ```python
   if settings.DEBUG:
       urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
   ```

3. **Dependencies** (requirements.txt):
   ```
   Pillow==10.1.0
   ```

## API Endpoints
- **GET** `/api/sweets/public/` - Returns sweets with image URLs
- **POST** `/api/sweets/` - Create sweet with image upload
- **PUT/PATCH** `/api/sweets/{id}/` - Update sweet with image

## Image URL Format
- **Uploaded images**: `http://localhost:8000/media/sweets/filename.jpg`

## Admin Interface
- Sweet admin shows image previews
- File upload interface for adding images

## Usage Examples
1. **Create sweet with image upload**:
   ```bash
   curl -X POST http://localhost:8000/api/sweets/ \
     -H "Authorization: Bearer <token>" \
     -F "name=Gulab Jamun" \
     -F "price=150.00" \
     -F "image=@gulab-jamun.jpg"
   ```



## Setup Instructions
1. Install Pillow: `pip install Pillow`
2. Run migrations: `python manage.py makemigrations && python manage.py migrate`
3. Create media folder: `mkdir -p media/sweets`
4. Start server: `python manage.py runserver`

## Notes
- Images are stored in `media/sweets/` folder
- File uploads require authentication
- Admin interface shows image previews
- API returns full URLs for uploaded images 