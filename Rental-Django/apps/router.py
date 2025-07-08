from django.urls import path, include

urlpatterns = [
    path('house/', include('apps.housing.urls')),
    path('reservations/', include('apps.reservations.urls')),
    path('reviews/', include('apps.reviews.urls')),
]