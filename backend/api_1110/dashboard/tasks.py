from celery import shared_task


@shared_task
def process_data(data):
    print("Hello, Celery")
