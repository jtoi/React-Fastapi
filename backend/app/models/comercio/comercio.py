from sqlalchemy import Column, Integer, String, Table, ForeignKey, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from app.database import Base

user_commerce = Table(
	'user_commerce',
	Base.metadata,
	Column('user_id', Integer, ForeignKey('users.id')),
	Column('commerce_id', Integer, ForeignKey('comercios.id'))
)

commerce_settings = Table(
	'commerce_settings',
	Base.metadata,
	Column('commerce_id', Integer, ForeignKey('comercios.id')),
	Column('setting_id', Integer, ForeignKey('settings.id')),
	Column('value', String(250), nullable=False)
)


class Commerce(Base):
	__tablename__ = "comercios"
	id = Column(Integer, primary_key=True)
	name = Column(String(150), index=True)
	nif = Column(String(80), unique=True)
	address = Column(String(250), nullable=False)
	phone = Column(String(20), nullable=False)
	email = Column(String(120), nullable=False, unique=True)
	description = Column(String(250), nullable=True)
	url = Column(String(120), nullable=True)
	is_active = Column(Boolean, nullable=False, default=True, index=True)
	is_deleted = Column(Boolean, nullable=False, default=False, index=True)
	inactive_date = Column(DateTime, nullable=True)
	modified_date = Column(DateTime, onupdate=func.now())
	created_date = Column(DateTime, server_default=func.now())

	users = relationship("User", secondary=user_commerce, back_populates="commerces")
	settings = relationship("Settings", secondary=commerce_settings, back_populates="commerces")


class Settings(Base):
	__tablename__ = "settings"
	id = Column(Integer, primary_key=True, index=True)
	name = Column(String(150), index=False)
	description = Column(String(250), nullable=True)
	is_deleted = Column(Boolean, nullable=True, default=False, index=True)
	modified_date = Column(DateTime, onupdate=func.now())
	created_date = Column(DateTime, server_default=func.now())
	commerces = relationship("Commerce", secondary=commerce_settings, back_populates="settings")