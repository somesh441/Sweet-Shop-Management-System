from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'admin-sweets', views.SweetViewSet)  # Changed to avoid conflict
router.register(r'purchases', views.PurchaseViewSet)

urlpatterns = [
    # Router URLs for ViewSets
    path('', include(router.urls)),
    
    # Authentication endpoints
    path('auth/register/', views.register_user, name='register'),
    path('auth/login/', views.login_user, name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/profile/', views.get_user_profile, name='profile'),
    
    # Test endpoints
    path('test/', views.test_connection, name='test_connection'),
    path('test-simple/', views.test_simple, name='test_simple'),
    path('debug/', views.debug_request, name='debug_request'),
    
    # Public sweet endpoints
    path('sweets/public/', views.get_sweets, name='public_sweets'),
    path('sweets/public/<int:sweet_id>/', views.get_sweet_detail, name='public_sweet_detail'),
    path('sweets/simple/', views.get_sweets_simple, name='simple_sweets'),
    
    # Purchase endpoints
    path('purchases/user/', views.get_user_purchases, name='user_purchases'),
    path('purchases/create/', views.create_purchase, name='create_purchase'),
    path('sweets/<int:sweet_id>/purchase/', views.purchase_sweet, name='purchase_sweet'),
]
