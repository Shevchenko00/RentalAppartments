import re
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers

from apps.users.models import User


class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "email",
            "password",
        )
        extra_kwargs = {"password": {
            "write_only": True
        }}


class RegisterUserSerializer(serializers.ModelSerializer):
    repeat_password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = (
            "email",
            "full_name",
            "username",
            "is_landlord",
            "password",
            "repeat_password",
        )

        extra_kwargs = {"password": {
            "write_only": True
        }}

    def validate(self, attrs):
        full_name = attrs.get('full_name')

        if not re.match('^[A-Za-z ]+$', full_name):
            raise serializers.ValidationError(
                {'full_name': 'The full name must be alphabet characters.'}
            )

        password = attrs.get('password')
        repeat_password = attrs.get('repeat_password')

        if password != repeat_password:
            raise serializers.ValidationError(
                {'password': 'Password must be the same.'}
            )

        try:
            validate_password(password)
        except ValidationError as err:
            raise serializers.ValidationError(
                {'password': err.messages}
            )
        return attrs

    def create(self, validated_data):
        password = validated_data.get('password')
        validated_data.pop('repeat_password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user