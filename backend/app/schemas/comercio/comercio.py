from pydantic import BaseModel, Field
from typing import Optional, List

class CommerceBase(BaseModel):
    name: str = Field(..., title="Nombre del comercio", max_length=150)
    nif: str = Field(..., title="Número de identificación fiscal", max_length=80)
    address: Optional[str] = Field(None, max_length=250)
    phone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=120)
    description: Optional[str] = Field(None, max_length=250)
    url: Optional[str] = Field(None, max_length=120)

class CommerceCreate(CommerceBase):
    """Datos necesarios para crear un comercio"""
    pass

class CommerceUpdate(CommerceBase):
    """Datos para actualizar un comercio (pueden ser opcionales)"""
    name: Optional[str]
    nif: Optional[str]

class CommerceResponse(CommerceBase):
    """Representación de un comercio al responder desde la API"""
    id: int
    is_active: bool
    is_deleted: bool
    inactive_date: Optional[str]
    modified_date: Optional[str]
    created_date: Optional[str]
    users: Optional[List[str]]  # Lista de usuarios relacionada con el comercio
    settings: Optional[List[str]]  # Lista de configuraciones relacionadas con el comercio

    class Config:
        orm_mode = True
