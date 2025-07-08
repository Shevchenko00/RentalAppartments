from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
import re
from apps.users.models import User

class RegisterSerializer(serializers.ModelSerializer):
    repeat_password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = (
            "email",
            "first_name",
            "last_name",
            "username",
            'land',
            "date_birth",
            "phone_code",
            "phone_number",
            "is_landlord",
            "password",
            "repeat_password",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):

        first_name = attrs.get('first_name')
        if not first_name:
            raise serializers.ValidationError(
                {'first_name': 'First name is required.'}
            )
        if not re.match('^[A-Za-z ]+$', first_name):
            raise serializers.ValidationError(
                {'first_name': 'The first name must contain only alphabet characters.'}
            )


        password = attrs.get('password')
        repeat_password = attrs.get('repeat_password')

        if not password or not repeat_password:
            raise serializers.ValidationError(
                {'password': 'Password and confirmation password are required.'}
            )

        if password != repeat_password:
            raise serializers.ValidationError(
                {'password': 'Passwords must match.'}
            )


        try:
            validate_password(password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        return attrs

    def create(self, validated_data):
        password = validated_data.get('password')
        validated_data.pop('repeat_password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user