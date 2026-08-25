// Página con la información de la facu.

import imagenHero from "../../../imagenes/hero-home.png";
import "./PaginaContacto.css";

export default function PaginaContacto() {
  return (
    <main className="contacto">
      <section className="contacto-hero" 
                style={{ backgroundImage: `url(${imagenHero})` }}
                aria-labelledby="contacto-titulo"
      >
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

            <p>Completá el formulario y nuestro equipo se pondrá en contacto a la brevedad.</p>

            <form>
                <div className="contacto-campo">
                <label htmlFor="nombre">Nombre y Apellido <span aria-hidden="true">*</span></label>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                />
                </div>

                <div className="contacto-campo">
                    <label htmlFor="email">Correo Electrónico <span aria-hidden="true">*</span></label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                    />
                </div>

                <div className="contacto-campo">
                <label htmlFor="asunto">Asunto <span aria-hidden="true">*</span></label>
                <input
                    id="asunto"
                    name="asunto"
                    type="text"
                    required
                    />
                </div>

                <div className="contacto-campo">
                <label htmlFor="mensaje">Mensaje <span aria-hidden="true">*</span></label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    required
                />
                </div>

                <button type="submit">Enviar</button>
            </form>
        </section>

        <aside className="contacto-informacion" aria-labelledby="contacto-informacion-titulo">
          <h2 id="contacto-informacion-titulo">Información de contacto</h2>
        </aside>
      </section>
    </main>
  );
}