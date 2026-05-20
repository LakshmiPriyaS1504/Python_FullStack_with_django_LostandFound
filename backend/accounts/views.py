from django.shortcuts import render
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes


@api_view(['GET'])
def profile_view(request):
    profile = Profile.objects.get(user=request.user)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)


@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.id
        })

    return Response(
        {'error': 'Invalid credentials'},
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
def forgot_password(request):

    email = request.data.get('email')

    user = User.objects.filter(email=email).first()

    if not user:
        return Response(
            {"error": "User with this email does not exist"},
            status=400
        )

    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    reset_link = f"http://localhost:3000/password_reset/{uid}/{token}"

    send_mail(
        'Password Reset',
        f'Click this link to reset your password: {reset_link}',
        'yourgmail@gmail.com',
        [email],
        fail_silently=False,
    )

    return Response({"message": "Reset link sent"})


@api_view(['POST'])
def reset_password(request):

    uid = request.data.get('uid')
    token = request.data.get('token')
    password = request.data.get('password')

    try:
        user_id = urlsafe_base64_decode(uid).decode()
        user = User.objects.get(pk=user_id)

        if default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({"message": "Password reset successful"})
        else:
            return Response({"error": "Invalid token"}, status=400)

    except Exception:
        return Response({"error": "Invalid request"}, status=400)