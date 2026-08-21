import uuid
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from src.compartido.baseDeDatos.conexion import Base

class LegajoORM(Base):
    __tablename__ = "legajos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dni = Column(String(20), nullable=False)
    apellido = Column(String(100), nullable=False)
    nombre = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    estado = Column(String(30), nullable=False, default="PENDIENTE")
    tipo_carrera = Column(String(30))
    created_at = Column(DateTime, default=datetime.utcnow)