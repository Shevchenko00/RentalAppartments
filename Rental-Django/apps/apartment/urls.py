from django.urls import path
from .views.apartment_views import ApartmentUpdateDeleteAPI,ApartmentChangeActiveAPI, ApartmentSearch, \
    ApartmentDetailAPI, ApartmentCreateAPI

urlpatterns = [
    path('', ApartmentSearch.as_view(), name='search-apartment'),
    path('create_apartment/', ApartmentCreateAPI.as_view(), name='active_hotels'),
    path('<int:pk>/', ApartmentDetailAPI.as_view(), name='get_hotel'),
    path('update_apartment/<int:pk>/', ApartmentUpdateDeleteAPI.as_view(), name='create_hotel'),
    path('change_active/<int:pk>/', ApartmentChangeActiveAPI.as_view(), name='change-active-housing'),
]
