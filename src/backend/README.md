# Sistema de Posgrado UTN FRLP — Backend

API REST del Sistema de Gestión de Posgrados de la Universidad Tecnológica Nacional, Facultad Regional La Plata.

**Proyecto integrador · Desarrollo de Software · Ingeniería en Sistemas de Información · 2026**

## 1. Objetivo

El backend centraliza las reglas de negocio, la autenticación, la autorización, la persistencia de datos y la gestión documental del sistema. Proporciona los servicios consumidos por el frontend para digitalizar la inscripción, matriculación y seguimiento académico de posgrados.

## 2. Tecnologías

| Tecnología | Finalidad |
|---|---|
| Python | Lenguaje de programación |
| FastAPI | API REST, validación de solicitudes y documentación OpenAPI |
| Uvicorn | Servidor ASGI |
| Pydantic | Esquemas y validación de datos |
| SQLAlchemy | Modelado y acceso a datos mediante ORM |
| asyncpg | Driver asíncrono de PostgreSQL |
| PostgreSQL 15 Alpine | Base de datos relacional |
| JWT | Autenticación mediante tokens |
| SMTP | Envío de correo institucional |
| Pytest | Pruebas automatizadas del backend |
| Docker y Docker Compose | Entorno de desarrollo reproducible |

## 3. Funcionalidades

| Área | Responsabilidades del backend |
|---|---|
| Portal público | Proveer carreras, noticias, calendario y configuración pública |
| Inscripción | Registrar aspirantes, validar datos y documentos, consultar solicitudes y seguimiento |
| Conducción | Gestionar revisión, observaciones, aprobación y matriculación según las reglas académicas |
| Administración | Gestionar usuarios, carreras, cohortes, docentes y seminarios |
| CPR | Gestionar trabajos prácticos, tutorías y registros de trabajos finales |
| Docentes | Consultar seminarios asignados, asociar estudiantes habilitados, registrar asistencia y calificaciones |
| Estudiantes | Consultar cursadas, inscribirse a seminarios habilitados y consultar seguimiento académico |
| Notificaciones | Registrar eventos relevantes y gestionar comunicaciones institucionales |

La disponibilidad exacta de cada operación depende del rol, del estado académico y de las reglas del dominio.

## 4. Arquitectura

Los módulos separan las responsabilidades de presentación, aplicación y persistencia. La organización concreta puede variar según el dominio.

```mermaid
flowchart TD
    A[Frontend React] -->|HTTP / JSON / JWT| B[FastAPI: rutas]
    B --> C[Validación y autorización]
    C --> D[Servicios de aplicación]
    D --> E[Repositorios y modelos ORM]
    E --> F[(PostgreSQL)]
    D --> G[Almacenamiento documental]
    D --> H[Correo SMTP y notificaciones]
```

- **Presentación:** define endpoints, recibe solicitudes y devuelve respuestas HTTP.
- **Aplicación:** coordina operaciones y aplica reglas de negocio.
- **Dominio:** representa las reglas y conceptos académicos cuando están separados en el módulo.
- **Infraestructura:** implementa persistencia, acceso a servicios externos y almacenamiento.
- **Compartido:** reúne utilidades utilizadas por distintos módulos.

El frontend no accede directamente a PostgreSQL. Toda operación académica debe atravesar los servicios y controles de autorización de la API.

## 5. Organización del código

Estructura resumida de los archivos y módulos conocidos:

```text
src/backend/
├── main.py
├── Dockerfile.dev
├── requirements.txt
├── src/
│   ├── compartido/
│   │   └── correo.py
│   ├── inscripcion/
│   │   └── infraestructura/
│   │       ├── orm_modelos.py
│   │       └── cohortes_modelos.py
│   ├── seminarios/
│   │   ├── aplicacion/
│   │   │   ├── legajos.py
│   │   │   └── servicio.py
│   │   └── presentacion/
│   │       └── rutas.py
│   └── ...
├── tests/
└── README.md
```

El árbol es orientativo y no pretende enumerar todos los módulos del repositorio.

## 6. Requisitos y ejecución con Docker

Se necesita Git y Docker Desktop con Docker Compose. No es necesario instalar Python ni PostgreSQL localmente para esta modalidad.

Desde la raíz del repositorio, crear `.env` a partir del ejemplo si todavía no existe:

```bash
[ -f .env ] || cp .env.example .env
```

Configurar las variables necesarias y ejecutar:

```bash
docker compose config --quiet
docker compose up -d --build
docker compose ps
```

Compose espera que PostgreSQL esté saludable antes de iniciar FastAPI y que la API responda a `/health` antes de iniciar el frontend.

| Servicio | Dirección local | Contenedor |
|---|---|---|
| API | http://localhost:8000 | `postgrado-backend` |
| Swagger UI | http://localhost:8000/docs | `postgrado-backend` |
| ReDoc | http://localhost:8000/redoc | `postgrado-backend` |
| Healthcheck | http://localhost:8000/health | `postgrado-backend` |
| PostgreSQL | localhost:5433 | `postgrado-db` |
| Frontend | http://localhost:3000 | `postgrado-frontend` |

## 7. Variables de entorno

Los archivos `.env` son privados. Documentar valores de ejemplo en `.env.example`, nunca secretos reales.

| Variable | Descripción |
|---|---|
| `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Configuración de PostgreSQL |
| `DATABASE_URL` | Cadena de conexión SQLAlchemy con asyncpg |
| `SECRET_KEY` | Clave de autenticación |
| `JWT_SECRET` | Alternativa aceptada por Compose para configurar `SECRET_KEY` |
| `STORAGE_PATH` | Directorio de almacenamiento documental |
| `ENVIRONMENT` | Entorno de ejecución |
| `ADMIN_EMAIL` | Correo administrativo configurado en el servicio backend |
| `FRONTEND_URL` | URL utilizada para enlaces de correos institucionales |
| Variables SMTP | Servidor, puerto y credenciales; consultar `.env.example` |

La configuración de Compose admite archivos de entorno de la raíz y de `src/backend/`. Los valores declarados explícitamente en `environment` prevalecen sobre `env_file`.

Ejemplo de conexión **interna** en Docker, con credenciales de desarrollo:

```dotenv
DATABASE_URL=postgresql+asyncpg://postgrado_user:postgrado_dev_password@db:5432/postgrado_dev
```

Para un backend ejecutado **fuera** de Docker con la base en el contenedor:

```dotenv
DATABASE_URL=postgresql+asyncpg://postgrado_user:postgrado_dev_password@localhost:5433/postgrado_dev
```

No utilizar las contraseñas ni claves predeterminadas de desarrollo en producción. No imprimir ni compartir la configuración resuelta de Compose si contiene secretos.

## 8. Ejecución local (opcional)

Desde `src/backend`, utilizar la versión de Python compatible con el Dockerfile y las dependencias del proyecto.

```bash
python --version
python -m venv .venv
source .venv/Scripts/activate  # Git Bash en Windows
python -m pip install -r requirements.txt
```

En Linux o macOS, activar con `source .venv/bin/activate`.

Levantar PostgreSQL desde la raíz del repositorio:

```bash
docker compose up -d db
```

Configurar la conexión local y las variables necesarias en el entorno del proceso. Desde `src/backend`:

```bash
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

No ejecutar simultáneamente el backend local y el contenedor backend en el mismo puerto.

## 9. API REST e integración con frontend

La URL base utilizada por el frontend en Docker es `http://localhost:8000/api/v1`. El endpoint `/health` está fuera del prefijo de la API.

Ejemplos de rutas conocidas:

| Método | Ruta | Finalidad |
|---|---|---|
| GET | `/health` | Comprobar disponibilidad |
| GET | `/api/v1/seminarios/mis-seminarios` | Seminarios asignados al docente |
| GET | `/api/v1/seminarios/{id}/estudiantes` | Estudiantes asociados |
| GET | `/api/v1/seminarios/{id}/estudiantes/candidatos` | Estudiantes habilitados para asociar |
| POST | `/api/v1/seminarios/{id}/estudiantes` | Asociar un estudiante |
| GET | `/api/v1/seminarios/mi-cursada` | Historial de cursadas del alumno |
| GET | `/api/v1/seminarios/disponibles` | Seminarios disponibles para el alumno |
| GET | `/api/v1/tutorias` | Consulta de tutorías según permisos |

Consultar Swagger para ver los contratos, parámetros, esquemas y requisitos de autenticación vigentes.

```bash
curl -i http://localhost:8000/health
```

Las solicitudes protegidas utilizan el encabezado `Authorization: Bearer <token>`. El backend debe permitir mediante CORS el origen real del frontend (en Docker, `http://localhost:3000`). Revisar `main.py` antes de modificar los orígenes permitidos.

## 10. Autenticación, autorización y reglas académicas

La autenticación identifica al usuario y la autorización determina qué operaciones puede realizar. Los permisos deben comprobarse en el servidor, independientemente de la visibilidad de botones o rutas del frontend.

- El aspirante realiza su inscripción y seguimiento desde el portal público; el acceso privado de estudiante corresponde al rol `ALUMNO`.
- El docente solo debe gestionar los seminarios que tiene asignados.
- La asociación de estudiantes a seminarios exige un seminario activo, un legajo de la carrera correspondiente y un estado académico habilitado (`ACTIVO` o `EN_RIESGO`). No debe duplicarse una inscripción existente.
- Las operaciones de inscripción, aprobación y matriculación deben respetar las transiciones autorizadas y los requisitos documentales.
- Las bajas y modificaciones académicas deben preservar las restricciones de integridad del historial.

No eliminar controles de autorización ni validaciones académicas para resolver problemas de datos de prueba.

## 11. Persistencia y almacenamiento

PostgreSQL se ejecuta dentro de Docker en el puerto 5432 y se expone en la computadora mediante el puerto 5433.

```bash
docker exec -it postgrado-db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

Consultas útiles dentro de psql:

```sql
\dt
\d legajos
\d seminarios
\q
```

Según la guía de inicio del repositorio, las tablas se crean al arrancar FastAPI. No asumir que existe una migración automática de cambios de esquema: verificar el procedimiento vigente antes de modificar modelos o aplicar migraciones.

Los volúmenes definidos por Compose son `postgrado-pgdata` y `postgrado-storage`. El primero conserva los datos de PostgreSQL y el segundo el almacenamiento de documentos configurado en `/var/postgrado-storage`. Los archivos guardados en otras rutas requieren verificar su mecanismo de persistencia.

**No ejecutar `docker compose down -v` sobre un entorno con datos que se quieran conservar.**

## 12. Correo y notificaciones

El sistema utiliza correo institucional mediante SMTP y plantillas compartidas. El servicio `src/compartido/correo.py` centraliza el tratamiento de correos.

Entre los flujos que requieren comunicaciones se encuentran la confirmación de inscripción, la activación de cuentas, la recuperación de contraseña y los eventos académicos relevantes.

Configurar el servidor SMTP, las credenciales y la URL del frontend según `.env.example`. Cuando se utilice Gmail con STARTTLS, utilizar las credenciales autorizadas por el proveedor; no guardar contraseñas de aplicación en Git.

Los logs permiten diagnosticar fallos de envío, pero no constituyen una confirmación de entrega al destinatario.

## 13. Pruebas automatizadas

Con las dependencias de pruebas instaladas y una base de datos de pruebas aislada, desde `src/backend`:

```bash
python -m pytest
python -m pytest -v
python -m pytest -x
```

Si Pytest está instalado en la imagen y se configuró un entorno de pruebas seguro, también puede ejecutarse dentro del contenedor. No correr pruebas que escriban o eliminen datos sobre la base académica de desarrollo sin confirmar previamente su aislamiento.

Priorizar casos de autenticación, permisos, validaciones de inscripción, transiciones de estado, asociación a seminarios, duplicados, tutorías y manejo de errores. Verificar que las operaciones rechazadas no produzcan modificaciones parciales.

No se declara un porcentaje de cobertura ni un resultado de pruebas sin medirlo en la versión actual.

## 14. Diagnóstico y comandos útiles

Desde la raíz:

```bash
docker compose ps
docker compose logs --tail 100 backend
docker compose logs -f backend
docker compose logs --tail 100 db
docker compose restart backend
docker compose up -d --build backend
docker compose down
```

| Situación | Qué revisar |
|---|---|
| API inaccesible | Estado del contenedor, logs y `/health` |
| Error de conexión a PostgreSQL | Host `db` dentro de Compose; `localhost:5433` fuera de Docker |
| HTTP 401 | Token ausente, inválido o vencido |
| HTTP 403 | Permisos del rol o alcance de la operación |
| HTTP 404 | Ruta, prefijo o recurso solicitado |
| HTTP 409 | Conflicto de estado, duplicado u otra restricción |
| HTTP 422 | Esquema o validación de la solicitud |
| HTTP 500 | Excepción del servidor; consultar logs sin exponer datos sensibles |
| Error CORS | Origen del navegador permitido por el backend |
| Lista de candidatos vacía | Carrera, estado del legajo, seminario activo e inscripciones existentes |
| Fallo de correo | Variables SMTP, autenticación, conexión y logs |

## 15. Buenas prácticas e integración

- Mantener las reglas de negocio fuera de las rutas cuando corresponda.
- Utilizar esquemas de entrada y salida y respuestas HTTP coherentes.
- Reutilizar servicios y utilidades compartidas; evitar duplicaciones.
- Usar consultas parametrizadas y gestionar transacciones de manera consistente.
- Validar archivos, tamaños, permisos y datos recibidos en el servidor.
- No registrar contraseñas, tokens ni documentos sensibles en logs.
- Coordinar cambios en los contratos de API con el frontend.
- No incorporar dependencias ni cambiar esquemas sin revisar el impacto con el equipo.
- Trabajar en una rama personal, verificar pruebas y revisar los cambios antes de integrarlos a `main`, siguiendo la guía de contribución.

## 16. Documentación relacionada

- [README general](../../README.md)
- [README del frontend](../frontend/README.md)
- [Guía de contribución](../../CONTRIBUTING.md)
- [Historial de cambios](../../CHANGELOG.md)
- [Documentación del proyecto](../../docs/)

---

*Proyecto académico — UTN Facultad Regional La Plata — Desarrollo de Software 2026.*
