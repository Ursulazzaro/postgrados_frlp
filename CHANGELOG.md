# Changelog — Sistema de Gestión de Posgrados

UTN Facultad Regional La Plata · Desarrollo de Software · 2026

Todos los cambios relevantes del proyecto se documentan en este archivo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).
El proyecto adopta [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased] — Cambios acumulados

Funcionalidades y mejoras desarrolladas durante el proyecto, pendientes de consolidación en una versión formal. La inclusión de una funcionalidad en este registro no implica que su aceptación o despliegue final estén certificados.

### Added — Funcionalidades incorporadas

#### Portal público e inscripción

- Portal institucional con información de carreras de posgrado, noticias, preguntas frecuentes, contacto y calendario académico.
- Formulario de inscripción con selección de carrera y cohorte, validación de datos personales y académicos, y carga de documentación PDF.
- Guardado y recuperación de borradores de inscripción.
- Solicitudes de beca y seguimiento público mediante número de seguimiento.
- Consulta de estado, observaciones y documentación solicitada para corrección.
- Gestión de contenidos públicos desde el perfil administrador.

#### Autenticación y usuarios

- Inicio y cierre de sesión, autenticación JWT y protección de rutas según el rol.
- Activación de cuentas, cambio inicial y recuperación de contraseña.
- Gestión de usuarios y consulta del perfil personal.
- Integración de correo institucional mediante SMTP.
- Sistema de alertas y notificaciones para eventos del sistema.

#### Administrador

- Gestión de carreras, cohortes, docentes, usuarios y seminarios.
- Consulta de asociaciones académicas y filtros dependientes.
- Administración del inicio público, noticias, preguntas frecuentes, contacto y calendario.
- Indicadores, gráficos y reportes de gestión.

#### Equipo de Conducción

- Panel de seguimiento de inscripciones y legajos por cohorte.
- Búsqueda por documento y apellido, filtros académicos y consulta del detalle del legajo.
- Revisión documental, registro de observaciones y resolución de inscripciones.
- Gestión de estados, aprobación, rechazo y baja conforme a las reglas académicas.
- Gestión de períodos de inscripción y seguimiento de la matriculación.
- Consulta de perfiles académicos, seminarios, calificaciones, tutorías y trabajos finales.
- Estadísticas generales y exportación de información académica a CSV.

#### CPR

- Panel de indicadores académicos.
- Consulta de estudiantes y docentes.
- Gestión de trabajos prácticos, tutorías y registros de tesis.
- Filtros académicos y operaciones de gestión con confirmación.

#### Docente

- Panel de inicio y consulta de seminarios asignados.
- Consulta, asociación y desvinculación de estudiantes conforme a su elegibilidad académica.
- Registro de asistencia y calificaciones.
- Consulta de información académica y de contacto de estudiantes.

#### Estudiante

- Panel de seguimiento académico y consulta del historial de cursada.
- Inscripción y desinscripción de seminarios según disponibilidad y restricciones académicas.
- Consulta de asistencias, calificaciones, tutorías y trabajos finales.

#### Infraestructura y calidad

- Entorno de desarrollo integrado mediante Docker Compose, con React y Vite, FastAPI y PostgreSQL 15.
- Persistencia de base de datos y almacenamiento mediante volúmenes Docker.
- Cliente HTTP compartido para el consumo de la API REST.
- Componentes reutilizables para mensajes, confirmaciones, filtros, gráficos y notificaciones.
- Pruebas automatizadas del frontend con Vitest y React Testing Library.
- Verificaciones de compilación mediante TypeScript y Vite, y análisis estático mediante ESLint.

### Changed — Mejoras y modificaciones

- Reorganización del frontend por módulos funcionales, perfiles y componentes compartidos.
- Unificación progresiva de estilos, formularios, tablas, botones y paneles de los distintos perfiles.
- Mejora de los filtros, buscadores y estados vacíos de los listados académicos.
- Actualización del panel de Conducción y de sus estadísticas para consultar información consolidada sin selección obligatoria de cohorte en la pantalla de estadísticas.
- Reorganización de la consulta de perfiles académicos de Conducción en modo lectura.
- Mejora de los formularios de períodos de inscripción y de las exportaciones.
- Actualización de las interfaces de trabajos prácticos y tutorías del CPR.
- Consolidación de la administración del calendario académico y de los contenidos públicos.
- Sustitución de Calendarific por ArgentinaDatos en el cliente de feriados del frontend.
- Actualización de la documentación de instalación, contribución e integración entre frontend y backend.

### Fixed — Correcciones

- Configuración del arranque conjunto con Docker Compose y comprobaciones de disponibilidad de PostgreSQL y FastAPI.
- Mejoras en el tratamiento de errores, estados de carga y ausencia de resultados en consultas académicas.
- Ajustes en confirmaciones de operaciones para evitar solicitudes al cancelar y prevenir envíos duplicados.
- Ajustes en la presentación de estudiantes habilitados para seminarios y de seminarios disponibles para estudiantes.
- Correcciones de estilos y consistencia visual en los perfiles del sistema.

### Removed — Elementos eliminados

- Accesos de navegación y secciones de gestión duplicados.
- Módulo independiente de configuración general del administrador, reorganizando las opciones útiles.
- Filtros de cohorte de la pantalla de estadísticas generales de Conducción.
- Dependencia del cliente de feriados de una clave de Calendarific (queda por verificar su retiro de todos los archivos de configuración).

### Security — Seguridad e integridad

- Separación del acceso público del aspirante y del acceso autenticado correspondiente al rol `ALUMNO`.
- Control de permisos por rol y restricciones académicas en el backend.
- Validación de documentación y de operaciones de inscripción y cursada.
- Protección de credenciales mediante variables de entorno y documentación de configuraciones de ejemplo.

---

## Historial de versiones planificadas

Las siguientes versiones corresponden al cronograma original de la cátedra. Las fechas son objetivos históricos, no fechas de publicación verificadas.

| Versión | Fecha planificada | Alcance previsto |
|---|---|---|
| v0.1.0-alpha | 15/05/2026 | Autenticación, base de datos y Docker |
| v0.5.0-beta | 31/07/2026 | Módulo Core |
| v0.8.0-rc | 11/09/2026 | Core y módulo especializado |
| v1.0.0 | 23/10/2026 | Sistema completo y documentación |

## Publicación de versiones

Al publicar una versión, trasladar los cambios correspondientes de `Unreleased` a una sección con el número de versión y la fecha real de publicación (`AAAA-MM-DD`). Verificar las pruebas, la compilación, los permisos y los flujos funcionales antes de crear la etiqueta de Git correspondiente.

Consultar las etiquetas existentes con `git tag --list` y el historial con `git log --oneline --all`.
