from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.autenticacion.dominio.puertos import UsuarioRepositorio
from src.usuario.infraestructura.orm_modelos import UsuarioORM
from src.inscripcion.infraestructura.orm_modelos import LegajoORM


class UsuarioRepositorioPostgres(UsuarioRepositorio):

    def __init__(self, session: AsyncSession):
        self.session = session

    async def obtener_por_email(self, email: str):
        query = (
            select(UsuarioORM)
            .join(LegajoORM, UsuarioORM.legajo_id == LegajoORM.id)
            .where(LegajoORM.correo_electronico == email)
        )

        resultado = await self.session.execute(query)

        return resultado.scalars().first()