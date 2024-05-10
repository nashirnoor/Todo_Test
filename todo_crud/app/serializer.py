from rest_framework import serializers
from .models import User,Todo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = '__all__'



class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
        read_only_field = ['created_at','updated_at']


