from datetime import timedelta, datetime, timezone

from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status, APIRouter, Body
from sqlalchemy.orm import Session
from ..config import settings

from ..auth.auth_handler import (
    authenticate_user, create_access_token, get_user, get_password_hash,
    create_refresh_token, verify_refresh_token, revoke_all_refresh_tokens,
    get_current_user
)
from ..database import get_db
from ..schemas.user import UserCreate, UserResponse
from ..schemas.token import Token, TokenData, RefreshTokenRequest
from ..models import User, RefreshToken, MenuGen as Menu, Group

router = APIRouter()


@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered.")
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password, name=user.name, modified_date=datetime.now(timezone.utc))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/token")
async def login_for_access_token(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: Session = Depends(get_db)
) -> Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # Revocar todos los refresh tokens previos (opcional)
    revoke_all_refresh_tokens(user.id, db) # type: ignore
    
    # Crear access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    # Crear refresh token
    refresh_token, expires_at = create_refresh_token(user.id, db) # type: ignore
    
    return Token(
        access_token=access_token, 
        refresh_token=refresh_token, 
        token_type="bearer",
        expires_at=expires_at
    )


@router.post("/refresh")
async def refresh_access_token(
    refresh_token_req: RefreshTokenRequest,
    db: Session = Depends(get_db)
) -> Token:
    # Verificar el refresh token
    user = verify_refresh_token(refresh_token_req.refresh_token, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Crear nuevo access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    # Crear nuevo refresh token (opcional, podemos mantener el mismo)
    # Aquí creo uno nuevo y revoco el anterior para mayor seguridad
    old_token = refresh_token_req.refresh_token
    db.query(RefreshToken).filter(RefreshToken.token == old_token).update({"is_revoked": True})
    
    refresh_token, expires_at = create_refresh_token(user.id, db) # type: ignore
    db.commit()
    
    return Token(
        access_token=access_token, 
        refresh_token=refresh_token, 
        token_type="bearer",
        expires_at=expires_at
    )


@router.post("/logout")
async def logout(
    refresh_token_req: RefreshTokenRequest,
    db: Session = Depends(get_db)
):
    # Revocar el refresh token actual
    db.query(RefreshToken).filter(RefreshToken.token == refresh_token_req.refresh_token).update({"is_revoked": True})
    db.commit()
    return {"detail": "Successfully logged out"}


@router.get("/menus/")
async def menus(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Obtener el grupo del usuario
    group = db.query(Group).filter(Group.id == current_user.group_id).first()
    
    if not group:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not belong to a valid group"
        )
    
    # Obtener los permisos del grupo del usuario
    user_permissions = set(permission.id for permission in group.permissions)
    
    # Obtener todos los menús principales (son = None)
    main_menus = db.query(Menu).filter(Menu.son == None, Menu.is_active == True, Menu.is_deleted == False).order_by(Menu.order).all()
    
    # Obtener todos los submenús
    sub_menus = db.query(Menu).filter(Menu.son != None, Menu.is_active == True, Menu.is_deleted == False).order_by(Menu.order).all()
    
    # Función para verificar si un menú o submenú es accesible
    def is_accessible(menu):
        if menu.permission_id is None or menu.permission_id == 0 or menu.permission_id == "":
            return True
        return menu.permission_id in user_permissions
    
    # Función para construir la estructura de menús y submenús
    def build_menu_structure(menu):
        menu_dict = {
            "id": menu.id,
            "name": menu.name,
            "url": menu.url,
            "icon": menu.icon,
            "order": menu.order,
            "submenus": []
        }
        
        # Agregar submenús si existen
        for sub_menu in sub_menus:
            if sub_menu.son == menu.id and is_accessible(sub_menu):
                menu_dict["submenus"].append(build_menu_structure(sub_menu))
        
        return menu_dict
    
    # Filtrar y construir la lista de menús principales
    accessible_menus = []
    for menu in main_menus:
        # Verificar si el menú principal es accesible o si alguno de sus submenús es accesible
        if is_accessible(menu) or any(sub_menu.son == menu.id and is_accessible(sub_menu) for sub_menu in sub_menus):
            accessible_menus.append(build_menu_structure(menu))
    
    return {"menus": accessible_menus}