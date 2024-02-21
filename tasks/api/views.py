from rest_framework import views
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from .serializer import TaskSerializer, MyTokenObtainPairSerializer, UserSerializer
from ..models import Task


class GetRoutes(views.APIView):
    def get(self, request):
        routes = {
            'api/': {
                'users/': [
                    'GET /api/users/',
                    'POST /api/users/',
                    'GET /api/users/<int:pk>/',
                    'PUT /api/users/<int:pk>/',
                    'DELETE /api/users/<int:pk>/'
                ],
                'api/tasks/': [
                    'GET /api/tasks/',
                    'POST /api/tasks/',
                    'GET /api/tasks/<int:pk>/',
                    'PUT /api/tasks/<int:pk>/',
                    'DELETE /api/tasks/<int:pk>/'
                ],
                'api/token/': [
                    'POST /api/token/',
                    'POST /api/token/refresh/',
                ],
                'api/docs/': [
                    'GET /api/docs/'
                ]
            }
        }

        return Response(routes)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UsersView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        self.queryset = self.queryset.filter(pk=self.request.user.pk)

        return super().get_queryset()


class TasksView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        print(request.user)
        tasks = Task.objects.all().filter(
            user=request.user.pk,
            completed=False
        )

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data['user'] = request.user.pk
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class TaskCRUDView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        task = Task.objects.get(pk=pk)

        if request.user.pk != task.user.pk:
            return Response(status=403)

        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def put(self, request, pk):
        task = Task.objects.get(pk=pk)

        if request.user.pk != task.user.pk:
            return Response(status=403)

        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def patch(self, request, pk):
        task = Task.objects.get(pk=pk)

        if request.user.pk != task.user.pk:
            return Response(status=403)

        serializer = TaskSerializer(task, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        task = Task.objects.get(pk=pk)

        if request.user.pk != task.user.pk:
            return Response(status=403)

        task.delete()
        return Response(status=204)


class CompleteTaskView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        task = Task.objects.get(pk=pk)

        if request.user.pk != task.user.pk:
            return Response(status=403)

        task.completed = True
        task.save()
        serializer = TaskSerializer(task)
        return Response(serializer.data)
