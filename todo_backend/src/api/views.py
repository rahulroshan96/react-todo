from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer, UserSerializer

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



