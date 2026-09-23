from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from src.compartido.conexion import get_db
from src.inscripcion.infraestructura.orm_modelos import LegajoORM
from src.inscripcion.presentacion.esquemas import LegajoCrear, LegajoRespuesta


enrutador = APIRouter(prefix="/api/v1/inscripcion", tags=["Inscripción"])


@enrutador.post("/", response_model=LegajoRespuesta, status_code=201)
async def inscribir_aspirante(
    datos: LegajoCrear,
    db: AsyncSession = Depends(get_db),
):
    duplicado = await db.scalar(
        select(LegajoORM.id).where(
            or_(
                LegajoORM.correo_electronico == datos.correo_electronico,
                LegajoORM.dni_pasaporte == datos.dni_pasaporte,
            )
        )
    )
    if duplicado is not None:
        raise HTTPException(
            status_code=409,
            detail="Ya existe una inscripción con ese correo electrónico o documento.",
        )

    nuevo_legajo = LegajoORM(
        **datos.model_dump(),
        estado="PENDIENTE",
    )
    db.add(nuevo_legajo)

    try:
        await db.commit()
        await db.refresh(nuevo_legajo)
    except IntegrityError as exc:
        await db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Ya existe una inscripción con ese correo electrónico o documento.",
        ) from exc

    return nuevo_legajo
