from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from . import views

routers = routers.DefaultRouter()
routers.register(r'tasks', views.TaskView, 'tasks')

urlpatterns = [
    path('', include(routers.urls)),

    # documentacion de la API
    path('docs/', include_docs_urls(title='Tasks API', public=True)),
]
