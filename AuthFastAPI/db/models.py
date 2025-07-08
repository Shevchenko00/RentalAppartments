from datetime import datetime

from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    city = Column(String(30), nullable=False)
    is_superuser = Column(Boolean, default=False, nullable=False)
    first_name = Column(String(10), nullable=False)
    last_name = Column(String(30), nullable=False)
    country = Column(String(20), nullable=False)
    date_birth = Column(Date, nullable=True)
    phone_country_code = Column(Integer, nullable=False)
    phone_number = Column(Integer, nullable=False)
    is_landlord = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    is_staff= Column(Boolean, default=False)
    date_joined = Column(DateTime, server_default=func.now())
    # username = Column(String, default=email)

