from django.urls import path

from apps.reservations.views import ReservationCreateView, CheckReservationView, CancelReservationView, \
    ApproveReservationView

urlpatterns = [
    path('create/<int:pk>/', ReservationCreateView.as_view(), name='reservation-create'),
    path('my_reservations/', CheckReservationView.as_view(), name='reservation-check'),
    path('cancel_reservations/<int:pk>/', CancelReservationView.as_view(), name='reservation-cancel'),
    path('approve/<int:pk>/', ApproveReservationView.as_view(), name='reservation-approve'),
]

