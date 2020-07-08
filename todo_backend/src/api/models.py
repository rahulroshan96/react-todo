from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=100)
    detail = models.CharField(max_length=1000)

    def __str__(self):
        return self.title

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Group(models.Model):
    g_name = models.CharField(max_length=100, null=False)
    users = models.ManyToManyField(User, null=True)

    def __str__(self):
        return self.g_name

class Split(models.Model):
    split_amount = models.FloatField(max_length=1000, null=False)
    split_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return "%s-%s" % (self.split_amount, self.split_user.username)

class Bill(models.Model):
    bill_name = models.CharField(max_length=1000, null=False)
    total_amount = models.FloatField(max_length=1000, null=False)
    group_name = models.ForeignKey(Group, on_delete=models.CASCADE, null=True)
    splits = models.ManyToManyField(Split, null=True)

    def __str__(self):
        return self.bill_name



# 1000 Bill
# [spli1, split2]
#
#
# split1 500 rahul
# split2 500 Kshitij



'''
{
    "id": 1,
    "bill_name": "Rent June 20201",
    "total_amount": 20000.0,
    "group_name": 1,
    "splits": [
        {
"split_amount":10000,
"split_user": 2
},
{
"split_amount":10000,
"split_user": 3
}
    ]
}


'''















