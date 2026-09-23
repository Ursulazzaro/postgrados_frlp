from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from passlib.context import CryptContext
from jose import jwt
from fastapi import HTTPException

from backend.src.autenticacion.infraestructura import repositorio

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "CAMBIAR_ESTO_POR_VARIABLE_DE_ENTORNO"
ALGORITHM = "HS256"
EXPIRACION_MINUTOS = 60


def crear_token(usuario_id, tipo_usuario: str) -> str:
    payload = {
        "sub": str(usuario_id),
        "tipo_usuario": tipo_usuario,
        "exp": datetime.utcnow() + timedelta(minutes=EXPIRACION_MINUTOS),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


async def iniciar_sesion(correo: str, contrasena: str, db: AsyncSession):
    alumno = await repositorio.buscar_alumno_por_correo(db, correo)
    if alumno and alumno.contrasena_hash and pwd_context.verify(contrasena, alumno.contrasena_hash):
        await repositorio.guardar_historial(db, alumno.id, "ALUMNO", correo, True)
        return alumno, "ALUMNO"

    docente = await repositorio.buscar_docente_por_correo(db, correo)
    if docente and pwd_context.verify(contrasena, docente.contrasena_hash):
        await repositorio.guardar_historial(db, docente.id, "DOCENTE", correo, True)
        return docente, "DOCENTE"

    usuario_fallido = alumno or docente
    if usuario_fallido:
        tipo = "ALUMNO" if alumno else "DOCENTE"
        await repositorio.guardar_historial(db, usuario_fallido.id, tipo, correo, False)

    raise HTTPException(status_code=401, detail="Credenciales inválidas")


async def obtener_historial(usuario_id, db: AsyncSession):
    return await repositorio.obtener_historial_por_usuario(db, usuario_id)