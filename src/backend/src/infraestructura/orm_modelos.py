import uuid
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from backend.src.compartido.conexion import Base

class NoticiaORM(Base):
    __tablename__ = "noticias"

    # El ID único
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Los campos que vimos en tu mockup
    titulo = Column(String(200), nullable=False)
    resumen = Column(String(300), nullable=False)
    contenido = Column(Text, nullable=False) # Text permite textos larguísimos
    categoria = Column(String(50), nullable=False) # Ej: "Becas", "Academico"
    imagen_url = Column(String(500), nullable=True) # La ruta a la fotito
    
    # Cuándo se publicó
    fecha_publicacion = Column(DateTime, default=datetime.utcnow)