from rest_framework import serializers

from .models import Item, Claim

class ItemSerializer(serializers.ModelSerializer):
    owner_email = serializers.EmailField(
        source='user.email',
        read_only=True
    )
    class Meta:
        model=Item
        fields='__all__'

class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model=Claim
        fields='__all__'
        read_only_fields = ['claimant']