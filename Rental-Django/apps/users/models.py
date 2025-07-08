from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, db_index=True)
    password = models.CharField(max_length=128)
    city = models.CharField(max_length=30, default='Berlin')
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=10)
    last_name = models.CharField(max_length=30)
    country = models.CharField(max_length=20, null=False, default='Berlin')
    date_birth = models.DateField(null=True, blank=True)
    phone_country_code = models.IntegerField(default=123)
    phone_number = models.IntegerField(default=0)
    is_landlord = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'country', 'city', 'phone_country_code', 'phone_number']

    objects = CustomUserManager()

    class Meta:
        db_table = 'Users'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"