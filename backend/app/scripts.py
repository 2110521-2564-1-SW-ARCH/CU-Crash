import subprocess

def start_app():
    cmd = ['uvicorn','main:app','--reload']
    subprocess.run(cmd)
