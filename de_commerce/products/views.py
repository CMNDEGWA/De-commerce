from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, LoginSerializer

class RegisterAPIView(APIView):
	permission_classes = [AllowAny]
	def post(self, request):
		serializer = RegisterSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response({'success': True, 'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
		return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
	permission_classes = [AllowAny]
	def post(self, request):
		serializer = LoginSerializer(data=request.data)
		if serializer.is_valid():
			user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
			if user:
				login(request, user)
				return Response({'success': True, 'message': 'Login successful.'}, status=status.HTTP_200_OK)
			return Response({'success': False, 'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
		return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

