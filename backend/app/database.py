from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

# Declaración base para modelos
Base = declarative_base()

# URL de conexión (ajusta los valores según tu configuración)
DATABASE_URL = "mysql+pymysql://root:root@localhost:3307/veascanF_db"

# Motor de la base de datos
engine = create_engine(DATABASE_URL)

# Sesión para ejecutar operaciones en la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
metadata = MetaData()

# Función para inicializar la base de datos (opcional para crear tablas)
def init_db():
    """Inicializa las tablas en la base de datos (una sola vez)."""
    Base.metadata.create_all(bind=engine)

# Función para obtener una sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()