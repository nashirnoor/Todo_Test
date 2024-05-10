from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import *
from .serializer import TodoSerializer


router = DefaultRouter()
router.register(r'todos',TodoViewSet)


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', Login, name='login'),  
    path('create_user/', create_user, name='create_user'),  
    path('v/', include(router.urls)),
    path('cusom_logout',cutom_logout,name='custom_logout')

]

