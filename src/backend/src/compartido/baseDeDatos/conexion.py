import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base

# Leemos la URL de la base de datos de las variables de entorno
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgrado_user:postgrado_dev_password@localhost:5432/postgrado_dev")

# Creamos el motor asíncrono
engine = create_async_engine(DATABASE_URL, echo=True)

# Creamos el creador de sesiones
AsyncSessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False)

# Clase base para nuestros modelos
Base = declarative_base()

# Dependencia para FastAPI
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session