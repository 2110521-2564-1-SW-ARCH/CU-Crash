import smtplib, ssl
from app.config import CONFIG
from app import schemas

port = 465  # For SSL
host = 'http://localhost:8000/backend/user'
front_host = 'http://localhost:3000/reset_password'
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


def send_comfirmation_email(reciever: str, name: str, token: str):
    link = f'{host}/confirm_email?token={token}'
    message = (
    'Subject: Email Confirmation for CU-Crash.com\n\n'
    f'Hello, {name}\n'
    'This is an email to verify that this email is your.\n\n'
    'Click the link below to confirm this email.\n'
    f'Link: {link}'
    )
    
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, reciever, message)


def send_forgot_pasword_email(user: schemas.User, token: str):
    link = f'{front_host}/reset_email?identifier={token}'
    message = (
    'Subject: Email for Reset Password at CU-Crash.com\n\n'
    f'Hello, {user["name"]}\n'
    'This is an email to let you reset your password for\n'
    f'User name: {user["name"]}\n'
    f'Email: {user["email"]}\n\n'
    'Click the link below to reset your password.\n'
    f'Link: {link}'
    )
    
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, user["email"], message)
