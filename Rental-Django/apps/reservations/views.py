from rest_framework import generics
from rest_framework.exceptions import NotFound

from apps.housing.models import Announcement
from apps.reservations.models.reservations import Reservation
from apps.reservations.serializers.approved_serializer import ApproveSerializer
from apps.reservations.serializers.cancel_serializers import CancelSerializer
from apps.reservations.serializers.reservation_serializer import ReservationSerializer
from apps.users.permissions.landlord_permissions import IsLandlord


# Create your views here.
class ReservationCreateView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def perform_create(self, serializer):
        announcement_id = self.kwargs.get('pk')
        try:
            announcement = Announcement.objects.get(pk=announcement_id)
        except Announcement.DoesNotExist:
            raise NotFound('Announcement not found.')


        serializer.save(user=self.request.user, announcement=announcement, is_approved=False)


class CheckReservationView(generics.ListAPIView):
    serializer_class = ReservationSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Reservation.objects.filter(user=user, is_canceled=False)  # Фильтруем не отмененные бронирования
        return Reservation.objects.none()


class CancelReservationView(generics.UpdateAPIView):
    serializer_class = CancelSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        reservation_id = self.kwargs.get('pk')
        try:
            reservation = Reservation.objects.get(pk=reservation_id, user=self.request.user)
        except Reservation.DoesNotExist:
            raise NotFound('Reservation not found.')

        reservation.cancel()
        serializer.save()


class ApproveReservationView(generics.UpdateAPIView):
    permission_classes = (IsLandlord,)
    queryset = Reservation.objects.all()
    serializer_class = ApproveSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        reservation_id = self.kwargs.get('pk')
        try:
            reservation = Reservation.objects.get(pk=reservation_id)
        except Reservation.DoesNotExist:
            raise NotFound('Reservation not found.')
        serializer.save(is_approved=True)