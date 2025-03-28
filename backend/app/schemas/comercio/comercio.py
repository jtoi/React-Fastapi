from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from pydantic import validator
from datetime import datetime

from app.models.users.user import User  # Import the User class or type from the appropriate module


class CommerceBase(BaseModel):
	name: str = Field(..., title="Nombre del comercio", max_length=150)
	nif: str = Field(..., title="Número de identificación fiscal", max_length=80)
	address: str = Field(..., max_length=250)
	phone: str = Field(..., max_length=20)
	email: EmailStr = Field(..., max_length=120)
	description: Optional[str] = Field(None, max_length=250)
	url: Optional[str] = Field(None, max_length=120)

	class Config:
		orm_mode = True

class CommerceCreate(CommerceBase):
	"""Datos necesarios para crear un comercio"""
	name: str
	nif: str
	address: str
	phone: str
	email: str
	description: Optional[str]
	url: Optional[str]

class CommerceUpdate(CommerceBase):
	"""Datos para actualizar un comercio (pueden ser opcionales)"""
	name: str
	nif: str
	address: str
	phone: str
	email: str
	description: Optional[str]
	url: Optional[str]
	is_active: bool
	is_deleted: bool
	inactive_date: Optional[str]
	

class CommerceResponse(CommerceBase):
    """Representación de un comercio al responder desde la API"""
    id: int
    is_active: bool
    is_deleted: bool
    inactive_date: Optional[str]
    modified_date: Optional[str]
    created_date: Optional[str]
    users: Optional[List[str]]  # Lista de usuarios relacionada con el comercio
    settings: Optional[List["SettingsBase"]]  # Relación con configuraciones

    @validator('users', pre=True)
    def convert_users_to_strings(cls, value):
        if value and isinstance(value[0], User):  # Verificar si es una lista de objetos User
            return [user.username for user in value]  # Extraer el username de cada usuario
        return value

# Importación lazy
from .settings import SettingsBase