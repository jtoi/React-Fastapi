# schemas.py
from pydantic import BaseModel, field_validator, Field, EmailStr
import re
from datetime import datetime


class UserCreate(BaseModel):
    name: str
    username: EmailStr = Field(..., description="E-mail")
    password: str = Field(..., min_length=8, description="Longitud mínima de 8 caracteres. debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.")
    # is_active: bool = True
    # is_deleted: bool = False

    @field_validator("password")
    def validate_password(cls, value):
        """
        Valida que la contraseña:
        - Tenga al menos una letra mayúscula.
        - Tenga al menos una letra minúscula.
        - Tenga al menos un número.
        - Tenga al menos 8 caracteres de longitud.
        """
        if len(value) < 8:
            raise ValueError("La contraseña debe tener al menos 8 caracteres.")
        if not re.search(r"[A-Z]", value):
            raise ValueError("La contraseña debe incluir al menos una letra mayúscula.")
        if not re.search(r"[a-z]", value):
            raise ValueError("La contraseña debe incluir al menos una letra minúscula.")
        if not re.search(r"[0-9]", value):
            raise ValueError("La contraseña debe incluir al menos un número.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):  # Opcional: símbolos
            raise ValueError("La contraseña debe incluir al menos un carácter especial.")
        if len(value) > 32:
            raise ValueError("La contraseña no debe exceder los 32 caracteres.")
        return value


class UserResponse(BaseModel):
    name: str
    username: str
    is_active: bool
    is_deleted: bool
    modified_date: datetime
    created_date: datetime

    @field_validator("created_date", "modified_date", mode='after')
    def format_dates(cls, value, field):
        # Si la fecha es None, devolver un valor predeterminado
        if value is None or value == "":
            return "1970-01-01 00:00:00"  # Valor predeterminado
        # Formatear la fecha si es válida
        if isinstance(value, datetime):
            return value.strftime("%Y-%m-%d %H:%M:%S")
        return value
    
    class Config:
        orm_mode = True



class UserInDB(UserResponse):
    hashed_password: str


