from django.db import models


from apps.users.models import User


class Apartment(models.Model):
    title = models.CharField(max_length=50, verbose_name='Заголовок')
    description = models.TextField(verbose_name='Описание')
    apartment_type = models.CharField(max_length=10, verbose_name='Тип жилья', default='Квартира')
    count_room = models.SmallIntegerField(verbose_name='Количество комнат', default=1)
    city = models.CharField(max_length=100, verbose_name='Город')
    street = models.CharField(max_length=100, verbose_name='Улица')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена', default=0.00)

    is_active = models.BooleanField(default=False, verbose_name='Статус объявления')

    photo = models.ImageField(
        upload_to='apartment_photos/',
        null=True,
        blank=True,
        verbose_name='Главное фото',
        help_text='Загрузите главное фото квартиры'
    )

    landlord = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        indexes = [models.Index(fields=['city', 'street'])]
        db_table = 'Apartment'
        verbose_name = 'Объявление'
        verbose_name_plural = 'Объявления'

    def __str__(self):
        return f'{self.title}, {self.city}'



class ApartmentPhoto(models.Model):
    apartment = models.ForeignKey(
        Apartment,
        related_name="photos",
        on_delete=models.CASCADE
    )
    photo = models.ImageField(upload_to="apartment_photos/")

    def __str__(self):
        return f"Photo for {self.apartment.title}"