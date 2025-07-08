from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied

from apps.reservations.models.reservations import Reservation
from apps.reviews.models.reviews import Review
from apps.reviews.serializers.review_serializer import ReviewSerializer


# Create your views here.
class ReviewList(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    lookup_field = 'pk'
    permission_classes = [permissions.IsAuthenticated]  # Только для аутентифицированных пользователей

    def perform_create(self, serializer):
        # Получаем информацию об объекте объявления (announcement)
        announcement = serializer.validated_data.get('announcement')

        # Проверяем, бронировал ли текущий пользователь этот объект
        if not Reservation.objects.filter(user=self.request.user, announcement=announcement).exists():
            raise PermissionDenied("Вы можете оставить отзыв только на те апартаменты, которые бронировали.")

        # Если проверка пройдена, сохраняем отзыв с текущим пользователем как арендатором (renter)
        serializer.save(renter=self.request.user)
