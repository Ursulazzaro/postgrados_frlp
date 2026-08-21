from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.compartido.baseDeDatos.conexion import Base, engine
from src.inscripcion.presentacion.rutas import enrutador as inscripcion_rutas


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Esto se ejecuta al encender el servidor
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title="Sistema de Posgrado API",
    description="API para la gestión del Sistema de Posgrado FRLP",
    version="0.1.0",
    lifespan=lifespan,
)

# Permitir al Frontend (puerto 3000) hablar con el Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API del Sistema de Posgrado (FastAPI)"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(inscripcion_rutas)