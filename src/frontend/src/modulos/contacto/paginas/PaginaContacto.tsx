// Página con la información de la facu.

import "./PaginaContacto.css";

export default function PaginaContacto() {
  return (
    <main className="contacto">
      <section className="contacto-hero" aria-labelledby="contacto-titulo">
        <div className="contacto-contenido">
          <h1 id="contacto-titulo">Contacto</h1>
          <p>
            Estamos para ayudarte. Contactanos para resolver tus dudas sobre
            nuestras carreras y el proceso de inscripción.
          </p>
        </div>
      </section>

      <section className="contacto-principal" aria-labelledby="contacto-formulario-titulo">
        <section className="contacto-formulario">
          <h2 id="contacto-formulario-titulo">Envianos tu consulta</h2>
        </section>

        <aside className="contacto-informacion" aria-labelledby="contacto-informacion-titulo">
          <h2 id="contacto-informacion-titulo">Información de contacto</h2>
        </aside>
      </section>

      <section className="contacto-mapa" aria-labelledby="contacto-mapa-titulo">
        <h2 id="contacto-mapa-titulo">Dónde encontrarnos</h2>
      </section>
    </main>
  );
}