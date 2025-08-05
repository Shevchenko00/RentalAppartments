import os

from rest_framework import serializers
import requests
from apps.apartment.models.apartment import Apartment
class ApartmentSerializer(serializers.ModelSerializer):
    landlord = serializers.SerializerMethodField()

    class Meta:
        model = Apartment
        fields = [
            'id', 'title', 'description', 'city', 'street', 'price', 'is_active',
            'apartment_type', 'count_room', 'landlord', 'photo'
        ]
        read_only_fields = ['landlord']

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
