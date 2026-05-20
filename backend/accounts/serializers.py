from .models import Profile
from rest_framework import serializers

class ProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    class Meta:

        model = Profile

        fields = [
            'id',
            'username',
             
        ]