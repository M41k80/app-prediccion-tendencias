# http://localhost:8000/swagger/  DJANGO

# http://127.0.0.1:8001/docs FASTAPI


# PARA PODER CORRER LOS BACKEND TIENEN QUE ABRIR DOS TERMINALES 

# PARA CORRER DJANGO :

## cd backend 
## cd Django
## source venv/bin/activate
## cd django_backend
## python3 manage.py runserver o python manage.py runserver
## http://localhost:8000/swagger/ para ver los endpoints


# PARA CORRER FASTAPI:
## cd backend
## cd FastApi
## source venv/bin/activate
## uvicorn app.main:app --host 0.0.0.0 --port 8001
## http://127.0.0.1:8001/docs para ver los enpoints
