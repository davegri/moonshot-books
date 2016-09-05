from django.conf.urls import url
from rest_framework import routers
from .views import BookViewSet, IndexView

router = routers.DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = router.urls
