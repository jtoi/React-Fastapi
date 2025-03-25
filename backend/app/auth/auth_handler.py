import jwt
import uuid
from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas.token import TokenData
from ..models import User, Permission, RefreshToken, Group
from ..config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

router = APIRouter()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db: Session, username: str):
    db_user = db.query(User).filter(User.username == username, User.is_active == True, User.is_deleted == False).first()
    return db_user


def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire, "token_type": "access"})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def create_refresh_token(user_id: int, db: Session):
    # Crear un token único
    token_value = str(uuid.uuid4())
    expires = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    # Guardar en la base de datos
    refresh_token = RefreshToken(
        token=token_value,
        user_id=user_id,
        expires_at=expires,
        is_revoked=False
    )
    db.add(refresh_token)
    db.commit()
    db.refresh(refresh_token)
    
    return token_value, expires


def verify_refresh_token(token: str, db: Session):
    # Buscar el token en la base de datos
    db_token = db.query(RefreshToken).filter(
        RefreshToken.token == token,
        RefreshToken.is_revoked == False,
        RefreshToken.expires_at > datetime.now(timezone.utc)
    ).first()
    
    if not db_token:
        return None
    
    # Obtener el usuario asociado
    user = db.query(User).filter(User.id == db_token.user_id).first()
    return user


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        token_type = payload.get("token_type")
        if username is None or token_type != "access":
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception

    # Buscar al usuario en la base de datos
    user = db.query(User).filter(User.username == token_data.username).first()
    if user is None:
        raise credentials_exception

    # Validar que el usuario tenga un grupo asignado
    if not user.group_id: # type: ignore
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not belong to any group"
        )
    
    return user



async def get_current_active_user(current_user: User = Depends(get_current_user)):
    return current_user

    
async def has_permission(permission_name: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Obtener el grupo completo del usuario usando el ID
    group = db.query(Group).filter(Group.id == current_user.group_id).first()
    if not group:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not belong to a valid group"
        )

    # Verifica si el permiso existe y está asociado al grupo
    permission = db.query(Permission).filter(Permission.name == permission_name).first()
    if not permission or permission not in group.permissions:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )


def permission_required(permission_name: str):
    async def dependency(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
    ):
        # Llamamos a has_permission para verificar permisos
        await has_permission(permission_name, current_user, db)
    return Depends(dependency)


def revoke_all_refresh_tokens(user_id: int, db: Session):
    # Revoca todos los tokens de actualización del usuario
    db.query(RefreshToken).filter(
        RefreshToken.user_id == user_id,
        RefreshToken.is_revoked == False
    ).update({"is_revoked": True})
    db.commit()