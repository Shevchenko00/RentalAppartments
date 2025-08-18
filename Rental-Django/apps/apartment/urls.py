from django.urls import path
from .views.apartment_views import ApartmentUpdateDeleteAPI,ApartmentChangeActiveAPI, ApartmentSearch, \
    ApartmentDetailAPI, ApartmentCreateAPI, LandlordApartments
from .views.current_id import CurrentUserIDAPIView

urlpatterns = [
    path('', ApartmentSearch.as_view(), name='search-apartment'),
    path('api/user/id/', CurrentUserIDAPIView.as_view(), name='user-id'),
    path('create_apartment/', ApartmentCreateAPI.as_view(), name='active_hotels'),
    path('<int:pk>/', ApartmentDetailAPI.as_view(), name='get_hotel'),
    path('update_apartment/<int:pk>/', ApartmentUpdateDeleteAPI.as_view(), name='create_hotel'),
    path('change_active/<int:pk>/', ApartmentChangeActiveAPI.as_view(), name='change-active-housing'),
    path('my_apartments/', LandlordApartments.as_view())
]
