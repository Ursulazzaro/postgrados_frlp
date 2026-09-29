import uuid
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from src.compartido.conexion import Base

class NoticiaORM(Base):
    __tablename__ = "noticias"


    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    titulo = Column(String(200), nullable=False)
    resumen = Column(String(300), nullable=False)
    contenido = Column(Text, nullable=False)
    categoria = Column(String(50), nullable=False)
    imagen_url = Column(String(500), nullable=True)
    
    fecha_publicacion = Column(DateTime, default=datetime.utcnow)