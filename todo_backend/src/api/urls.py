
from django.conf.urls import url, include
from django.contrib import admin
from .views import apiOverview, \
    task_list, task_detail, task_create, \
    task_update, task_delete, register
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    url(r'^task-list', task_list, name='task-list'),
    url(r'^task-detail/(?P<pk>\w{0,50})', task_detail, name='task-details'),
    url(r'^task-create', task_create, name='task-create'),
    url(r'^task-update/(?P<pk>\w{0,50})', task_update, name='task-update'),
    url(r'^task-delete/(?P<pk>\w{0,50})', task_delete, name='task-delete'),
    url(r'^register', register, name='register'),
    url(r'^login', obtain_auth_token, name='login'),
    url(r'^', apiOverview, name='api-overview'),
]
