from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .models import User
from rest_framework import viewsets
from rest_framework import status
from .serializer import UserSerializer,TodoSerializer
from .models import Todo
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.


@api_view(['POST'])
def Login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = User.objects.filter(email=email).first()

    if user is None or not user.check_password(password):
        return Response({"error":"Invalid password"},status=status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(user)

    refresh = RefreshToken.for_user(user)
    return Response({
        "user":serializer.data,
        "access_token": str(refresh.access_token),
        "refresh_token":str(refresh)
    })



@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def list(self, request,*args,**kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self,request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)



    def retrieve(self,request,*args,**kwargs):
        instance = self.get_object()
        serlializer = self.get_serializer(instance)
        return Response(serlializer.data)
    

    def update(self,request,*args,**kwargs):
        partial  = kwargs.pop('partial',False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)  
        serializer.save()
        return Response(serializer.data)
    

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)
    


@api_view(['POST'])
def cutom_logout(request):
    refresh_token = request.data.get('refresh_token')
    if not refresh_token:
        return Response({"error":"Refresh token is required."},status=status.HTTP_400_BAD_REQUEST)
    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'details:"Logout Successfull.'},status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error":"Invalid refresh token,"},status=status.HTTP_400_BAD_REQUEST)
    
    



        

    
    
    