from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from src.compartido.conexion import get_db
from src.autenticacion.presentacion.esquema import LoginPeticion, LoginRespuesta, HistorialItem
from src.autenticacion.aplicacion.servicio import iniciar_sesion, crear_token, obtener_historial

enrutador = APIRouter(prefix="/api/v1/autenticacion", tags=["Autenticación"])


@enrutador.post("/login", response_model=LoginRespuesta)
async def login(datos: LoginPeticion, db: AsyncSession = Depends(get_db)):
    usuario, tipo_usuario = await iniciar_sesion(datos.correo_electronico, datos.contrasena, db)
    token = crear_token(usuario.id, tipo_usuario)
    return LoginRespuesta(
        id=usuario.id,
        nombre=usuario.nombre,
        apellido=usuario.apellido,
        correo_electronico=usuario.correo_electronico,
        tipo_usuario=tipo_usuario,
        token=token,
    )

@enrutador.get("/historial/{usuario_id}", response_model=list[HistorialItem])
async def historial(usuario_id: UUID, db: AsyncSession = Depends(get_db)):
    return await obtener_historial(usuario_id, db)