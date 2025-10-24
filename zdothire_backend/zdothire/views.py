from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import json
# Create your views here.
@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        full_name = data.get("full_name")
        company = data.get("company")
        phone = data.get("phone_number")
        email = data.get("email")
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        if not all([full_name, company, phone, email, password, confirm_password]):
            return JsonResponse({"error": "All fields are required"}, status=400)

        if password != confirm_password:
            return JsonResponse({"error": "Passwords do not match"}, status=400)

        with connection.cursor() as cursor:
            # Check if user already exists
            cursor.execute(
                "SELECT id FROM users WHERE email=%s OR phone_number=%s",
                [email, phone]
            )
            existing = cursor.fetchone()
            if existing:
                return JsonResponse({"error": "User already exists"}, status=400)

            hashed_password = make_password(password)
            cursor.execute(
                "INSERT INTO users (full_name, company, phone_number, email, password) VALUES (%s, %s, %s, %s, %s)",
                [full_name, company, phone, email, hashed_password]
            )

        return JsonResponse({"message": "Registration successful!"}, status=201)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email_or_phone = data.get("email_or_phone")
        password = data.get("password")

        if not email_or_phone or not password:
            return JsonResponse({"error": "Email/Phone and Password required"}, status=400)

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT id, email, full_name, company, phone_number, password FROM users WHERE email=%s OR phone_number=%s",
                [email_or_phone, email_or_phone]
            )
            user = cursor.fetchone()

        if not user:
            return JsonResponse({"error": "User not found"}, status=404)

        user_id, email, full_name, company, phone_number, db_password = user

        if check_password(password, db_password):
            return JsonResponse({
                "message": "Login successful!",
                "user": {
                    "email": email,
                    "full_name": full_name,
                    "company": company,
                    "phone_number": phone_number
                }
            }, status=200)
        else:
            return JsonResponse({"error": "Invalid password"}, status=401)

    return JsonResponse({"error": "Invalid request method"}, status=405)
