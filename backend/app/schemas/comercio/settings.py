from typing import List, Optional
from pydantic import BaseModel, Field
from .comercio import CommerceBase


class SettingsBase(BaseModel):
    name: str = Field(..., title="Nombre de la configuración", max_length=150)
    description: Optional[str] = Field(None, max_length=250)
    is_deleted: bool = Field(False, title="Estado de eliminación")

    class Config:
        orm_mode = True


class SettingsCreate(SettingsBase):
    """Datos necesarios para crear una configuración"""
    pass


class SettingsUpdate(SettingsBase):
    """Datos para actualizar una configuración"""
    name: str
    description: Optional[str]
    is_deleted: bool


class SettingsResponse(SettingsBase):
    """Representación de una configuración al responder desde la API"""
    id: int
    modified_date: Optional[str]
    created_date: Optional[str]
    commerces: Optional[List["CommerceBase"]]  # Relación con comercios

# Importación lazy
from .comercio import CommerceBase