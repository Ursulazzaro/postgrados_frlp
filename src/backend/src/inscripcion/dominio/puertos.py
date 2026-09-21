from abc import ABC, abstractmethod
from typing import Any
from src.inscripcion.presentacion.esquemas import LegajoCrear

class LegajoRepositorio(ABC):
    @abstractmethod
    async def existe_por_email_o_dni(self, email: str, dni: str) -> bool:
        """Verifica si ya existe un aspirante con el mismo email o documento."""
        pass

    @abstractmethod
    async def guardar(self, datos: LegajoCrear) -> Any:
        """Persiste el nuevo legajo en la base de datos."""
        pass