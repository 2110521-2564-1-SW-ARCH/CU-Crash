import smtplib, ssl
from app.config import CONFIG

port = 465  # For SSL
smtp_server = "smtp.gmail.com"
sender_email = CONFIG.EMAIL['name']
password = CONFIG.EMAIL['password']
message = """\
Subject: Hi there

This message is sent from Python.
Welcome to Cu-Crash wolrd !!"""

def send_email(reciever: str, message: str=message):
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, reciever, message)
        