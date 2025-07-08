# Django Rental Project
A simple and efficient Django RESTful API project, built to manage rental services. This project is ready for deployment on any hosting platform.

## Features

- **Django 5.1+**: Built with the latest version of Django for high performance and scalability.  
- **Django REST Framework**: Includes `djangorestframework` for building powerful RESTful APIs.  
- **JWT Authentication**: Secure token-based authentication with `djangorestframework-simplejwt` and `PyJWT`.  
- **Database Support**: Fully compatible with MySQL via `mysqlclient`.  
- **Environment Management**: Simplified configuration using `django-environ`.  
- **Filtering Capabilities**: Integrated `django-filter` for flexible and efficient query filtering.  
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation with `drf-yasg`.  
- **Static File Handling**: Efficiently serves static files in production with `whitenoise`.  
- **Asynchronous Support**: Built with `asgiref` to support modern asynchronous features.  
- **Gunicorn for Deployment**: Includes `gunicorn` for robust WSGI server deployment.  
- **Timezone Support**: Timezone-aware functionality with `pytz`.  
- **YAML Configuration**: Supports YAML file processing with `PyYAML`.  
- **Enhanced Query Parsing**: Uses `sqlparse` for clean SQL parsing and formatting.  

## How to Install

Follow these steps to set up and run the project locally:

### 1. Clone the Repository.

Clone tis repository
```bash 
git clone https://github.com/Shevchenko00/Rental-Django.git
cd Rental-Django
```
### 2. Create and activate a Virtual Environment.
``` python
python -m venv .venv
source venv/bin/activate    # On Linux/Mac
venv\Scripts\activate       # On Windows
pip install -r requirements.txt
```
### 3. Configure Environment Variables.
- DEBUG=True
- SECRET_KEY=your_secret_key
- DATABASE_URL=mysql://user:password@127.0.0.1:3306/db_name

### 4. Apply Migrations
```python
python manage.py makemigrations
python manage.py migrate
```
### 5. Create a Superuser and Run the Development Server.
```python
python manage.py createsuperuser
python manage.py runserver

```
### 6. (Optional) Run with Gunicorn.
```bash
gunicorn dajngo-rental.wsgi:application
```

