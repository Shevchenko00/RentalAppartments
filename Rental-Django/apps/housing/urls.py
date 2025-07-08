from django.urls import path
from .views.housing_views import HousingUpdateDeleteAPI, HouseChangeActiveAPI, HousingSearch, \
    HousingDetailAPI, HousingCreateAPI

urlpatterns = [
    path('', HousingSearch.as_view(), name='search-hotels'),#http://127.0.0.1:8000/housing/house/ Показать все активные объявления
    path('create_house/', HousingCreateAPI.as_view(), name='active_hotels'),#http://127.0.0.1:8000/housing/house/create_house/ создание объявления
    path('get_house/<int:pk>/', HousingDetailAPI.as_view(), name='get_hotel'),#http://127.0.0.1:8000/housing/house/get_hotel/1/ получение объявления по PK
    path('update_house/<int:pk>/', HousingUpdateDeleteAPI.as_view(), name='create_hotel'),#http://127.0.0.1:8000/housing/house/update_housing/1/ обновления по PK
    path('change_active/<int:pk>/', HouseChangeActiveAPI.as_view(), name='change-active-housing'),#http://127.0.0.1:8000/housing/house/change_active/1/ сменить активность по PK
]
