from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from dashboard import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet, basename="user")
router.register(r"groups", views.GroupViewSet, basename="group")

urlpatterns = [
    path("my-view/", views.my_view, name="my-view"),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
]
