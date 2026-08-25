// Página para solicitar la recuperación de contraseña.

import { useState } from "react";

import imagenFondo from "../../../imagenes/hero-inicio.jpg";
import "./ManejoSesion.css";
import { Link } from "react-router-dom";

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("Se enviaron las instrucciones al correo ingresado.");
  };

  return (
    <section
      className="sesion"
      style={{ backgroundImage: `url(${imagenFondo})` }}
    >
      <form className="sesion-formulario" onSubmit={handleSubmit}>
        <header className="sesion-encabezado">
          <h1>Restaurar contraseña</h1>
          <p>Ingresá tu correo para recuperar el acceso al sistema</p>
        </header>

        {mensaje && (
          <p className="sesion-mensaje" role="status">
            {mensaje}
          </p>
        )}

        <label htmlFor="email">
          Correo Electrónico <span aria-hidden="true">*</span>
        </label>

        <input
          id="email"
          type="email"
          placeholder="usuario@frlp.utn.edu.ar"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="sesion-captcha">
          <span className="sesion-captcha-cuadro" aria-hidden="true" />
          <span>I'm not a robot</span>
          <strong>reCAPTCHA</strong>
        </div>

        <button className="sesion-boton" type="submit">
          Recuperar
        </button>
        <Link to="/login" className="sesion-volver">
  ←       Volver a iniciar sesión
        </Link>
      </form>
    </section>
  );
}