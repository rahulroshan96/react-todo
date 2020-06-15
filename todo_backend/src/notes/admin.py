from django.contrib import admin
from .models import UserProfile, Note, SharedUsers
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(Note)
admin.site.register(SharedUsers)