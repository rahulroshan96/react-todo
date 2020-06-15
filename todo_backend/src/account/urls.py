from django.conf.urls import url, include
from django.contrib.auth.views import LoginView, LogoutView
from .views import register_user, index


urlpatterns = [
    url(r'^login', LoginView.as_view(template_name='login.html')),
    url(r'^register', register_user, name='register'),
    url(r'^logout', LogoutView.as_view(next_page='/')),
    url(r'^', index),
]