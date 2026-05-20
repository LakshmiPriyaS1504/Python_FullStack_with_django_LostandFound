from django.urls import path
from .views import forgot_password,reset_password

urlpatterns = [
    path('forgot/', forgot_password),
    path('reset/', reset_password),
]