import django_filters

from apps.apartment.models import Apartment


class ApartmentFilter(django_filters.FilterSet):
    city = django_filters.CharFilter(field_name='title',lookup_expr='icontains')
    description = django_filters.CharFilter(field_name='description',lookup_expr='icontains')
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')
    min_rooms = django_filters.NumberFilter(field_name="count_room", lookup_expr='gte')
    max_rooms = django_filters.NumberFilter(field_name="count_room", lookup_expr='lte')
    type_of_housing = django_filters.CharFilter(field_name="type_of_housing", lookup_expr='icontains')

    class Meta:
        model = Apartment
        fields = ['title', 'description', 'min_price', 'max_price', 'min_rooms', 'max_rooms', 'type_of_housing', 'city', 'street']
