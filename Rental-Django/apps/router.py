from django.urls import path, include

urlpatterns = [
    path('apartment/', include('apps.apartment.urls')),
    path('reservations/', include('apps.reservations.urls')),
    path('reviews/', include('apps.reviews.urls')),
]