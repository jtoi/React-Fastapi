from fastapi import Depends, HTTPException, Security
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import SessionLocal  # Importa tu configuración de SQLAlchemy
from app.models.users import User  # Importa tu modelo de usuario
from app.auth.auth_handler import get_current_user  # Importa tu función de decodificación de token



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    """Obtiene una sesión de la base de datos."""
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Función simulada para obtener usuario desde el token (puedes usar JWT o tu sistema de autenticación)
# def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
#     # Decodificar el token y obtener información del usuario
#     payload = decode_token(token)  # decode_token debería devolver el ID del usuario, etc.
#     user_id = payload.get("sub")
#     if not user_id:
#         raise HTTPException(status_code=401, detail="Token inválido")

#     # Consultar el usuario en la base de datos
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="Usuario no encontrado")

#     return user

# Dependencia para validar permisos
def superadmin_required(current_user: dict = Depends(get_current_user)):
    if current_user["group"] != "superadmin":
        raise HTTPException(status_code=403, detail="No autorizado")
    return current_user