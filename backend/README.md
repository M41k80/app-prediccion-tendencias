# https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/swagger DJANGO USERS

# https://extension-rental-freeze-blow.trycloudflare.com/docs FASTAPI




# LISTO AQUI ESTAN LOS ENDPOINTS

# PARA LISTAR TODOS LOS PRODUCTOS:
https://extension-rental-freeze-blow.trycloudflare.com/products

# PARA CREAR USUARIO:
https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/users/

{
  "username": "USER",
  "password": "USER",
  "email": "USER@EXAMPLE.COM"
}

# PARA EL LOGIN:
https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/token/
# este es el usuario y contraseña que se creo para las pruebas: 
{
  "username": "pruebas",
  "password": "pruebas"
}

usar el "accesstoken": 

# PARA ACTUALIZAR O CAMBIAR CONTRASENA: 
https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/users/{ID}/

{
  "username": "refresh",
  "password": "refresh1",
  "email": "refresh@example.com"
}

# PARA PREDICCIONES:
https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/predict/

{
  "store_id": 1, # ID de la tienda HAY PONDREMOS UNA LISTA DE TIENDAS FAMOSAS EN EL FRONTED PARA QUE SE PUEDA SELECCIONAR PODRIAMOS PONER UNAS 30
  "promo": 1, #MATH RANDOM
  "school_holiday": 0, MATHRANDOM
  "n_days": 7, #NUMERO DE DIAS QUE SE QUIERE PREDECIR TENEMOS QUE CREAR UN CALENDARIO EN EL FRONTED PARA QUE SE PUEDA SELECCIONAR
  "start_date": "2025-04-06", #FECHA DE INICIO
  "store_type": "a", #TIPO DE TIENDA ESE NO SE CAMBIA   
  "assortment": "b", #SE ENVIA IGUAL NO SE MODIFICA
  "state_holiday": "0", #SE ENVIA IGUAL NO SE MODIFICA
  "product_name": "Coca-Cola 600ml", #AQUI SE LISTARAN LOS PRODUCTOS QUE EXISTEN EN LA BASE DE DATOS DE LA API
  "weather": 3, #MATH RANDOM
  "sentiment_score": 0.8 #MATH RANDOM
}

# PARA EL HISTORIAL DE PREDICCIONES:
https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/historial/
PERO EN LA CABECERA DE AUTORIZACION DEBE TENER EL TOKEN DE ACCESO QUE SE OBTIENE AL LOGUEARSE:
usar el "accesstoken":


# EN CASO DE QUE EL URUARIO YA NO QUIERA UTLIZAR NUESTRO SERVICIO SE PUEDE ELIMINAR SU CUENTA:
https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/users/{ID}/ SOLO SE CREARIA UN AVISO DE Q SI ESTA SEGURO Q QUIERE ELIMINAR SU CUENTA.
