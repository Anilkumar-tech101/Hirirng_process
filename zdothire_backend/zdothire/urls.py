from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path('', views.index, name='index'),
    path('register-page/', views.register_page, name='register-page'),
    path('login-page/', views.login_page, name='login-page'),
]
