from rest_framework import serializers

from apps.reservations.models.reservations import Reservation
from apps.apartment.models.apartment import Apartment

class ApartmentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = [
            'id', 'title', 'description', 'city', 'street', 'price', 'is_active',
            'apartment_type', 'count_room', 'landlord', 'photos', 'title_photo'
        ]



class ReservationSerializer(serializers.ModelSerializer):
    apartment = ApartmentInfoSerializer(source='Apartment', read_only=True)
    class Meta:
        model = Reservation
        fields = ['id', 'start_date', 'end_date', 'guests', 'comment', 'is_approved', 'apartment', 'landlord']