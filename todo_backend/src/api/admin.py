from django.contrib import admin
from .models import Task, Group, Split, Bill
# Register your models here.

admin.site.register(Task)
admin.site.register(Group)
admin.site.register(Split)
admin.site.register(Bill)