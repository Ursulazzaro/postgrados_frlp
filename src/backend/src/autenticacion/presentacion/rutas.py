from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.compartido.conexion import get_db
from src.inscripcion.presentacion.esquemas import LoginRequest, Token
from src.autenticacion.infraestructura.repositorio import UsuarioRepositorioPostgres
from src.autenticacion.aplicacion.servicio import iniciar_sesion


enrutador = APIRouter(
    prefix="/api/v1/autenticacion",
    tags=["Autenticación"]
)


@enrutador.post("/login", response_model=Token)
async def login(
    datos: LoginRequest,
    db: AsyncSession = Depends(get_db)
):
    repositorio = UsuarioRepositorioPostgres(db)

    return await iniciar_sesion(
        datos.correo_electronico,
        datos.password,
        repositorio
    )