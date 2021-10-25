import sys
import logging
logger = logging.getLogger()
#!/usr/bin/env python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))

def rabbit_sent(review):
    channel = connection.channel()
    channel.queue_declare(queue='review')
    channel.basic_publish(exchange='',
                        routing_key='review',
                        body=str(review))
    connection.close()
