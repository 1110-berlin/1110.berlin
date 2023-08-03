from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from dashboard.serializers import UserSerializer, GroupSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.reverse import reverse


class CustomAPIRootView(APIView):
    def get(self, request):
        domain = request.META.get("HTTP_X_FORWARDED_HOST", request.META["HTTP_HOST"])
        users_url = reverse("user-list", request=request)
        groups_url = reverse("group-list", request=request)
        response_data = {
            "users": f"http://{domain}{users_url}",
            "groups": f"http://{domain}{groups_url}",
        }
        return Response(response_data)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


from .tasks import process_data


def some_view(request):
    process_data.delay(data)
