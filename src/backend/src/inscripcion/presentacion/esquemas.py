from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr


class LegajoCrear(BaseModel):
    carrera_elegida: str
    apellido: str
    nombre: str
    nacionalidad: str
    dni_pasaporte: str
    telefono_movil: Optional[str] = None
    correo_electronico: EmailStr
    correo_alternativo: Optional[EmailStr] = None
    domicilio: Optional[str] = None
    pais: str
    provincia: str
    ciudad: str
    titulo_anterior: str
    universidad_anterior: str


class LegajoRespuesta(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    carrera_elegida: str
    apellido: str
    nombre: str
    nacionalidad: str
    dni_pasaporte: str
    telefono_movil: Optional[str] = None
    correo_electronico: EmailStr
    correo_alternativo: Optional[EmailStr] = None
    domicilio: Optional[str] = None
    estado: str
    pais: str
    provincia: str
    ciudad: str
    titulo_anterior: str
    universidad_anterior: str


class LoginRequest(BaseModel):
    correo_electronico: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    rol: str
