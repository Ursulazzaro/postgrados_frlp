## 11. Comunicación entre frontend y backend

El sistema utiliza una arquitectura cliente-servidor. El frontend, desarrollado con React, TypeScript y Vite, consume la API REST implementada con FastAPI mediante solicitudes HTTP. El backend aplica las reglas de negocio, verifica los permisos y accede a PostgreSQL mediante SQLAlchemy y asyncpg.

### 11.1. Configuración de la URL de la API

En el entorno Docker, `docker-compose.yml` configura la siguiente variable para el frontend:

```yaml
VITE_API_URL: http://localhost:8000/api/v1
```

Para ejecutar el frontend fuera de Docker, configurar `src/frontend/.env`:

```dotenv
VITE_API_URL=http://localhost:8000/api/v1
```

Las variables con prefijo `VITE_` están disponibles en el código del navegador y no deben contener secretos. Reiniciar Vite después de modificarlas. Si se utiliza Docker, la configuración del servicio frontend prevalece sobre el archivo local; recrear el contenedor si se modifica dicha configuración.

### 11.2. Cliente HTTP compartido

El cliente existente se encuentra en:

```text
src/frontend/src/shared/api/client.ts
```

Los módulos deben reutilizar este cliente en lugar de implementar solicitudes `fetch` independientes o repetir la URL base. El cliente centraliza las solicitudes HTTP y el tratamiento de errores. Para las operaciones protegidas se proporciona el token de sesión obtenido mediante `useAuth`.

Ejemplo basado en la consulta de seminarios del docente:

```typescript
import { api } from "../../../../shared/api/client";

interface SeminarioDocente {
  id: string;
  nombre: string;
  carrera_nombre: string;
}

async function consultarSeminarios(token: string) {
  return api.get<SeminarioDocente[]>(
    "/seminarios/mis-seminarios",
    token,
  );
}
```

La ruta de importación relativa corresponde a una página ubicada en `src/modulos/perfiles/docente/paginas/`. Adaptarla según la ubicación del componente.

La petición resultante es:

```http
GET http://localhost:8000/api/v1/seminarios/mis-seminarios
Authorization: Bearer <token>
```

Ejemplo de asociación de un estudiante a un seminario:

```typescript
await api.post(
  `/seminarios/${seminarioId}/estudiantes`,
  { legajo_id: legajoSeleccionado },
  token,
);
```

Esta operación debe ejecutarse únicamente después de la confirmación del usuario y respetar las validaciones del backend.

### 11.3. Flujo de una solicitud

1. El usuario realiza una acción en la interfaz.
2. El componente o hook obtiene los datos necesarios y, si corresponde, el token de sesión.
3. El cliente HTTP envía la solicitud a la API REST.
4. FastAPI identifica la ruta, valida los datos y comprueba los permisos.
5. El servicio de aplicación ejecuta la lógica de negocio y consulta o modifica la persistencia cuando corresponde.
6. El backend devuelve una respuesta HTTP.
7. El frontend actualiza su estado y presenta el resultado o el mensaje de error correspondiente.

Las consultas deben contemplar estados de carga, error y ausencia de resultados. No deben presentarse datos ficticios cuando falla una petición.

### 11.4. Configuración de CORS

CORS (Cross-Origin Resource Sharing) permite que el navegador realice solicitudes a un origen distinto del que sirve el frontend.

En desarrollo, el frontend utiliza `http://localhost:3000` y el backend `http://localhost:8000`. Aunque ambos estén en la misma computadora, los puertos distintos representan orígenes diferentes.

La configuración debe revisarse en `src/backend/main.py`. Ejemplo de configuración para los orígenes locales utilizados durante el desarrollo:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Este bloque es una referencia: no duplicar el middleware si ya existe. Habilitar únicamente los orígenes que realmente se utilicen. En producción, configurar los dominios autorizados. CORS no reemplaza la autenticación ni el control de acceso por roles.

### 11.5. Levantar el entorno

Desde la raíz del repositorio:

```bash
docker compose up -d --build
docker compose ps
```

Docker Compose espera que PostgreSQL esté disponible antes de iniciar el backend, y que el backend responda correctamente a `/health` antes de iniciar el frontend.

| Servicio | Dirección |
|---|---|
| Frontend | http://localhost:3000 |
| API REST | http://localhost:8000/api/v1 |
| Swagger | http://localhost:8000/docs |
| Healthcheck | http://localhost:8000/health |
| PostgreSQL desde el host | localhost:5433 |
| PostgreSQL desde el backend en Docker | db:5432 |

Para ejecutar el código localmente, instalar previamente las dependencias y configurar la conexión a PostgreSQL. En terminales separadas:

```bash
# Terminal 1: backend
cd src/backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

```bash
# Terminal 2: frontend
cd src/frontend
npm run dev -- --host 0.0.0.0 --port 3000 --strictPort
```

No ejecutar simultáneamente los servidores locales y los contenedores que ocupan los mismos puertos.

### 11.6. Verificar la conexión

Desde Git Bash:

```bash
curl -i http://localhost:8000/health
```

Una respuesta HTTP exitosa confirma que el endpoint de salud está disponible. La ruta `/health` no utiliza el prefijo `/api/v1`.

Para comprobar la comunicación efectiva desde el navegador:

1. Abrir http://localhost:3000.
2. Presionar `F12` y abrir la pestaña Network (Red).
3. Seleccionar Fetch/XHR.
4. Ejecutar una acción del sistema, como consultar los seminarios asignados al docente.
5. Revisar la URL, el código HTTP y el contenido de la respuesta.

Una respuesta `200 OK` con una lista vacía puede ser válida si no existen registros que cumplan las condiciones de la consulta. No implica necesariamente un problema de conexión.

Consultar los logs si fuera necesario:

```bash
docker compose logs --tail 100 backend
docker compose logs --tail 100 frontend
```

### 11.7. Errores frecuentes

| Error | Causa posible | Solución |
|---|---|---|
| `Failed to fetch` | Backend detenido, URL incorrecta, red o CORS | Verificar contenedores, URL y consola del navegador. |
| Error de CORS | Origen no permitido | Revisar protocolo, host y puerto en la configuración del backend. |
| Variable de entorno incorrecta | Configuración de Vite o Compose desactualizada | Revisar `VITE_API_URL` y reiniciar o recrear el frontend. |
| HTTP 401 | Token ausente, inválido o vencido | Revisar la sesión y la autenticación. |
| HTTP 403 | Permisos insuficientes | Verificar el rol y la autorización de la operación. |
| HTTP 404 | Ruta o recurso inexistente | Revisar el prefijo `/api/v1`, la ruta y los identificadores. |
| HTTP 409 | Conflicto de estado o registro duplicado | Revisar las restricciones de negocio y actualizar los datos. |
| HTTP 422 | Datos que no cumplen el esquema esperado | Revisar el cuerpo de la solicitud y las validaciones. |
| HTTP 500 | Error interno del servidor | Consultar los logs del backend. |
| HTTP 200 con lista vacía | No existen resultados para los filtros o permisos aplicados | Revisar los datos y las condiciones de negocio. |

Si una solicitud funciona desde Swagger o Postman pero falla en el navegador, revisar CORS, las diferencias entre solicitudes, las credenciales y la configuración del frontend.

### 11.8. Buenas prácticas

- Reutilizar el cliente HTTP compartido y los tipos de TypeScript.
- No hardcodear las URL de los endpoints en cada componente.
- No almacenar credenciales ni secretos en el código del frontend.
- No enviar ni publicar tokens en capturas, logs o commits.
- Mantener las validaciones de negocio y permisos en el backend.
- Utilizar los componentes compartidos de confirmación y mensajes del sistema.
- Verificar la integración mediante pruebas automatizadas y pruebas funcionales antes de incorporar cambios a `main`.
