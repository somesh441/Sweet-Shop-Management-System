# Revert to Default Django Admin

If you prefer to use the default Django admin interface, follow these steps:

## 🔄 Revert to Default Admin

### 1. Update settings.py
Remove Jazzmin from INSTALLED_APPS:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'api',
]
```

### 2. Remove Jazzmin Configuration
Delete these sections from settings.py:
- `JAZZMIN_SETTINGS`
- `JAZZMIN_UI_TWEAKS`

### 3. Update requirements.txt
Remove django-jazzmin:
```
Django==5.1.7
djangorestframework==3.14.0
django-cors-headers==4.3.1
djangorestframework-simplejwt==5.3.0
Pillow==10.1.0
```

### 4. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Start Server
```bash
python manage.py runserver
```

## 🎯 Default Admin Features

- Clean, functional interface
- All existing functionality preserved
- No additional dependencies
- Works with Django 5.x
- Familiar Django admin experience

## 🌐 Access

- **Admin**: http://localhost:8000/admin/ 