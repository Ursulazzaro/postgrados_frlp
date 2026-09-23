import jwt

from datetime import datetime, timedelta, timezone

from passlib.context import CryptContext

from fastapi import HTTPException, status

from src.autenticacion.infraestructura.repositorio import UsuarioRepositorioPostgres


SECRET_KEY = "clave-secreta-desarrollo"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def verificar_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def crear_token(usuario) -> str:
    ahora = datetime.now(timezone.utc)

    payload = {
        "sub": str(usuario.id),
        "rol": usuario.tipo_usuario,
        "exp": ahora + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


async def iniciar_sesion(
    email: str,
    password: str,
    repositorio: UsuarioRepositorioPostgres
):
    usuario = await repositorio.obtener_por_email(email)

    if usuario is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos"
        )

    if not verificar_password(password, usuario.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos"
        )

    token = crear_token(usuario)

    return {
        "access_token": token,
        "token_type": "bearer",
        "rol": usuario.tipo_usuario
    }