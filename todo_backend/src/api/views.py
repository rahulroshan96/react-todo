from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task, Bill, Group, Split
from .serializers import *

from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List':'/task-list',
        'Detail View':'/task-details/<str:pk>',
        'Create':'/task-create/',
        'Update':'/task-update/<str:pk>',
        'Delete':'/task-delete/<str:pk>',
        'Register':'/register',
        'Login':'/login',
    }
    return Response(api_urls)


# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def task_list(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
@api_view(['POST'])
def task_create(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors)
    return Response(serializer.data)

# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
@api_view(['POST'])
def task_update(request, pk):
    '''
    [POST]
    1. get the data
    2. make serializer
    3. check is_valid
    4. save
    :param request:
    :param pk:
    :return:
    '''
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors)
    return Response(serializer.data)

# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def task_detail(request, pk=0):
    task = Task.objects.get(id=int(pk))
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def task_delete(request, pk=0):
    task = Task.objects.get(id=int(pk))
    task.delete()
    return Response("Task Deleted Successfully")


@api_view(['POST'])
def register(request):
    data = {}
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        account = serializer.save()
        data['username'] = account.username
        data['response'] = "Account created successfully"
        token = Token.objects.get(user=account).key
        data['token'] = token
    else:
        data = serializer.errors
    return Response(data)


########################################


@api_view(['GET'])
def group_get(request, pk):
    group = Group.objects.get(id=int(pk))
    serializer = GroupSerializer(group, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def group_delete(request, pk):
    group = Group.objects.get(id=int(pk))
    group.delete()
    return Response("Group Deleted Successfully")

@api_view(['POST'])
def group_create(request):
    serializer = GroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)

@api_view(['GET'])
def groups_list(request):
    groups = Group.objects.all()
    serializers = GroupSerializer(groups, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def users_list(request):
    users = User.objects.all()
    serializers = UserSerializer(users, many=True)
    return Response(serializers.data)


@api_view(['POST'])
def group_update(request, pk):
    group = Group.objects.get(id=pk)
    serializer = GroupSerializer(instance=group, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)


@api_view(['POST'])
def bill_create(request):
    serializer = BillSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)

@api_view(['POST'])
def bill_update(request, pk):
    bill = Bill.objects.get(id=int(pk))
    serializer = BillSerializer(instance=bill, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)


@api_view(['GET'])
def bill_get(request, pk):
    bill = Bill.objects.get(id=int(pk))
    serializer = BillSerializer(bill, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def bill_list(request, pk=0):
    bills = Bill.objects.filter(group_name_id=int(pk))
    serializer = BillSerializer(bills, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def bill_delete(request, pk=0):
    bill = Bill.objects.get(id=int(pk))
    for split in bill.splits.get_queryset():
        split.delete()
    bill.delete()
    return Response("Bill Deleted Successfully")






