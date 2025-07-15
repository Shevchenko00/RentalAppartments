from rest_framework.serializers import ModelSerializer

from apps.apartment.models import Apartment


class ChangeActiveSerializer(ModelSerializer):
    class Meta:
        model = Apartment
        fields = ['is_active']
        read_only_fields = ['landlord']