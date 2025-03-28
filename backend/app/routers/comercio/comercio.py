from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.auth.auth_handler import permission_required
from app.models.comercio.comercio import Commerce  # Tu modelo de comercio
from app.models.users.user import User  # Tu modelo de usuario
from app.schemas.comercio.comercio import CommerceResponse, CommerceCreate  # Tu esquema de respuesta
from app.middleware.custom_middleware import get_db  # Funciones para obtener la DB y el usuario actual
from app.auth.auth_handler import get_current_user


router = APIRouter()

@router.get("/commerces/", response_model=list[CommerceResponse])
def get_user_commerces(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    dependencies=[permission_required("view_commerce")]
):
    """
    Retorna todos los comercios asociados al usuario autenticado.
    """
    # Verificar que el usuario tiene comercios asociados
    if not current_user.commerces:
        raise HTTPException(status_code=404, detail="No tienes comercios asociados.")

    # Recuperar y devolver los comercios asociados
    return current_user.commerces


@router.get("/commerce/{commerce_id}", response_model=CommerceResponse)
def get_commerce(
    commerce_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    dependencies=[permission_required("view_commerce")]
):
    """
    Retorna un comercio específico asociado al usuario autenticado.
    """
    # Verificar que el usuario tiene acceso al comercio
    if commerce_id not in [commerce.id for commerce in current_user.commerces]:
        raise HTTPException(status_code=403, detail="No tienes acceso a este comercio.")

    # Recuperar y devolver el comercio
    return db.query(Commerce).filter(Commerce.id == commerce_id).first()


@router.post(
    "/commerce", 
    response_model=CommerceResponse, 
    dependencies=[permission_required("create_commerce")]
)
def create_commerce(
    commerce: CommerceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Crea un nuevo comercio asociado al usuario autenticado.

    Args:
        commerce (CommerceCreate): Datos del comercio a crear.
        db (Session): Sesión de base de datos.
        current_user (User): Usuario autenticado.

    Returns:
        CommerceResponse: Comercio recién creado.
    """
    # Validación de permisos en el usuario actual
    if not current_user.has_permission_to_create_commerce:
        raise HTTPException(status_code=403, detail="No tienes permiso para crear un comercio.")

    # Verificar si existe un comercio con el mismo NIF
    existing_commerce = db.query(Commerce).filter(Commerce.nif == commerce.nif).first()
    if existing_commerce:
        raise HTTPException(status_code=400, detail="Ya existe un comercio con este NIF.")

    # Crear el comercio
    new_commerce = Commerce(**commerce.dict())
    db.add(new_commerce)
    db.commit()
    db.refresh(new_commerce)

    return new_commerce



