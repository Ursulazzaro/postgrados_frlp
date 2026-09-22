import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../../manejo-sesion/useAuth";

import { menuEstudiante } from "../../estudiante/config/menuEstudiante";
import { menuDocente } from "../../docente/config/menuDocente";

import BarraNavegacionPerfil from "../componentes/BarraNavegacionPerfil";

import "../estilos/PerfilesCompartidos.css";

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const esDocente = location.pathname.startsWith(
    "/dashboard/docente"
  );

  const rolUsuario = esDocente
    ? "Docente"
    : "Estudiante";

  const nombreUsuario = esDocente
    ? "Margarita"
    : "Juan Perez";

  const inicialesUsuario = esDocente
    ? "M"
    : "JP";

  const opcionesMenu = esDocente
    ? menuDocente
    : menuEstudiante;

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="perfil-layout">
      <aside className="perfil-sidebar">
        <header className="perfil-sidebar-encabezado">
          <h2>UTN FRLP</h2>
          <p>{rolUsuario}</p>
        </header>

        <BarraNavegacionPerfil
          rol={rolUsuario}
          opciones={opcionesMenu}
        />

        <section className="perfil-menu-pruebas">
          <p>Vistas de prueba</p>

          {esDocente ? (
            <NavLink
              to="/dashboard"
              className="perfil-boton-prueba"
            >
              <span aria-hidden="true">↩️</span>
              Volver a Estudiante
            </NavLink>
          ) : (
            <NavLink
              to="/dashboard/docente"
              className="perfil-boton-prueba"
            >
              <span aria-hidden="true">👁️</span>
              Vista Docente
            </NavLink>
          )}
        </section>

        <footer className="perfil-sidebar-pie">
          <button
            type="button"
            className="perfil-cerrar-sesion"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </footer>
      </aside>

      <div className="perfil-contenedor">
        <header className="perfil-header">
          <div className="perfil-header-contenido">
            <button
              type="button"
              className="perfil-header-icono"
              aria-label="Mensajes"
            >
              <span aria-hidden="true">✉️</span>
            </button>

            <button
              type="button"
              className="perfil-header-icono"
              aria-label="Notificaciones"
            >
              <span aria-hidden="true">🔔</span>
            </button>

            <section
              className="perfil-usuario"
              aria-label="Usuario actual"
            >
              <span
                className="perfil-usuario-avatar"
                aria-hidden="true"
              >
                {inicialesUsuario}
              </span>

              <div className="perfil-usuario-datos">
                <p className="perfil-usuario-nombre">
                  {nombreUsuario}
                </p>

                <p className="perfil-usuario-rol">
                  {rolUsuario}
                </p>
              </div>
            </section>
          </div>
        </header>

        <main className="perfil-contenido">
          <Outlet />
        </main>
      </div>
    </div>
  );
}