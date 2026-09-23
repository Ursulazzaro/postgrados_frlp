import uuid

from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from backend.src.compartido.conexion import Base


class UsuarioORM(Base):
    __tablename__ = "usuarios"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    legajo_id = Column(
        UUID(as_uuid=True),
        ForeignKey("legajos.id"),
        unique=True,
        nullable=False
    )

    password = Column(
        String(255),
        nullable=False
    )

    tipo_usuario = Column(
        String(20),
        nullable=False
    )

    tipo_alumno = Column(
        String(20),
        nullable=True
    )