from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('apartment/', include('apps.apartment.urls')),
    path('reservations/', include('apps.reservations.urls')),
    path('reviews/', include('apps.reviews.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)