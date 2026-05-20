from django.urls import path, include
from rest_framework.routers import DefaultRouter

from items.views import (
    Itemviewset,
    Claimviewset,
    login_user,
    register_page,
    add_item
)

router = DefaultRouter()

router.register('item', Itemviewset)
router.register('claim', Claimviewset)

urlpatterns = [

    path('', include(router.urls)),

    path('login/',login_user),
    
    path('register/', register_page),

    path('report/',add_item)
]