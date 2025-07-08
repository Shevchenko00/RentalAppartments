from typing import Annotated

from pydantic import BaseModel, EmailStr, validator, constr, Field
import re
from datetime import date

from pydantic import BaseModel, EmailStr

class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class UserRegisterSchema(BaseModel):
    email: EmailStr
    password: str
    repeat_password: str
    phone_country_code: Annotated[
        str,
        Field(min_length=1, max_length=3, pattern=r"^\d+$")
    ]
    country: str
    phone_number: Annotated[
        str,
        Field(min_length=5, max_length=11, pattern=r"^\d+$")
    ]
    city: str
    first_name: str
    last_name: str
    date_birth: date | None = None

    is_landlord: bool = False

    @validator("first_name")
    def validate_first_name(cls, v):
        if not re.match(r"^[A-Za-z]+$", v):
            raise ValueError("First name must contain only letters")
        return v

    @validator("password")
    def validate_password_strength(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain at least one digit")
        if not any(c.isupper() for c in v):
            raise ValueError("Password must contain at least one uppercase letter")
        return v

    @validator("repeat_password")
    def passwords_match(cls, v, values):
        if "password" in values and v != values["password"]:
            raise ValueError("Passwords must match")
        return v
