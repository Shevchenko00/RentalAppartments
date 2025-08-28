from django.db import models
from django.db.models import ForeignKey

from apps.apartment.models import Apartment
from apps.users.models import User


class Reservation(models.Model):
    user = ForeignKey(User, related_name='reservations', on_delete=models.CASCADE)
    Apartment = ForeignKey(Apartment, related_name='reservations', on_delete=models.CASCADE, null=True)
    start_date = models.DateField(verbose_name='Start date', null=False, blank=False)
    end_date = models.DateField(verbose_name='End date', null=False, blank=False)
    comment = models.TextField(verbose_name='Comment', null=True, blank=True)
    guests = models.IntegerField(null=False, default=1)
    is_canceled = models.BooleanField(default=False, verbose_name='Is canceled')
    is_approved = models.BooleanField(default=False)
    class Meta:
        verbose_name = 'Reservation'
        db_table = 'Reservation'
        verbose_name_plural = 'Reservations'
        unique_together = (('user', 'start_date', 'end_date'),)

    def cancel(self):
        self.is_canceled = True
        self.save()

