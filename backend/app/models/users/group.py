from sqlalchemy import Column, Integer, String, Table, ForeignKey, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from app.database import Base

# Tabla de relación entre grupos y permisos
group_permission = Table(
    'group_permission',
    Base.metadata,
    Column('group_id', Integer, ForeignKey('groups.id')),
    Column('permission_id', Integer, ForeignKey('permissions.id'))
)

class Group(Base):
    __tablename__ = "groups"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), index=False)
    description = Column(String(250), nullable=True)
    is_deleted = Column(Boolean, nullable=True, default=False, index=True)
    modified_date = Column(DateTime, onupdate=func.now())
    created_date = Column(DateTime, server_default=func.now())
    permissions = relationship("Permission", secondary=group_permission, back_populates="groups")

    users = relationship("User", back_populates="group")

class Permission(Base):
    __tablename__ = "permissions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    description = Column(String(250), nullable=True)
    groups = relationship("Group", secondary=group_permission, back_populates="permissions")
