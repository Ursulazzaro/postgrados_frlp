from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import uuid
from src.compartido.baseDeDatos.conexion import get_db
from src.inscripcion.infraestructura.orm_modelos import LegajoORM
from src.inscripcion.presentacion.esquemas import LegajoCrear, LegajoRespuesta

enrutador = APIRouter(prefix="/api/v1/inscripcion", tags=["Inscripción"])

@enrutador.post("/", response_model=LegajoRespuesta)
async def inscribir_aspirante(
    datos: LegajoCrear, 
    db: AsyncSession = Depends(get_db)
):
    nuevo_legajo = LegajoORM(
        dni=datos.dni,
        apellido=datos.apellido,
        nombre=datos.nombre,
        email=datos.email,
        tipo_carrera=datos.tipo_carrera,
        estado="PENDIENTE"
    )
    
    db.add(nuevo_legajo)
    try:
        await db.commit()
        await db.refresh(nuevo_legajo)
        return nuevo_legajo
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error al guardar: el email o DNI ya existen.")