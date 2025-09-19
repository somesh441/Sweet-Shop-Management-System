from rest_framework import serializers
from .models import User, Sweet, Purchase

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'role', 'created_at']
        read_only_fields = ['id', 'created_at']

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'role', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=password,
            role=validated_data.get('role', 'customer')
        )
        return user

class SweetSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Sweet
        fields = ['id', 'name', 'description', 'category', 'price', 'quantity', 'image', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

class SweetCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sweet
        fields = ['id', 'name', 'description', 'category', 'price', 'quantity', 'image', 'created_at']
        read_only_fields = ['id', 'created_at']

class PurchaseSerializer(serializers.ModelSerializer):
    sweet_name = serializers.CharField(source='sweet.name', read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    
    class Meta:
        model = Purchase
        fields = ['id', 'user', 'user_name', 'sweet', 'sweet_name', 'quantity', 'total_price', 'purchase_date']
        read_only_fields = ['id', 'purchase_date']

class PurchaseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ['id', 'user', 'sweet', 'quantity', 'total_price']
        read_only_fields = ['id'] 