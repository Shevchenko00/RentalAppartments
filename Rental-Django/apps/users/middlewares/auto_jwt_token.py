from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class JWTAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        access_token = request.COOKIES.get('access_token')

        if not access_token:
            return  # Cookie не установлена — пользователь не авторизован

        request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'

        try:
            user_auth_tuple = JWTAuthentication().authenticate(request)
            if user_auth_tuple:
                request.user, request.auth = user_auth_tuple
        except AuthenticationFailed:
            request.user = None