// Barra de navegación utilizada en las páginas públicas del sistema.

import { Link, NavLink } from "react-router-dom";
import logoUtnFrlp from "../../../imagenes/logo-utn-frlp.png";
import "./BarraNavHome.css";

export default function BarraNavHome() {
  return (
    <header className="barra-nav-home">
      <nav
        className="barra-nav-home-contenido"
        aria-label="Navegación principal"
      >
        <Link
          className="barra-nav-home-logo"
          to="/"
          aria-label="Ir al inicio"
        >
          <img
            src={logoUtnFrlp}
            alt="UTN Facultad Regional La Plata"
          />
        </Link>

        <ul className="barra-nav-home-enlaces">
          <li>
            <NavLink to="/" end>
              <span className="barra-nav-home-icono" aria-hidden="true">
                ⌂
              </span>
              Inicio
            </NavLink>
          </li>

          <li>
            <NavLink to="/carreras">
              <span className="barra-nav-home-icono" aria-hidden="true">
                ◆
              </span>
              Carreras
            </NavLink>
          </li>

          <li>
            <NavLink to="/inscripcion">
              <span className="barra-nav-home-icono" aria-hidden="true">
                ▤
              </span>
              Inscripción
            </NavLink>
          </li>

          <li>
            <NavLink to="/calendario">
              <span className="barra-nav-home-icono" aria-hidden="true">
                ▦
              </span>
              Calendario académico
            </NavLink>
          </li>

          <li>
            <NavLink to="/noticias">
              <span className="barra-nav-home-icono" aria-hidden="true">
                ▣
              </span>
              Noticias
            </NavLink>
          </li>

          <li>
            <NavLink to="/contacto">
              <span className="barra-nav-home-icono" aria-hidden="true">
                ☎
              </span>
              Contacto
            </NavLink>
          </li>
        </ul>

        <Link className="barra-nav-home-login" to="/login">
          <svg
            className="barra-nav-home-icono-usuario"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4.2 3.6-7 8-7s8 2.8 8 7v1H4z" />
          </svg>

          <span>Iniciar sesión</span>
        </Link>
      </nav>
    </header>
  );
}