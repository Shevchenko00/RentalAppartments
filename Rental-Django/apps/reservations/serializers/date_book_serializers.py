from rest_framework import serializers
from apps.reservations.models.reservations import Reservation
class ReservationDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ["start_date", "end_date"]
    