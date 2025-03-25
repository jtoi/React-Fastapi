from fastapi import Depends, HTTPException, Security
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Función simulada para obtener usuario desde el token (puedes usar JWT o tu sistema de autenticación)
def get_current_user(token: str = Depends(oauth2_scheme)):
    # Simulación de usuario obtenido desde el token
    user = {"username": "admin", "group": "superadmin"}
    if not user:
        raise HTTPException(status_code=401, detail="No autenticado")
    return user

# Dependencia para validar permisos
def superadmin_required(current_user: dict = Depends(get_current_user)):
    if current_user["group"] != "superadmin":
        raise HTTPException(status_code=403, detail="No autorizado")
    return current_user