from rest_framework import serializers

from apps.reservations.models.reservations import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id','start_date', 'end_date', 'comment']