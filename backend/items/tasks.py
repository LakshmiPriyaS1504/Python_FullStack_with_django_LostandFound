from celery import shared_task

from django.core.mail import send_mail


@shared_task
def claim_accepted_mail(email, item_name):

    send_mail(

        subject='Claim Accepted',

        message=f'Your claim for "{item_name}" has been accepted.',

        from_email='lakxmipriyaa@gmail.com',

        recipient_list=[email],

        fail_silently=False
    )