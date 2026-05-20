from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes
)

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from .models import Item, Claim
from .serializers import ItemSerializer, ClaimSerializer

from items.tasks import claim_accepted_mail


class Itemviewset(viewsets.ModelViewSet):

    queryset = Item.objects.all()

    serializer_class = ItemSerializer

    authentication_classes = [TokenAuthentication]

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        serializer.save(user=self.request.user)


class Claimviewset(viewsets.ModelViewSet):

    queryset = Claim.objects.all()

    serializer_class = ClaimSerializer

    authentication_classes = [TokenAuthentication]

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        serializer.save(
            claimant=self.request.user
        )

    def perform_update(self, serializer):

        claim = serializer.save()

        if claim.status == 'Accepted':

            claim_accepted_mail.delay(
                claim.claimant.email,
                claim.item.name
            )


@api_view(['POST'])
def register_page(request):

    username = request.data.get('username')

    email = request.data.get('email')

    password = request.data.get('password')

    if not username or not email or not password:

        return Response(
            {'error': 'All fields are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():

        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():

        return Response(
            {'error': 'Email already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )

    User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response(
        {'message': 'User created successfully'},
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')

    password = request.data.get('password')

    user = authenticate(
        username=username,
        password=password
    )

    if user:

        Token.objects.filter(
            user=user
        ).delete()

        token = Token.objects.create(
            user=user
        )

        return Response({

            'token': token.key,

            'user_id': user.id

        })

    return Response(

        {'error': 'Invalid credentials'},

        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])

@authentication_classes([TokenAuthentication])

@permission_classes([IsAuthenticated])

def add_item(request):

    print(request.user)

    print(request.auth)

    item = Item.objects.create(

        user=request.user,

        name=request.data.get('name'),

        category=request.data.get('category'),

        location=request.data.get('location'),

        description=request.data.get('description')

    )

    return Response({

        'message': 'Item added successfully',

        'item_id': item.id

    }, status=status.HTTP_201_CREATED)