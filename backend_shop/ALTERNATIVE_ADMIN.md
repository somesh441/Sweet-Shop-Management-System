# Alternative: Django Jazzmin Admin Setup

If Django Jet has compatibility issues, here's an alternative using Django Jazzmin:

## 🚀 Quick Setup

### 1. Install Django Jazzmin
```bash
pip install django-jazzmin
```

### 2. Update settings.py
Replace Jet configuration with Jazzmin:

```python
INSTALLED_APPS = [
    'jazzmin',  # Add this first
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

# Jazzmin Configuration
JAZZMIN_SETTINGS = {
    "site_title": "Sweet Shop Admin",
    "site_header": "Sweet Shop",
    "site_brand": "Sweet Shop",
    "site_logo": None,
    "welcome_sign": "Welcome to Sweet Shop Admin",
    "copyright": "Sweet Shop Ltd",
    "user_avatar": None,
    "topmenu_links": [
        {"name": "Home", "url": "admin:index", "permissions": ["auth.view_user"]},
        {"name": "Sweets", "url": "admin:api_sweet_changelist"},
        {"name": "Users", "url": "admin:api_user_changelist"},
        {"name": "Purchases", "url": "admin:api_purchase_changelist"},
    ],
    "show_sidebar": True,
    "navigation_expanded": True,
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "api.User": "fas fa-user",
        "api.Sweet": "fas fa-candy-cane",
        "api.Purchase": "fas fa-shopping-cart",
    },
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-circle",
    "related_modal_active": True,
    "custom_css": None,
    "custom_js": None,
    "show_ui_builder": False,
    "changeform_format": "horizontal_tabs",
    "changeform_format_overrides": {
        "auth.user": "collapsible",
        "auth.group": "vertical_tabs",
    },
}

JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": "navbar-success",
    "accent": "accent-teal",
    "navbar": "navbar-dark",
    "no_navbar_border": False,
    "navbar_fixed": False,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": False,
    "sidebar": "sidebar-dark-success",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": False,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "cosmo",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success"
    }
}
```

### 3. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Start Server
```bash
python manage.py runserver
```

## 🎯 Benefits of Jazzmin

- **Modern UI**: Beautiful, responsive design
- **Django 5.x Compatible**: Works with latest Django versions
- **Active Development**: Regularly updated
- **Customizable**: Easy to customize themes and colors
- **Mobile Friendly**: Responsive design
- **No Database Changes**: Works with existing data

## 🌐 Access

- **Admin**: http://localhost:8000/admin/

## 🎨 Features

- Modern dashboard
- Customizable sidebar
- Beautiful icons
- Responsive design
- Dark/light themes
- Quick navigation 