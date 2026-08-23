// Página pública de inicio del Sistema de Posgrado UTN FRLP.

import { Link } from "react-router-dom";
import imagenHero from "../../imagenes/hero-home.png";
import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <section
        className="home-hero"
        style={{ backgroundImage: `url(${imagenHero})` }}
        aria-labelledby="home-titulo"
      >
        <section className="home-hero-contenido">
          <h1 id="home-titulo">
            Bienvenido al Sistema
            <br />
            de Posgrado UTN FRLP
          </h1>

          <p>
            Gestioná tu inscripción, consultá tu estado académico y accedé a
            toda la información de tu carrera.
          </p>

          <nav className="home-acciones" aria-label="Acciones principales">
            <Link className="home-boton home-boton-principal" to="/inscripcion">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 2h9l5 5v15H6V2Zm8 2v5h5" />
                <path d="M9 13h8M9 17h8" />
              </svg>
              Inscribite ahora
            </Link>

            <Link className="home-boton home-boton-secundario" to="/contacto">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 5h18v14H3V5Z" />
                <path d="m3 6 9 7 9-7" />
              </svg>
              Solicitar información
            </Link>
          </nav>
        </section>
      </section>

      <section className="home-accesos" aria-labelledby="home-accesos-titulo">
        <h2 id="home-accesos-titulo" className="sr-only">
          Accesos principales
        </h2>

        <article className="home-tarjeta">
          <span className="home-tarjeta-icono home-icono-carreras" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m3 10 9-5 9 5-9 5-9-5Z" />
              <path d="M7 12v5c3 2 7 2 10 0v-5" />
            </svg>
          </span>

          <section className="home-tarjeta-contenido">
            <h3>Carreras de Posgrado</h3>
            <p>
              Conocé nuestra oferta académica de especializaciones, maestrías y
              doctorados.
            </p>
            <Link to="/carreras">
              Ver carreras <span aria-hidden="true">→</span>
            </Link>
          </section>
        </article>

        <article className="home-tarjeta">
          <span className="home-tarjeta-icono home-icono-calendario" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="4" y="5" width="16" height="15" rx="2" />
              <path d="M8 3v4M16 3v4M4 9h16M8 13h2M14 13h2M8 17h2M14 17h2" />
            </svg>
          </span>

          <section className="home-tarjeta-contenido">
            <h3>Calendario Académico</h3>
            <p>
              Consultá el calendario de clases, exámenes, inscripciones y fechas
              importantes.
            </p>
            <Link to="/calendario">
              Ver calendario <span aria-hidden="true">→</span>
            </Link>
          </section>
        </article>

        <article className="home-tarjeta">
          <span className="home-tarjeta-icono home-icono-noticias" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
              <path d="M10 21h4" />
            </svg>
          </span>

          <section className="home-tarjeta-contenido">
            <h3>Novedades</h3>
            <p>Enterate de las últimas noticias y comunicados de la facultad.</p>
            <Link to="/noticias">
              Ver novedades <span aria-hidden="true">→</span>
            </Link>
          </section>
        </article>

        <article className="home-tarjeta">
          <span className="home-tarjeta-icono home-icono-preguntas" aria-hidden="true">
            ?
          </span>

          <section className="home-tarjeta-contenido">
            <h3>¿Tenés dudas?</h3>
            <p>Respondemos las preguntas más frecuentes sobre el posgrado.</p>
            <Link to="/preguntas-frecuentes">
              Ir a preguntas frecuentes <span aria-hidden="true">→</span>
            </Link>
          </section>
        </article>
      </section>
    </>
  );
}