from rest_framework import generics
from rest_framework.exceptions import NotFound

from apps.apartment.models import Apartment
from apps.reservations.models.reservations import Reservation
from apps.reservations.serializers.approved_serializer import ApproveSerializer
from apps.reservations.serializers.cancel_serializers import CancelSerializer
from apps.reservations.serializers.reservation_serializer import ReservationSerializer
from apps.reservations.serializers.date_book_serializers import ReservationDateSerializer
from apps.users.permissions.landlord_permissions import IsLandlord


from rest_framework.exceptions import ValidationError

class ReservationCreateView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def perform_create(self, serializer):
        apartment_id = self.kwargs.get('pk')
        try:
            apartment = Apartment.objects.get(pk=apartment_id)
        except Apartment.DoesNotExist:
            raise NotFound('Apartment not found.')

        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']

        overlap = Reservation.objects.filter(
            Apartment=apartment,
            is_approved=True,
            start_date__lte=end_date,
            end_date__gte=start_date,
        ).exists()

        if overlap:
            raise ValidationError("Data in not available")

        serializer.save(user=self.request.user, Apartment=apartment, is_approved=False)


class CheckReservationView(generics.ListAPIView):
    serializer_class = ReservationSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Reservation.objects.filter(user=user, is_canceled=False)
        return Reservation.objects.none()

class LandlordReservationListView(generics.ListAPIView):
    serializer_class = ReservationSerializer

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Reservation.objects.none()

        return Reservation.objects.filter(
            Apartment__landlord=user
        ).order_by("-start_date")


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




class ApartmentBookedDatesView(generics.ListAPIView):
    serializer_class = ReservationDateSerializer

    def get_queryset(self):
        apartment_id = self.kwargs.get("pk")
        try:
            apartment = Apartment.objects.get(pk=apartment_id)
        except Apartment.DoesNotExist:
            raise NotFound("Apartment not found.")

        return Reservation.objects.filter(
            Apartment=apartment,
            is_approved=True,
            is_canceled=False
        )