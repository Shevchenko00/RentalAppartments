from rest_framework import serializers

from apps.reservations.models.reservations import Reservation


class CancelSerializer(serializers.Serializer):
    class Meta:
        model = Reservation
        fields = ['id', 'is_cancelled']

    def update(self, instance, validated_data):
        instance.is_canceled = True
        instance.save()
        return instance