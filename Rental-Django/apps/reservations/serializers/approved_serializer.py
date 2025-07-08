from rest_framework import serializers

from apps.reservations.models.reservations import Reservation

class ApproveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['is_canceled', 'is_approved']

    def update(self, instance, validated_data):
        instance.is_canceled = validated_data.get('is_canceled', instance.is_canceled)
        instance.is_approved = validated_data.get('is_approved', instance.is_approved)
        instance.save()
        return instance
