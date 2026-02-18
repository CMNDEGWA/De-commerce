"""
API Views Module for Authentication, Products, Cart, and Orders

This module defines Django Rest Framework ViewSets and APIView classes that:
1. Handle HTTP requests from the frontend
2. Apply permissions and authentication checks
3. Filter data based on user authorization
4. Serialize Python objects to JSON responses

The ViewSets automatically provide standard REST endpoints (List, Create, Retrieve, Update, Delete)
based on the HTTP method and URL pattern.

IMPORTANT: Views are organized by permission requirements:
- Public (NO LOGIN): Category, Product, Register, Login
- Protected (LOGIN REQUIRED): Cart, Order
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, LoginSerializer

# ============================================================================
# AUTHENTICATION VIEWS (NO LOGIN REQUIRED)
# ============================================================================

class RegisterAPIView(APIView):
	"""
	API View for user registration (sign-up)
	
	Endpoint: POST /api/register/
	
	Permission: AllowAny (unauthenticated users can register)
	
	HTTP Methods:
	- POST: Create new user account
	  - Request body: {username, email, password1, password2}
	  - Uses RegisterSerializer for validation
	  - Validates password match, unique username and email
	  - Returns: {success: true, message: "User registered successfully."} or errors
	
	Status Codes:
	- 201 Created: Registration successful, user created
	- 400 Bad Request: Validation failed (duplicate username/email, password mismatch)
	
	Frontend Integration:
	- Called from Register.vue handleRegister() function
	- Uses registerUser() service function from auth.js
	- On success, redirects user to login page
	
	Notes:
	- Password is automatically hashed by Django User model
	- Email is required and must be unique
	- After registration, user must login to access protected features
	"""
	permission_classes = [AllowAny]
	def post(self, request):
		serializer = RegisterSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response({'success': True, 'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
		return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
	"""
	API View for user authentication (login)
	
	Endpoint: POST /api/login/
	
	Permission: AllowAny (unauthenticated users can attempt login)
	
	HTTP Methods:
	- POST: Authenticate user and create session
	  - Request body: {username, password}
	  - Uses LoginSerializer for basic validation
	  - Calls Django's authenticate() to verify credentials against User model
	  - Calls Django's login() to create session if credentials valid
	
	Status Codes:
	- 200 OK: Login successful, session created
	- 401 Unauthorized: Invalid username/password combination
	- 400 Bad Request: Malformed request data
	
	Authentication Flow:
	1. User submits username and password via Login.vue form
	2. LoginSerializer validates structure (has required fields)
	3. authenticate() checks credentials against database
	4. login() creates session cookie (Django session auth)
	5. Frontend stores 'isAuthenticated' flag in localStorage
	6. Subsequent API calls include session cookie for authentication
	
	Frontend Integration:
	- Called from Login.vue handleLogin() function
	- Uses loginUser() service function from auth.js
	- On success, auth store sets isAuthenticated=true
	- Redirects to home page
	- Session cookie automatically sent with all future requests (withCredentials: true in axios)
	
	Security:
	- Uses Django session-based authentication
	- Password verified via authenticate() function (secure hash check)
	- Session cookie has httponly flag (not accessible via JavaScript)
	"""
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

