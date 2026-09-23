import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from backend.src.compartido.conexion import Base

class NoticiaORM(Base):
    __tablename__ = "docentes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)    
    dni = Column(String(100), nullable=False, unique="True")
    nombre = Column(String(200), nullable=False)
    apellido = Column(String(200), nullable=False)
    correo_electronico = Column(String(200), nullable=False, unique="True")
    contraseña = Column(String(200), nullable=False) 
    especialidad = Column(String(500), nullable=True) 
    activo = Column(Boolean, nullable=False, default="True")
    
class HistorialAccesoORM(Base):
    __table__= "historial_accesos"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), nullable=False)
    tipo_usuario = Column(String(20), nullable=False) 
    correo_electronico = Column(String(255), nullable=False)
    fecha_acceso = Column(DateTime, default=datetime.utcnow, nullable=False)
    exitoso = Column(Boolean, nullable=False, default=True)