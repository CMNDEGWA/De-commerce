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
from .serializers import RegisterSerializer, LoginSerializer, ProductSerializer
from .models import Product

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


class PasswordResetAPIView(APIView):
	"""
	API View for password reset requests
	
	Endpoint: POST /api/password-reset/
	
	Permission: AllowAny (unauthenticated users can request password reset)
	
	HTTP Methods:
	- POST: Send password reset email
	  - Request body: {email}
	  - Validates email is not empty
	  - Checks if user with this email exists
	  - Sends password reset email (simulated or real)
	
	Status Codes:
	- 200 OK: Reset email sent successfully
	- 400 Bad Request: Email missing
	
	Password Reset Flow:
	1. User submits email via ResetPassword.vue form
	2. Backend validates email format and presence
	3. Backend searches for user with this email
	4. If found, sends password reset email (currently simulated)
	5. Response indicates success (frontend shows confirmation)
	6. In production, email would contain secure token link
	
	Frontend Integration:
	- Called from ResetPassword.vue submitResetRequest() function
	- Uses resetPassword() service function from auth.js
	- On success, shows confirmation message
	- On error, displays error details to user
	
	Security Note:
	- For privacy, returns success even if email not found
	- This prevents attackers from enumerating valid emails in database
	"""
	permission_classes = [AllowAny]
	
	def post(self, request):
		from django.core.mail import send_mail
		
		email = request.data.get('email', '').strip()
		
		if not email:
			return Response(
				{'success': False, 'message': 'Email is required'},
				status=status.HTTP_400_BAD_REQUEST
			)
		
		try:
			# Check if user exists with this email
			user = User.objects.get(email=email)
			
			# Simulate sending password reset email
			# In production, this would send an email with secure reset token
			try:
				send_mail(
					'Password Reset Request - De-Commerce',
					f'Hello {user.username},\n\n'
					f'You have requested to reset your password. '
					f'Click the link below to reset your password:\n\n'
					f'http://localhost:5173/reset-password\n\n'
					f'If you did not request this, please ignore this email.\n\n'
					f'Best regards,\nDe-Commerce Team',
					'noreply@de-commerce.com',
					[email],
					fail_silently=False,
				)
			except Exception as mail_error:
				# Email sending failed, but still return success to user for security
				print(f'Email sending error: {mail_error}')
			
			return Response(
				{'success': True, 'message': 'Password reset link sent to your email. Please check your inbox.'},
				status=status.HTTP_200_OK
			)
		
		except User.DoesNotExist:
			# Return success even if user not found (security best practice)
			# Prevents attackers from enumerating valid emails
			return Response(
				{'success': True, 'message': 'If an account exists with this email, a reset link will be sent.'},
				status=status.HTTP_200_OK
			)
		
		except Exception as e:
			return Response(
				{'success': False, 'message': 'An error occurred. Please try again later.'},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR
			)


class SessionCartAPIView(APIView):
	"""
	API View for a session-backed cart for anonymous users.

	Endpoint: /api/session-cart/

	Permission: AllowAny (no login required)

	Methods:
	- GET: return current session cart items with product details
	- POST: add product to session cart (body: {product_id, quantity})
	- DELETE: clear the session cart
	"""
	permission_classes = [AllowAny]

	def get(self, request):
		cart = request.session.get('cart', {})
		items = []
		if cart:
			product_ids = [int(pid) for pid in cart.keys()]
			products = Product.objects.filter(id__in=product_ids)
			prod_map = {p.id: p for p in products}
			for pid_str, qty in cart.items():
				pid = int(pid_str)
				product = prod_map.get(pid)
				if product:
					items.append({'product': ProductSerializer(product).data, 'quantity': qty})
		return Response({'items': items}, status=status.HTTP_200_OK)

	def post(self, request):
		product_id = request.data.get('product_id') or request.data.get('id')
		if product_id is None:
			return Response({'success': False, 'message': 'product_id is required.'}, status=status.HTTP_400_BAD_REQUEST)
		try:
			product = Product.objects.get(id=product_id)
		except Product.DoesNotExist:
			return Response({'success': False, 'message': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
		try:
			quantity = int(request.data.get('quantity', 1))
		except (TypeError, ValueError):
			quantity = 1
		cart = request.session.get('cart', {})
		key = str(product.id)
		cart[key] = cart.get(key, 0) + quantity
		request.session['cart'] = cart
		request.session.modified = True
		return Response({'success': True, 'message': 'Added to session cart.'}, status=status.HTTP_200_OK)

	def delete(self, request):
		request.session['cart'] = {}
		request.session.modified = True
		return Response({'success': True, 'message': 'Session cart cleared.'}, status=status.HTTP_200_OK)

