from django.contrib.auth.models import AbstractUser, PermissionsMixin, Group, Permission, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator

from django.db import models

from apps.choices.country_code import COUNTRY_CODES
from apps.choices.land import BUNDESLAENDER


class User(AbstractUser, PermissionsMixin):
    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        max_length=150,
        unique=True,
        help_text="Обязательно. 150 символов или меньше. Только буквы, цифры и символы @/./+/-/_.",
        validators=[username_validator],
        error_messages={
            "unique": "A user with that username already exists.",
        },
    )
    first_name = models.CharField(max_length=10, null=False, verbose_name='Имя')
    last_name = models.CharField(max_length=30, null=False, verbose_name='Фамилия')
    date_birth = models.DateField(null=True, verbose_name='Дата рождения',
                                   )
    email = models.EmailField(unique=True, verbose_name='Email')
    land = models.CharField(verbose_name='Федеральная земля', max_length=100, null=False, blank=True, choices=BUNDESLAENDER)
    city = models.CharField(max_length=30, null=True, verbose_name='Город')
    phone_code = models.CharField(max_length=30, null=True, choices=COUNTRY_CODES, verbose_name='Код вашей страны')
    phone_number = models.IntegerField(blank=True,null=True, help_text='Введите номер телефона без учета кода',
                             verbose_name='Номер телефона')
    is_landlord = models.BooleanField(default=False, verbose_name='Я являюсь арендодателем')

    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='группы',
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='права пользователя',
    )

    objects = UserManager()

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'date_birth', 'country', 'city', 'country_code']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
