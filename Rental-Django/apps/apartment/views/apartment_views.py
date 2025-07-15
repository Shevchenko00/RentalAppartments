from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated, AllowAny

from apps.apartment.models import Apartment
from apps.apartment.serializers.change_active import ChangeActiveSerializer
from apps.apartment.serializers.apartment_serializer import ApartmentSerializer
from apps.apartment.views.search_views import ApartmentFilter
from apps.users.permissions.landlord_permissions import IsLandlordOwner


class ApartmentCreateAPI(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer


class ApartmentDetailAPI(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    lookup_field = 'pk'


class ApartmentUpdateDeleteAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsLandlordOwner]
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer



class ApartmentChangeActiveAPI(generics.UpdateAPIView):
    permission_classes = [IsLandlordOwner]
    queryset = Apartment.objects.all()
    serializer_class = ChangeActiveSerializer
    lookup_field = 'pk'


class ApartmentSearch(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Apartment.objects.filter()
    serializer_class = ApartmentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ApartmentFilter

    def get_queryset(self):
        queryset = super().get_queryset()

        # Фильтрация по активности
        is_active = self.request.query_params.get('is_active', None)
        if is_active:
            queryset = queryset.filter(is_active=is_active)  # Примените фильтрацию по активности

        return queryset
