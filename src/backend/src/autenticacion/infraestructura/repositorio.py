from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.inscripcion.infraestructura.orm_modelos import LegajoORM
from backend.src.autenticacion.infraestructura.orm_modelos import DocenteORM, HistorialAccesoORM


async def buscar_alumno_por_correo(db: AsyncSession, correo: str) -> LegajoORM | None:
    resultado = await db.execute(select(LegajoORM).where(LegajoORM.correo_electronico == correo))
    return resultado.scalar_one_or_none()


async def buscar_docente_por_correo(db: AsyncSession, correo: str) -> DocenteORM | None:
    resultado = await db.execute(select(DocenteORM).where(DocenteORM.correo_electronico == correo))
    return resultado.scalar_one_or_none()


async def guardar_historial(db: AsyncSession, usuario_id, tipo_usuario: str, correo: str, exitoso: bool):
    registro = HistorialAccesoORM(
        usuario_id=usuario_id,
        tipo_usuario=tipo_usuario,
        correo_electronico=correo,
        exitoso=exitoso,
    )
    db.add(registro)
    await db.commit()


async def obtener_historial_por_usuario(db: AsyncSession, usuario_id):
    resultado = await db.execute(
        select(HistorialAccesoORM)
        .where(HistorialAccesoORM.usuario_id == usuario_id)
        .order_by(HistorialAccesoORM.fecha_acceso.desc())
    )
    return resultado.scalars().all()