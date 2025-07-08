from django.contrib import admin

from apps.housing.models.announcement import Announcement

# Register your models here.
admin.site.register(Announcement)
# admin.site.register(User)


# @admin.register(UserModel)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ['username', 'email', 'is_active']  # Настройки отображения в админке
#     search_fields = ['username', 'email']  # Поля для поиска
