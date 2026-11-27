# Inicialización del backend — FastAPI y PostgreSQL

Sistema de Gestión de Posgrados · UTN FRLP · Desarrollo de Software 2026

## 1. Requisitos previos

Para ejecutar el entorno completo se requiere Git, Docker Desktop iniciado y Docker Compose. No es necesario instalar Python ni PostgreSQL en la computadora si se utilizan los contenedores.

## 2. Inicialización mediante Docker (recomendada)

Desde la raíz de `postgrados_frlp`, crear el archivo de configuración únicamente si todavía no existe:

```bash
[ -f .env ] || cp .env.example .env
```

Revisar las variables de entorno y levantar los servicios:

```bash
docker compose config --quiet
docker compose up -d --build
docker compose ps
```

Compose inicia PostgreSQL 15, espera su disponibilidad, inicia FastAPI y espera que responda `/health` antes de iniciar el frontend.

En un volumen de PostgreSQL nuevo, la imagen crea el usuario y la base definidos por `DB_USER`, `DB_PASSWORD` y `DB_NAME`. Según la guía original del proyecto, FastAPI crea las tablas al arrancar. No ejecutar scripts manuales de creación de tablas ni migraciones sin verificar previamente el mecanismo de inicialización vigente.

| Servicio | Contenedor | Puerto externo | Puerto interno |
|---|---|---:|---:|
| PostgreSQL | `postgrado-db` | 5433 | 5432 |
| Backend | `postgrado-backend` | 8000 | 8000 |
| Frontend | `postgrado-frontend` | 3000 | 3000 |

## 3. Variables de entorno y conexión

Dentro de Docker, el backend se conecta a PostgreSQL utilizando el nombre del servicio `db`:

```dotenv
DATABASE_URL=postgresql+asyncpg://postgrado_user:postgrado_dev_password@db:5432/postgrado_dev
```

Si se ejecuta el backend directamente desde la computadora y PostgreSQL está en Docker, utilizar el puerto publicado:

```dotenv
DATABASE_URL=postgresql+asyncpg://postgrado_user:postgrado_dev_password@127.0.0.1:5433/postgrado_dev
```

Si PostgreSQL está instalado localmente, utilizar el puerto real de esa instalación (habitualmente 5432).

Los valores anteriores son ejemplos de desarrollo. Deben coincidir con las credenciales de la base existente. Modificar `DB_PASSWORD` no cambia automáticamente la contraseña de un usuario en un volumen ya inicializado.

No publicar archivos `.env`, contraseñas, claves JWT ni credenciales SMTP. Documentar las variables en `.env.example`. Compose carga los archivos `.env` configurados para el backend y sus variables explícitas en `environment` tienen prioridad. Para ejecución local, verificar cómo carga la configuración la aplicación.

## 4. Verificar el funcionamiento

| URL | Finalidad |
|---|---|
| http://localhost:8000/health | Verificar disponibilidad del backend |
| http://localhost:8000/docs | Consultar y probar la API mediante Swagger |
| http://localhost:8000/redoc | Consultar documentación alternativa, si está habilitada |
| http://localhost:3000 | Acceder al frontend |

```bash
curl -i http://localhost:8000/health
docker compose logs --tail 100 backend
docker compose logs --tail 100 db
```

El healthcheck debe responder correctamente (HTTP 2xx). No se debe asumir que todas las operaciones de negocio funcionan únicamente porque responde este endpoint.

Los endpoints funcionales utilizan el prefijo `/api/v1`. El healthcheck está en la raíz de la API.

## 5. Ejecución local del backend (alternativa)

Verificar la versión de Python requerida por el Dockerfile y las dependencias actuales. La guía anterior indica Python 3.12; confirmar esa versión antes de instalar.

Desde la raíz del proyecto, si se quiere utilizar únicamente PostgreSQL en Docker:

```bash
docker compose up -d db
docker compose ps db
```

Si el backend de Docker ya está ejecutándose, detenerlo para liberar el puerto 8000:

```bash
docker compose stop backend
```

Desde Git Bash en Windows:

```bash
cd src/backend
python --version
python -m venv .venv
source .venv/Scripts/activate
python -m pip install -r requirements.txt
```

Configurar las variables de entorno para ejecución local, en particular `DATABASE_URL` con `127.0.0.1:5433` si se usa PostgreSQL en Docker. Verificar la carga del archivo de entorno en el código actual o exportar las variables necesarias en la terminal.

```bash
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Si se utiliza una instalación independiente de PostgreSQL, crear el usuario y la base solamente si no existen. Conectarse con una cuenta administrativa mediante `psql` y ejecutar, para una base nueva de desarrollo:

```sql
CREATE USER postgrado_user WITH PASSWORD 'postgrado_dev_password';
CREATE DATABASE postgrado_dev OWNER postgrado_user;
```

No ejecutar estas instrucciones sobre una base compartida o existente sin verificar sus usuarios y configuración.

## 6. Diagnóstico de problemas

### Comprobar PostgreSQL

```bash
docker compose ps db
docker compose exec db sh -c 'pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
docker compose exec db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

Dentro de `psql` se pueden realizar consultas de diagnóstico:

```sql
SELECT current_database(), current_user;
\dt
\q
```

### Comprobar el backend

```bash
docker compose ps
docker compose logs --tail 100 backend
curl -i http://localhost:8000/health
```

Para comprobar la conexión a la base desde la aplicación, se puede utilizar el motor SQLAlchemy existente, una vez confirmada su ruta de importación, y ejecutar una consulta `SELECT 1`. No es necesario crear una conexión independiente en cada módulo.

### Errores frecuentes

| Error | Causa posible | Solución |
|---|---|---|
| `ConnectionResetError` o `ConnectionDoesNotExistError` | Conexión interrumpida, servicio no disponible o configuración incorrecta | Revisar estado, logs, host y puerto de PostgreSQL |
| `Connection refused` | Servicio detenido o puerto incorrecto | Verificar `docker compose ps` y la configuración de conexión |
| `password authentication failed` | Credenciales incorrectas | Revisar las credenciales reales del usuario existente |
| `database does not exist` | Base incorrecta o no inicializada | Revisar `DB_NAME` y los datos del volumen |
| `ModuleNotFoundError` | Dependencia ausente o entorno virtual incorrecto | Instalar las dependencias del proyecto o reconstruir la imagen |
| `Address already in use` | Puerto ocupado | Identificar el proceso o contenedor que utiliza ese puerto |
| Cambios en `.env` sin efecto | Variables sobrescritas o contenedor no recreado | Revisar precedencia y recrear el servicio afectado |
| Error CORS | Origen del frontend no autorizado | Revisar la configuración CORS del backend y el origen real del navegador |

No desactivar el firewall ni el antivirus como solución general. Revisar reglas específicas de conectividad si corresponde.

## 7. Mantenimiento y persistencia

```bash
# Logs en tiempo real
docker compose logs -f backend

# Reiniciar el backend
docker compose restart backend

# Reconstruir y recrear cuando cambian dependencias o configuraciones
docker compose up -d --build

# Detener el entorno conservando los volúmenes
docker compose down
```

Los volúmenes `postgrado-pgdata` y `postgrado-storage` conservan la base de datos y los archivos almacenados en la ruta configurada. No ejecutar `docker compose down -v` salvo que se quiera eliminar deliberadamente los volúmenes y se cuente con un respaldo adecuado.

---

Consultar también el README general, el README del backend y la documentación de integración frontend-backend.
