
from django.conf.urls import url, include
from django.contrib import admin
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [

    url(r'^get-group/(?P<pk>\w{0,50})', group_get, name='get-group'),
    url(r'^group-update/(?P<pk>\w{0,50})', group_update, name='group-update'),
    url(r'^group-delete/(?P<pk>\w{0,50})', group_delete, name='group-delete'),
    url(r'^group-create/', group_create, name='group-create'),
    url(r'^groups-list/', groups_list, name='group-list'),
    url(r'^bill-create/', bill_create, name='bill-create'),
    url(r'^bill-get/(?P<pk>\w{0,50})', bill_get, name='bill-get'),
    url(r'^bill-update/(?P<pk>\w{0,50})', bill_update, name='bill-update'),
    url(r'^bill-list/(?P<pk>\w{0,50})', bill_list, name='bill-list'),
    url(r'^bill-delete/(?P<pk>\w{0,50})', bill_delete, name='bill-delete'),
    url(r'^users-list/', users_list, name='users-list'),


    url(r'^task-list', task_list, name='task-list'),
    url(r'^task-detail/(?P<pk>\w{0,50})', task_detail, name='task-details'),
    url(r'^task-create', task_create, name='task-create'),
    url(r'^task-update/(?P<pk>\w{0,50})', task_update, name='task-update'),
    url(r'^task-delete/(?P<pk>\w{0,50})', task_delete, name='task-delete'),
    url(r'^register', register, name='register'),
    url(r'^login', obtain_auth_token, name='login'),
    url(r'^', apiOverview, name='api-overview'),
]
