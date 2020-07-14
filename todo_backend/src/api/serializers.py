from rest_framework import serializers
from .models import Task, Bill, Group, Split
from rest_framework import serializers
from django.contrib.auth.models import User



class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'id']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class SplitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Split
        fields = '__all__'

class BillSerializer(serializers.ModelSerializer):
    splits = SplitSerializer(many=True)

    class Meta:
        model = Bill
        fields = '__all__'
        # depth=1

    def create(self, validated_data):
        '''

        :param validated_data:
        :return:
        '''
        splits = validated_data.pop('splits',[])
        bill = Bill.objects.create(**validated_data)
        for split in splits:
            split = Split.objects.create(split_user=split['split_user'], split_amount=split['split_amount'])
            bill.splits.add(split)
        return bill

    def update(self, instance, validated_data):
        splits = validated_data.pop('splits',[])
        instance.bill_name = validated_data['bill_name']
        instance.total_amount = validated_data['total_amount']
        instance.group_name = validated_data['group_name']
        for split in instance.splits.get_queryset():
            split.delete()
        instance.splits.clear()

        for split in splits:
            split = Split.objects.create(split_user=split['split_user'], split_amount=split['split_amount'])
            instance.splits.add(split)
        instance.save()
        return instance




