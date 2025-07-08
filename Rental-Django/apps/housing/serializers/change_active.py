from rest_framework.serializers import ModelSerializer

from apps.housing.models import Announcement


class ChangeActiveSerializer(ModelSerializer):
    class Meta:
        model = Announcement
        fields = ['is_active']
        read_only_fields = ['landlord']