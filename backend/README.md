# **Documentación de la API**

## **1. Enlaces de las API**
- **Django (Usuarios)**: [Swagger UI](https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/swagger)
- **FastAPI**: [Docs](https://extension-rental-freeze-blow.trycloudflare.com/docs)

---

## **2. Endpoints de la API**

### **2.1. Listar Todos los Productos**
- **URL**: `https://extension-rental-freeze-blow.trycloudflare.com/products`
- **Método**: `GET`
- **Descripción**: Obtiene una lista de todos los productos.

---

### **2.2. Crear Usuario**
- **URL**: `https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/users/`
- **Método**: `POST`
- **Cuerpo de la solicitud**:
    ```json
    {
      "username": "USER",
      "password": "USER",
      "email": "USER@EXAMPLE.COM"
    }
    ```

---

### **2.3. Login y Obtener Token de Acceso**
- **URL**: `https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/token/`
- **Método**: `POST`
- **Cuerpo de la solicitud**:
    ```json
    {
      "username": "pruebas",
      "password": "pruebas"
    }
    ```
- **Respuesta**:
    ```json
    {
      "access_token": "your_access_token_here",
      "token_type": "bearer"
    }
    ```

---

### **2.4. Actualizar Contraseña o Datos del Usuario**
- **URL**: `https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/users/{ID}/`
- **Método**: `PUT`
- **Descripción**: Actualiza los datos del usuario, incluyendo la contraseña.
- **Cuerpo de la solicitud**:
    ```json
    {
      "username": "refresh",
      "password": "refresh1",
      "email": "refresh@example.com"
    }
    ```

---

### **2.5. Realizar Predicciones**
- **URL**: `https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/predict/`
- **Método**: `POST`
- **Descripción**: Realiza una predicción basada en varios parámetros.
- **Cuerpo de la solicitud**:
    ```json
    {
      "store_id": 1, 
      "promo": 1,
      "school_holiday": 0,
      "n_days": 7,
      "start_date": "2025-04-06",
      "store_type": "a",
      "assortment": "b",
      "state_holiday": "0",
      "product_name": "Coca-Cola 600ml",
      "weather": 3,
      "sentiment_score": 0.8
    }
    ```

---

### **2.6. Historial de Predicciones**
- **URL**: `https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/historial/`
- **Método**: `GET`
- **Descripción**: Obtiene el historial de las predicciones realizadas.
- **Autenticación**: Incluye el token en la cabecera `Authorization` con el formato `Bearer <access_token>`.

---

### **2.7. Eliminar Cuenta de Usuario**
- **URL**: `https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/users/{ID}/`
- **Método**: `DELETE`
- **Descripción**: Elimina un usuario de la base de datos.
- **Confirmación**: El sistema preguntará si estás seguro de eliminar tu cuenta.

---

## **3. Uso del Token de Acceso**

Después de realizar el login y obtener el `access_token`, deberás incluirlo en la cabecera de tus solicitudes a los endpoints que requieren autenticación.

- **Formato**: `Authorization: Bearer <access_token>`

Ejemplo:
```bash
curl -X GET "https://2263-2600-1008-a031-7483-7d42-cfe5-1c0e-32e5.ngrok-free.app/api/historial/" -H "Authorization: Bearer your_access_token_here"
