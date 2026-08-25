// Página de inicio de sesión para acceder a las funciones privadas del sistema.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";

import imagenFondo from "../../../imagenes/hero-inicio.jpg";
import "./ManejoSesion.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <section
      className="sesion"
      style={{ backgroundImage: `url(${imagenFondo})` }}
    >
      <form className="sesion-formulario" onSubmit={handleSubmit}>
        <header className="sesion-encabezado">
          <h1>Iniciar Sesión</h1>
          <p>Ingresá tus credenciales para acceder al sistema</p>
        </header>

        {error && (
          <p className="sesion-error" role="alert">
            {error}
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

        <label htmlFor="password">
          Contraseña <span aria-hidden="true">*</span>
        </label>

        <div className="sesion-password">
          <input
            id="password"
            type={mostrarPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            aria-label={
              mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            ◉
          </button>
        </div>

        <Link className="sesion-recuperar" to="/recuperar-contrasena">
          ¿Olvidaste tu contraseña?
        </Link>

        <div className="sesion-captcha">
          <span className="sesion-captcha-cuadro" aria-hidden="true" />
          <span>I'm not a robot</span>
          <strong>reCAPTCHA</strong>
        </div>

        <button className="sesion-boton" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </section>
  );
}