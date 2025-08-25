from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from apps.apartment.models import Apartment
from apps.apartment.models.apartment import ApartmentPhoto
from apps.apartment.serializers.change_active import ChangeActiveSerializer
from apps.apartment.serializers.apartment_serializer import ApartmentSerializer
from apps.apartment.views.search_views import ApartmentFilter
from apps.users.permissions.landlord_permissions import IsLandlordOwner
from sqlalchemy.testing.suite.test_reflection import users


class ApartmentCreateAPI(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer

    def perform_create(self, serializer):
        serializer.save(landlord=self.request.user)


class ApartmentDetailAPI(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    lookup_field = 'pk'


class ApartmentUpdateDeleteAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer

    def perform_update(self, serializer):
        apartment = serializer.save()

        photos = self.request.FILES.getlist("photos")
        if photos:
            apartment.photos.all().delete()

            for photo in photos:
                ApartmentPhoto.objects.create(apartment=apartment, photo=photo)


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
        user = self.request.user
        queryset = Apartment.objects.filter(is_active=True)


        return queryset


class LandlordApartments(generics.ListAPIView):
    serializer_class = ApartmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Apartment.objects.filter(landlord=user)