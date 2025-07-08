from django.urls import path
from .views.login_views import LoginView
from .views.register_views import RegisterView
from .views.logout_views import LogoutView

urlpatterns = [
    path('sign_up/', RegisterView.as_view()),
    path('sign_in/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
]
