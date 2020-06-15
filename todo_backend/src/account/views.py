# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
# from .forms import CredentialForm
from django.contrib.auth.models import User
# from social_django.models import UserSocialAuth

def index(request):
    return redirect('/account/login')

from django.contrib.auth import logout

def register_user(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
        else:
            args = {'form': form}
            return render(request, 'reg_form.html', args)
    else:
        form = UserCreationForm()
        args = {'form': form}
        
        return render(request, 'reg_form.html', args)



