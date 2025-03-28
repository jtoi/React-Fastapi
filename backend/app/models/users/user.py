# models
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    """
    Modelo que representa a un usuario en el sistema.
    """
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("groups.id"))
    name = Column(String(150), index=False)
    username = Column(String(150), unique=True)
    hashed_password = Column(String(150))
    is_active = Column(Boolean, default=True, index=True)
    is_deleted = Column(Boolean,default=False, index=True)
    is_superuser = Column(Boolean, default=False, index=True)
    modified_date = Column(DateTime, onupdate=func.now())
    created_date = Column(DateTime, server_default=func.now())

    group = relationship("Group", back_populates="users")
    commerces = relationship("Commerce", secondary="user_commerce", back_populates="users")

    def has_permission_to_create_commerce(self):
        return self.group.has_permission_to_create_commerce()


    