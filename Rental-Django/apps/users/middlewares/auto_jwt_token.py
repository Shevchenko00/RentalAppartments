# from django.utils.deprecation import MiddlewareMixin
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework.exceptions import AuthenticationFailed
# from django.contrib.auth.models import AnonymousUser
#
# class JWTAuthenticationMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         token = request.COOKIES.get("access_token")
#         print("🍪 Cookie token:", token)
#
#         if token:
#             request.META["HTTP_AUTHORIZATION"] = f"Bearer {token}"
#         else:
#             request.META.pop("HTTP_AUTHORIZATION", None)
#
#         try:
#             user_auth_tuple = JWTAuthentication().authenticate(request)
#             if user_auth_tuple is not None:
#                 request.user, request.auth = user_auth_tuple
#                 # print("✅ Authenticated as:", request.user)
#             else:
#                 print("❌ No user_auth_tuple returned.")
#         except AuthenticationFailed as e:
#             print("❌ JWT auth failed:", e)
#             request.user = AnonymousUser()
