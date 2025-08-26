import os

from rest_framework import serializers
import requests
from apps.apartment.models.apartment import Apartment, ApartmentPhoto

class ApartmentPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApartmentPhoto
        fields = ["id", "photo"]



class ApartmentSerializer(serializers.ModelSerializer):
    landlord = serializers.SerializerMethodField()
    photos = ApartmentPhotoSerializer(many=True, required=False)
    class Meta:
        model = Apartment
        fields = [
            'id', 'title', 'description', 'city', 'street', 'price', 'is_active',
            'apartment_type', 'count_room', 'landlord', 'photos', 'title_photo'
        ]
        depth = 1
        read_only_fields = ['landlord']

    def create(self, validated_data):
        photos = validated_data.pop("photos", [])
        apartment = super().create(validated_data)
        for photo in photos:
            ApartmentPhoto.objects.create(apartment=apartment, image=photo)
        return apartment

    def get_landlord(self, obj):
        try:
            user_id = obj.landlord_id
            url = f"{os.getenv('AUTH_SERVICE')}/users/{user_id}"
            headers = {}

            request = self.context.get('request')
            if request and request.headers.get('Authorization'):
                headers['Authorization'] = request.headers['Authorization']

            response = requests.get(url, headers=headers, timeout=5)
            if response.status_code == 200:
                return response.json()
            return {"id": user_id, "error": "User not found"}
        except Exception as e:
            return {"error": str(e)}

