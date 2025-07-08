from django.urls import path

from apps.reviews.views import ReviewList

urlpatterns = [
    path('create_review/<int:pk>/', ReviewList.as_view(), name='create_review'),
]