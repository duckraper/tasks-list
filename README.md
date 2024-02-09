# TasksList
Proyecto que sobre una vista sencilla de una lista de tareas, el programa permite mostrar, editar, agregar y eliminar tareas (CRUD).\
Para el desarrollo de este proyecto se utilizó Django como backend y React como frontend. Para lograr este sistema, se utilizo una API generada con *DjangoRestFramework*, la cual se conecta con el frontend mediante *Axios*.\

## Instrucciones de uso
### Backend (Django)

1. Clona este repositorio en tu máquina local.

2. Ve al directorio del proyecto:
    ```bash
    cd tasks-list
    ```

3. Crea un entorno virtual (se recomienda utilizar `venv`):
    ```bash
    python -m venv env
    ```

4. Activa el entorno virtual:
    - En Windows:
        ```bash
        .\env\Scripts\activate
        ```
    - En macOS y Linux:
        ```bash
        source env/bin/activate
        ```

5. Instala las dependencias del proyecto:
    ```bash
    pip install -r requirements.txt
    ```

6. Realiza las migraciones de la base de datos:
    ```bash
    python manage.py migrate
    ```

7. Ejecuta el servidor backend:
    ```bash
    python manage.py runserver
    ```

8. El servidor backend estará disponible en `http://localhost:8000`.

### Frontend (React)

1. Ve al directorio del proyecto frontend:
    ```bash
    cd frontend
    ```

2. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

3. Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```

4. El servidor frontend estará disponible en `http://localhost:5173`.

## Tecnologías Utilizadas

### Backend
- Django
- Django Rest Framework
- CoreAPI
- django-cors-headers

### Frontend
- React
- Axios
- react-hook-form
- react-hot-toast
- react-router-dom
- Tailwind CSS
