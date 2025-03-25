# schemas.py
from pydantic import BaseModel


class GroupCreate(BaseModel):
    name: str
    is_deleted: bool = False
    

class GroupResponse(BaseModel):
    name: str


class PermissionCreate(BaseModel):
    name: str
    group_id: int
    

class PermissionResponse(BaseModel):
    name: str
    group_id: int


class MenuGenResponse(BaseModel):
    name: str
    url: str
    icon: str
    parent_id: int
    order: int
    is_deleted: bool
    created_date: str
    modified_date: str
    group_id: int
    permission_id: int
    group: GroupResponse