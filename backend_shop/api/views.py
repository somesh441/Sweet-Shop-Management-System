from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from decimal import Decimal
from .models import User, Sweet, Purchase
from .serializers import UserSerializer, UserCreateSerializer, SweetSerializer, SweetCreateSerializer, PurchaseSerializer, PurchaseCreateSerializer

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Keep admin operations protected
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

class SweetViewSet(viewsets.ModelViewSet):
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer
    permission_classes = [IsAuthenticated]  # Keep admin operations protected
    
    def get_serializer_class(self):
        if self.action == 'create':
            return SweetCreateSerializer
        return SweetSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return PurchaseCreateSerializer
        return PurchaseSerializer
    
    def get_queryset(self):
        """Filter purchases by current user if not admin"""
        if self.request.user.role == 'admin':
            return Purchase.objects.all()
        return Purchase.objects.filter(user=self.request.user)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Register a new user"""
    print("Registration request received:", request.data)
    serializer = UserCreateSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        print("User created successfully:", user.email)
        return Response({
            'message': 'User created successfully',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    print("Registration validation errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """Login user and return JWT tokens"""
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({
            'error': 'Please provide both email and password'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=email, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Get current user profile"""
    return Response(UserSerializer(request.user).data)

@api_view(['GET'])
@permission_classes([AllowAny])
@authentication_classes([])  # Disable authentication for this endpoint
def test_connection(request):
    """Test endpoint to check if backend is accessible"""
    print("test_connection endpoint called")
    return Response({
        'message': 'Backend is working!',
        'status': 'success',
        'timestamp': '2024-01-01T00:00:00Z'
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
@authentication_classes([])  # Disable authentication for this endpoint
def get_sweets(request):
    """Get all sweets (public endpoint)"""
    print("=== get_sweets endpoint called ===")
    print(f"Request method: {request.method}")
    print(f"Request user: {request.user}")
    print(f"Request auth: {request.auth}")
    print(f"Request path: {request.path}")
    print(f"Request GET params: {request.GET}")
    
    try:
        sweets = Sweet.objects.all()
        print(f"Found {sweets.count()} sweets")
        
        # Use a simpler serializer approach
        sweets_data = []
        for sweet in sweets:
            sweet_data = {
                'id': sweet.id,
                'name': sweet.name,
                'description': sweet.description,
                'category': sweet.category,
                'price': str(sweet.price),
                'quantity': sweet.quantity,
                'created_at': sweet.created_at.isoformat(),
            }
            if sweet.image:
                sweet_data['image'] = request.build_absolute_uri(sweet.image.url)
            else:
                sweet_data['image'] = None
            sweets_data.append(sweet_data)
        
        print(f"Returning {len(sweets_data)} sweets")
        return Response(sweets_data)
    except Exception as e:
        print(f"Error in get_sweets: {e}")
        import traceback
        traceback.print_exc()
        return Response({
            'error': 'Failed to fetch sweets',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def get_sweets_simple(request):
    """Simple Django view for getting sweets (no DRF)"""
    try:
        print("get_sweets_simple endpoint called")
        print(f"Request method: {request.method}")
        print(f"Request user: {request.user}")
        
        sweets = Sweet.objects.all()
        print(f"Found {sweets.count()} sweets")
        
        sweets_data = []
        for sweet in sweets:
            sweet_data = {
                'id': sweet.id,
                'name': sweet.name,
                'description': sweet.description,
                'category': sweet.category,
                'price': str(sweet.price),
                'quantity': sweet.quantity,
                'created_at': sweet.created_at.isoformat(),
            }
            if sweet.image:
                sweet_data['image'] = request.build_absolute_uri(sweet.image.url)
            else:
                sweet_data['image'] = None
            sweets_data.append(sweet_data)
        
        print(f"Returning {len(sweets_data)} sweets")
        return JsonResponse({'sweets': sweets_data})
    except Exception as e:
        print(f"Error in get_sweets_simple: {e}")
        import traceback
        traceback.print_exc()
        return JsonResponse({'error': str(e)}, status=500)

def test_simple(request):
    """Test endpoint without any DRF"""
    return JsonResponse({
        'message': 'Simple endpoint working!',
        'timestamp': '2024-01-01T00:00:00Z',
        'status': 'success'
    })

def debug_request(request):
    """Debug endpoint to see what's happening with requests"""
    return JsonResponse({
        'message': 'Debug endpoint',
        'method': request.method,
        'path': request.path,
        'user': str(request.user),
        'auth': str(request.auth),
        'headers': dict(request.headers),
        'GET_params': dict(request.GET),
        'POST_data': dict(request.POST),
        'status': 'success'
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def get_sweet_detail(request, sweet_id):
    """Get specific sweet details (public endpoint)"""
    try:
        sweet = Sweet.objects.get(id=sweet_id)
        serializer = SweetSerializer(sweet, context={'request': request})
        return Response(serializer.data)
    except Sweet.DoesNotExist:
        return Response({
            'error': 'Sweet not found'
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_purchases(request):
    """Get purchases for current user"""
    purchases = Purchase.objects.filter(user=request.user)
    serializer = PurchaseSerializer(purchases, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_purchase(request):
    """Create a new purchase"""
    serializer = PurchaseCreateSerializer(data=request.data)
    if serializer.is_valid():
        # Set the user to current user
        serializer.save(user=request.user)
        return Response({
            'message': 'Purchase created successfully',
            'purchase': PurchaseSerializer(serializer.instance).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])  # Allow anyone to purchase (for demo)
def purchase_sweet(request, sweet_id):
    """Purchase a sweet, decreasing its quantity"""
    try:
        sweet = Sweet.objects.get(id=sweet_id)
        
        # Get quantity from request
        quantity = request.data.get('quantity', 1)
        try:
            quantity = Decimal(str(quantity))  # Convert to Decimal for precise calculations
            if quantity <= 0:
                return Response({
                    'error': 'Quantity must be greater than 0'
                }, status=status.HTTP_400_BAD_REQUEST)
        except (ValueError, TypeError, Exception):
            return Response({
                'error': 'Invalid quantity format'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if sweet.quantity < quantity:
            return Response({
                'error': f'Not enough stock. Available: {sweet.quantity} kg'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Calculate total price
        total_price = sweet.price * quantity
        
        # Decrease quantity
        sweet.quantity -= quantity
        sweet.save()
        
        # Create purchase record if user is authenticated
        if request.user.is_authenticated:
            Purchase.objects.create(
                user=request.user,
                sweet=sweet,
                quantity=quantity,
                total_price=total_price
            )
        
        return Response({
            'message': f'Successfully purchased {quantity} kg of {sweet.name}',
            'purchased_quantity': quantity,
            'total_price': total_price,
            'remaining_quantity': sweet.quantity,
            'sweet': {
                'id': sweet.id,
                'name': sweet.name,
                'price': str(sweet.price),
                'quantity': sweet.quantity
            }
        }, status=status.HTTP_200_OK)
        
    except Sweet.DoesNotExist:
        return Response({
            'error': 'Sweet not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
