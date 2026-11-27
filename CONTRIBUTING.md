# Guía de contribución — Sistema de Gestión de Posgrados

**UTN Facultad Regional La Plata · Desarrollo de Software · 2026**

Esta guía establece las pautas de trabajo de los cuatro integrantes del equipo para desarrollar, mantener e integrar funcionalidades sin sobrescribir cambios de otros compañeros ni comprometer la estabilidad de `main`.

## 1. Tecnologías del proyecto

| Área | Tecnologías |
|---|---|
| Frontend | React, TypeScript, Vite y React Router |
| Estilos | CSS y Tailwind CSS |
| Backend | Python, FastAPI y Uvicorn |
| Persistencia | SQLAlchemy y asyncpg |
| Base de datos | PostgreSQL 15 |
| Autenticación | JWT y control de acceso por roles |
| Correo electrónico | SMTP |
| Formularios | Google reCAPTCHA |
| Testing frontend | Vitest y React Testing Library |
| Testing backend | Pytest |
| Calidad frontend | ESLint y TypeScript |
| Infraestructura | Docker y Docker Compose |
| Control de versiones | Git y GitHub |

No incorporar dependencias nuevas sin justificar su necesidad y acordarlo con el equipo.

## 2. Estructura general

```text
postgrados_frlp/
├── src/
│   ├── backend/
│   │   ├── main.py
│   │   ├── Dockerfile.dev
│   │   ├── tests/
│   │   └── src/
│   │       ├── compartido/
│   │       ├── inscripcion/
│   │       ├── seminarios/
│   │       └── ...
│   └── frontend/
│       ├── Dockerfile.dev
│       ├── package.json
│       ├── tests/
│       └── src/
│           ├── assets/
│           ├── modulos/
│           │   ├── calendario/
│           │   ├── inscripcion/
│           │   ├── manejo-sesion/
│           │   ├── perfiles/
│           │   │   ├── administrador/
│           │   │   ├── conduccion/
│           │   │   ├── cpr/
│           │   │   ├── docente/
│           │   │   ├── estudiante/
│           │   │   └── shared/
│           │   └── ...
│           └── shared/
│               ├── api/
│               ├── componentes/
│               └── hooks/
├── docs/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

El árbol es orientativo y muestra los módulos principales, no un inventario exhaustivo.

- `src/frontend/src/modulos/`: funcionalidades organizadas por dominio.
- `perfiles/shared/`: elementos reutilizables entre perfiles.
- `src/frontend/src/shared/`: elementos transversales de toda la aplicación.
- Backend: separar presentación, aplicación y persistencia según la estructura de cada dominio.

## 3. Pautas de desarrollo

### Frontend

- Separar los componentes TSX de sus estilos CSS y respetar el diseño existente.
- Reutilizar el cliente HTTP, los hooks, las validaciones y los componentes compartidos.
- Utilizar `ConfirmacionModal` para operaciones de alta, modificación, baja y cambios de estado que requieran confirmación.
- Cancelar una confirmación no debe generar peticiones de escritura. Evitar envíos duplicados.
- Utilizar `MensajeSistema` para mensajes de éxito y error cuando corresponda.
- Contemplar estados de carga, error, ausencia de resultados y reintento.
- Mantener tipos explícitos y evitar `any` innecesarios.
- Utilizar HTML semántico, etiquetas asociadas a los campos, navegación por teclado y foco visible.
- Consumir datos reales de la API; no simular resultados académicos en producción.
- Revisar todos los perfiles afectados antes de modificar componentes compartidos.

### Backend

- Mantener las reglas de negocio en los servicios correspondientes, evitando duplicarlas en rutas o frontend.
- Validar los datos y permisos en el servidor, aunque también existan validaciones en la interfaz.
- Preservar la integridad referencial y el historial académico.
- Utilizar respuestas HTTP coherentes y mensajes de error comprensibles.
- No registrar contraseñas, tokens, credenciales ni documentación personal en logs.
- Actualizar las pruebas y la documentación de API cuando cambie un contrato.

### Roles y reglas funcionales

- ASPIRANTE: inscripción y consulta de seguimiento desde el sitio público, sin acceso a dashboards privados.
- ALUMNO: acceso autenticado a sus propias funcionalidades académicas.
- DOCENTE: gestión de los seminarios y estudiantes que le correspondan.
- CPR: gestión y seguimiento de las funcionalidades académicas autorizadas.
- COORDINADOR / Equipo de Conducción: gestión de inscripciones, legajos y seguimiento según permisos.
- ADMINISTRADOR: administración institucional y del sistema según permisos.

No ampliar los permisos de un rol para resolver un problema de visualización. Las restricciones del backend deben mantenerse.

## 4. Levantar el entorno

Requisitos: Git, Docker Desktop iniciado y Docker Compose compatible con la configuración del repositorio.

Desde la raíz del proyecto:

```bash
# Crear el archivo local de configuración solo si no existe
[ -f .env ] || cp .env.example .env

# Validar y levantar los servicios
docker compose config --quiet
docker compose up -d --build
docker compose ps
```

| Servicio | Acceso |
|---|---|
| Frontend | http://localhost:3000 |
| API REST | http://localhost:8000/api/v1 |
| Swagger | http://localhost:8000/docs |
| Healthcheck | http://localhost:8000/health |
| PostgreSQL desde el host | localhost:5433 |
| PostgreSQL entre contenedores | db:5432 |

Compose espera que PostgreSQL esté saludable antes de iniciar el backend y que el backend responda al healthcheck antes de iniciar el frontend.

## 5. Ramas de Git

`main` es la rama principal y debe mantenerse estable. Cada integrante trabaja en su propia rama, por ejemplo `rama-ursula`, `rama-julian`, `rama-matias` o `rama-jony`.

Antes de crear una rama nueva, comprobar que no haya cambios pendientes:

```bash
git status
git switch main
git pull --ff-only origin main
git switch -c rama-nombre
```

Si la rama ya existe, usar `git switch rama-nombre` en lugar de crearla nuevamente.

```bash
git branch --show-current
git branch -a
git remote -v
```

Verificar que el remoto corresponda al repositorio compartido por el equipo.

## 6. Guardar cambios y crear commits

Revisar primero qué archivos se modificaron:

```bash
git status
git diff --stat
git diff
```

Agregar únicamente los archivos relacionados con la tarea. Ejemplo desde la raíz:

```bash
git add src/frontend/src/modulos/perfiles/docente/paginas/EstudiantesPage.tsx
git diff --cached --check
git diff --cached --stat
git diff --cached
```

Evitar `git add .` sin revisar previamente los archivos, para no incluir credenciales, archivos de prueba, imágenes cargadas localmente o eliminaciones accidentales.

### Convención de commits

Formato: `tipo(alcance): descripción en presente, sin punto final`.

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de errores |
| `docs` | Documentación |
| `test` | Pruebas automatizadas |
| `refactor` | Reorganización sin cambiar comportamiento |
| `chore` | Mantenimiento y configuración |
| `style` | Formato sin cambio de lógica |

Ejemplos:

```bash
git commit -m "feat(docente): agrega asociación de estudiantes"
git commit -m "fix(inscripcion): corrige validación documental"
git commit -m "docs(readme): actualiza instrucciones de instalación"
```

Referenciar la historia de usuario o requisito cuando corresponda.

## 7. Subir una rama

```bash
# Primera vez
git push -u origin rama-nombre

# Siguientes veces
git push
```

Un push a una rama personal no modifica `main`.

## 8. Mantener actualizada la rama

Desde la propia rama, con los cambios guardados:

```bash
git fetch origin --prune
git log HEAD..origin/main --oneline
git merge origin/main
```

Si el log no muestra commits, la rama ya contiene el `main` remoto consultado.

En caso de conflictos, revisar los archivos indicados por `git status`, resolverlos conservando los cambios válidos de ambas partes y ejecutar las pruebas. No utilizar `push --force` para resolver conflictos.

## 9. Validaciones antes de integrar

Desde la raíz, con los contenedores levantados:

```bash
docker compose exec frontend npm run build
docker compose exec frontend npm run lint
docker compose exec frontend npm run test:run
```

Alternativamente, si las dependencias de frontend están instaladas localmente:

```bash
cd src/frontend
npm ci
npm run build
npm run lint
npm run test:run
```

Para el backend, ejecutar `python -m pytest` desde su entorno de desarrollo con las dependencias de prueba instaladas y una base de datos de pruebas correctamente configurada. No ejecutar pruebas destructivas sobre la base de desarrollo con datos importantes.

No modificar expectativas de tests únicamente para hacerlos pasar. Adaptar las pruebas a cambios funcionales intencionales y conservar las verificaciones de permisos, confirmaciones, validaciones y manejo de errores.

## 10. Pull Request e integración a main

La integración debe respetar las reglas de la cátedra: utilizar Pull Request y obtener al menos una revisión aprobada antes del merge.

Antes de solicitar revisión, comprobar que la funcionalidad funciona, el proyecto compila, el linter y las pruebas pasan, y no existen cambios ajenos a la tarea.

### Plantilla de Pull Request

```markdown
## ¿Qué hace este PR?
Descripción breve de la funcionalidad o corrección.

## Historia de usuario / requisito
Referencia al issue o requisito correspondiente.

## Cambios principales
- Cambio 1
- Cambio 2

## Validaciones realizadas
- [ ] Build correcto
- [ ] Lint correcto
- [ ] Tests correctos
- [ ] Prueba manual de la funcionalidad

## Impacto y observaciones
Indicar cambios compartidos, variables de entorno o modificaciones de API.
```

Una integración directa por consola solo corresponde si las reglas de la cátedra y del equipo la autorizan expresamente. No debe utilizarse para omitir una revisión obligatoria.

## 11. Variables de entorno

Nunca subir archivos `.env`, contraseñas, secretos JWT, credenciales SMTP ni claves privadas. Usar `.env.example` para documentar variables con valores de ejemplo.

Al agregar una variable, actualizar `.env.example`, explicar su propósito y comunicar el cambio al equipo.

Docker Compose contempla, entre otras, las siguientes variables:

| Variable | Finalidad |
|---|---|
| `DB_USER` | Usuario PostgreSQL |
| `DB_PASSWORD` | Contraseña PostgreSQL |
| `DB_NAME` | Nombre de la base de datos |
| `DATABASE_URL` | Conexión del backend a PostgreSQL |
| `SECRET_KEY` / `JWT_SECRET` | Secreto de autenticación |
| `VITE_RECAPTCHA_SITE_KEY` | Clave pública de reCAPTCHA |

Consultar `.env.example` para los nombres exactos de las variables SMTP y demás integraciones. Los valores predeterminados de Compose son exclusivamente para desarrollo. Dentro de Docker, la conexión a PostgreSQL utiliza `db:5432`, no `localhost`.

## 12. Comandos útiles de Docker

```bash
# Levantar servicios
docker compose up -d --build

# Ver estado
docker compose ps

# Consultar logs
docker compose logs -f backend frontend

# Reiniciar backend
docker compose restart backend

# Acceder a PostgreSQL
docker exec -it postgrado-db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'

# Detener conservando los volúmenes
docker compose down
```

No ejecutar `docker compose down -v` salvo que se haya acordado eliminar los datos persistidos y exista un respaldo cuando sea necesario.

La inicialización de tablas se realiza al iniciar FastAPI según la configuración documentada del proyecto. No ejecutar comandos de migración no verificados ni modificar el esquema manualmente sin coordinarlo con el equipo.

## 13. Definition of Done

Una tarea se considera terminada cuando:

- [ ] Cumple los requisitos y criterios de aceptación.
- [ ] Respeta los permisos y las reglas de negocio.
- [ ] Conserva la consistencia visual y la accesibilidad.
- [ ] No introduce duplicación innecesaria.
- [ ] Compila y pasa las verificaciones de calidad y pruebas aplicables.
- [ ] Cumple el objetivo de cobertura establecido por la cátedra (70 % en lógica nueva).
- [ ] Fue probada en el entorno de otro integrante según corresponda.
- [ ] La documentación y el changelog están actualizados cuando corresponde.
- [ ] Fue revisada e integrada conforme a las reglas del proyecto.

## 14. Comunicación y coordinación

Comunicar los bloqueos al equipo, registrar tareas y errores en el medio de seguimiento acordado y avisar antes de modificar contratos de API, componentes compartidos, dependencias o configuraciones transversales.

Mantener actualizado el acuerdo de trabajo en `docs/onboarding/TEAM_CHARTER.md` si se encuentra disponible.

---

*Proyecto académico — Desarrollo de Software — UTN FRLP — 2026.*
