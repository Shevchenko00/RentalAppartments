from django.db import models


from apps.users.models import User


class Announcement(models.Model):
    title = models.CharField(max_length=50, null=False, blank=False, verbose_name='Заголовок',
                             help_text='(поле является обязательным)')
    description = models.TextField(null=False, blank=False, verbose_name='Описание',
                                   help_text='(поле является обязательным)')
    house_type = models.CharField(max_length=10, null=False, blank=False, verbose_name='Тип жилья', default='Квартира')
    count_room = models.SmallIntegerField(null=False, verbose_name='Количество комнат', default=1)
    city = models.CharField(max_length=100, null=False, verbose_name='Город', help_text='(поле является обязательным)')
    street = models.CharField(max_length=100, null=False, verbose_name='Улица',
                              help_text='(поле является обязательным)')
    house = models.CharField(max_length=10, null=False, verbose_name='Дом', help_text='(поле является обязательным)')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена', null=False, blank=True,
                                default=0.00)
    ACTIV_CHOICE = [
        ('Активно', 'Активно'),
        ('Неактивно', 'Неактивно')
    ]
    is_active = models.CharField(max_length=10, choices=ACTIV_CHOICE, default='Неактивно',
                                 help_text='(поле является обязательным)', verbose_name='Статус объявления')

    landlord = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    def save(self, *args, **kwargs):
        if not self.landlord_id:
            self.landlord = kwargs.pop('user', None)
        super().save(*args, **kwargs)

    class Meta:
        indexes = [
            models.Index(fields=['city', 'street', 'house']),
        ]
        verbose_name = 'Объявление'
        verbose_name_plural = 'Объявления'

    def __str__(self):
        return f'{self.title}, {self.description}'