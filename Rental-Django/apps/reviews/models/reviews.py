from django.db import models

from apps.choices.rating_choice import RATING_CHOICES
from apps.housing.models import Announcement
from apps.users.models import User


class Review(models.Model):
    renter = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE)
    announcement = models.ForeignKey(Announcement, related_name='reviews', on_delete=models.CASCADE)
    rating = models.CharField(choices=RATING_CHOICES, max_length=20)
    review = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = 'reviews'
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'


