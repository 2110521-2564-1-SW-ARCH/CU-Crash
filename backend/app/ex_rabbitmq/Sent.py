import sys
#!/usr/bin/env python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))

def rabbit_sent(review):
    # try:
        channel = connection.channel()
        channel.queue_declare(queue='review')
        channel.basic_publish(exchange='',
                            routing_key='review',
                            body=str(review))
        connection.close()
    # except pika.exceptions.ConnectionWrongStateError:
    #     pass
    # finally:
    #     connection.close()