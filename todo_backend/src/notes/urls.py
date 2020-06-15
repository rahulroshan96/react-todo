from django.conf.urls import url, include
from django.contrib.auth.views import LoginView, LogoutView
# from .view import register_user, index, credentials
from .views import note, list_notes, share, delete_note

urlpatterns = [
    url(r'^note', note, name='note'),
    url(r'^share', share),
    url(r'^list', list_notes, name='list'),
    url(r'^delete', delete_note, name='delete'),
]