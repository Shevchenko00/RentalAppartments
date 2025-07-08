from django.db.models import Avg
from rest_framework import serializers

from apps.reviews.models.reviews import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['renter', 'announcement', 'review', 'rating']
        read_only_fields = ['renter']

