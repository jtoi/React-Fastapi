from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session
from app.auth.auth_handler import permission_required
from app.models.users import Group as GroupModel, Permission
from app.database import get_db

router = APIRouter()

# Esquemas para validación
class Group(BaseModel):
    name: str
    permissions: List[str] = []

# Datos simulados (puedes usar una base de datos real)
groups = []

# Crear grupo
@router.post("/groups/", dependencies=[permission_required("create_groups")])
async def create_group(group: Group, db: Session = Depends(get_db)):
    db_group = GroupModel(name=group.name)
    db_group.permissions = [db.query(Permission).filter(Permission.id == int(permission_id)).first() for permission_id in group.permissions]
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return {"message": "Grupo creado correctamente", "group": group}


# Modificar grupo
@router.put("/groups/{group_id}", dependencies=[permission_required("update_groups")])
async def update_group(group_id: int, updated_group: Group, db: Session = Depends(get_db)):
    # Obtener todos los IDs de los grupos desde la base de datos
    group_ids = [group.id for group in db.query(GroupModel).all()]
    
    # Verificar si el group_id proporcionado está en la lista
    if group_id not in group_ids:
        raise HTTPException(status_code=404, detail="Grupo no encontrado")
    
    # Actualizar el grupo en la base de datos
    group = db.query(GroupModel).filter(GroupModel.id == group_id).first()
    if group is None:
        raise HTTPException(status_code=404, detail="Grupo no encontrado")
    
    group.name = updated_group.name # type: ignore
    group.permissions = [db.query(Permission).filter(Permission.id == int(permission_id)).first() for permission_id in updated_group.permissions]
    db.commit()
    db.refresh(group)

    return {"message": "Grupo actualizado correctamente", "group": group}


# Listar grupos con validación de permisos
@router.get("/groups/", dependencies=[permission_required("view_groups")])
async def get_groups():
    return {"groups": groups}
