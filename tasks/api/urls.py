from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

routers = routers.DefaultRouter()
# routers.register(r'', views.TaskView, 'tasks')

urlpatterns = [
    # path('tasks/', include(routers.urls)), # /tasks/
    path('tasks/', views.TasksView.as_view(), name='tasks'),
    path('tasks/<int:pk>/', views.TaskView.as_view(), name='task'),

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('', views.GetRoutes.as_view(), name='routes'),
    path('docs/', include_docs_urls(title='Tasks API', public=True)),
]
