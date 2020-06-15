from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    
class SharedUsers(models.Model):
    shared_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)


class Note(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=40, unique=True)
    text = models.TextField(max_length=4000)
    s_users = models.ManyToManyField(User, null=True)
    def __str__(self):
        return self.title




