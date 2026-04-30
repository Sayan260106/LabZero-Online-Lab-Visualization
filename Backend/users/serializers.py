from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'first_name', 'last_name', 'is_staff', 'is_superuser')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'student'),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Change the label/placeholder to be more descriptive
        self.fields[self.username_field] = serializers.CharField()

    def validate(self, attrs):
        # We override validate to use our custom backend logic
        username = attrs.get(self.username_field)
        password = attrs.get('password')

        user = authenticate(request=self.context.get('request'), username=username, password=password)

        if not user:
            raise serializers.ValidationError('No active account found with the given credentials')

        refresh = self.get_token(user)

        data = {}
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data
