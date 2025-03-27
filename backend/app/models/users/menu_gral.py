# models
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from app.database import Base


class MenuGen(Base):
    """
    Modelo que tiene las opciones del menu general
    """
    __tablename__ = "menugral"
    
    id = Column(Integer, primary_key=True, index=True)
    permission_id = Column(Integer, ForeignKey("permissions.id"))
    son = Column(Integer, ForeignKey("menugral.id"), index=True, nullable=True)
    name = Column(String(150), index=False)
    url = Column(String(150), index=False)
    icon = Column(String(150), index=False, nullable=True)
    order = Column(Integer, index=False)
    is_active = Column(Boolean, nullable=True, default=True, index=True)
    is_deleted = Column(Boolean, nullable=True, default=False, index=True)
    modified_date = Column(DateTime, onupdate=func.now())
    created_date = Column(DateTime, server_default=func.now())
    