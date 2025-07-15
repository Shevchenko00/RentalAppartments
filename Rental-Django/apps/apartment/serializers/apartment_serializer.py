from django.db.models import Avg
from rest_framework import serializers
from apps.apartment.models.apartment import Apartment
from apps.reviews.serializers.review_serializer import ReviewSerializer


class ApartmentSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    # average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Apartment
        fields = ['title', 'description', 'city', 'street', 'price', 'is_active', 'apartment_type',
                  'count_room', 'landlord', 'reviews']
        read_only_fields = ['landlord']

    # def get_average_rating(self, obj):
    #     average = obj.reviews.aggregate(Avg('rating'))['rating__avg']
    #     return round(average, 1) if average is not None else None

    def create(self, validated_data):
        user = self.context['request'].user

        validated_data['landlord'] = user

        return super().create(validated_data)
