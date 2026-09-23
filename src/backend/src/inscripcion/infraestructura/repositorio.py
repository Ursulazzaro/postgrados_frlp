from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from backend.src.autenticacion.dominio.puertos import LegajoRepositorio
from src.inscripcion.infraestructura.orm_modelos import LegajoORM
from src.inscripcion.presentacion.esquemas import LegajoCrear

# logica del metodo guardar para el mapea de los campos en Postgres 

class LegajoRepositorioPostgres(LegajoRepositorio):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def existe_por_email_o_dni(self, email: str, dni: str) -> bool:
        query = select(LegajoORM).where(or_(LegajoORM.correo_electronico == email, LegajoORM.dni_o_pasaporte == dni))
        resultado = await self.session.execute(query)
        return resultado.scalars().first() is not None
    
    async def guardar(self, datos: LegajoCrear) -> LegajoORM:
        nuevo_legajo = LegajoORM(
            carrera_elegida=datos.carrera_elegida,
            apellido=datos.apellido,
            nombre=datos.nombre,
            nacionalidad=datos.nacionalidad,
            dni_pasaporte=datos.dni_pasaporte,
            telefono_movil=datos.telefono_movil,
            correo_electronico=datos.correo_electronico,
            correo_alternativo=datos.correo_alternativo,
            domicilio=datos.domicilio,
            pais=datos.pais,
            provincia=datos.provincia,
            ciudad=datos.ciudad,
            titulo_anterior=datos.titulo_anterior,
            universidad_anterior=datos.universidad_anterior,
            estado="PENDIENTE"
        )
        self.session.add(nuevo_legajo)
        await self.session.commit()
        await self.session.refresh(nuevo_legajo)
        return nuevo_legajo
