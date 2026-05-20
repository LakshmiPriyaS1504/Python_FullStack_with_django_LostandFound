from django.db import models

from django.contrib.auth.models import User

class Item(models.Model):
    STATUS_CHOICES=(
        ('Lost','Lost'),
        ('Found','Found'),
        ('Claimed','Claimed')
    )
    CATEGORY_CHOICES = (
        ('Electronics', 'Electronics'),
        ('ID Card', 'ID Card'),
        ('Bag', 'Bag'),
        ('Books', 'Books'),
        ('Others', 'Others')
    )

    user=models.ForeignKey(User,on_delete=models.CASCADE)
    name=models.CharField(max_length=100)
    description=models.TextField(blank=True)

    category=models.CharField(max_length=100,
        choices=CATEGORY_CHOICES)
    
    status=models.CharField(max_length=100,
        choices=STATUS_CHOICES)
    
    location=models.CharField(max_length=100)
    date_posted=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class Claim(models.Model):

    CLAIMED_STATUS=(
        ('Accepted','Accepted'),
        ('Pending','Pending'),
        ('Rejected','Rejected')
    )

    item=models.ForeignKey(Item,on_delete=models.CASCADE)
    claimant=models.ForeignKey(User,on_delete=models.CASCADE)
    proof=models.TextField()
    status = models.CharField(
        max_length=10,
        choices=CLAIMED_STATUS,
        default='Pending'
)
    
    claim_date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.claimant.username} - {self.item.name}"