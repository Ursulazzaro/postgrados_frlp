// Página de inicio de sesión para acceder a las funciones privadas del sistema.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";
import Captcha from "../components/Captcha";

import imagenFondo from "../../../imagenes/hero-inicio.jpg";
import "./ManejoSesion.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!captchaToken) {
      setError("Completá el CAPTCHA antes de iniciar sesión");
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Credenciales inválidas");
      setCaptchaToken("");
    }
  };

  return (
    <section
      className="sesion"
      style={{ backgroundImage: `url(${imagenFondo})` }}
      aria-labelledby="titulo-login"
    >
      <form
        className="sesion-formulario"
        onSubmit={handleSubmit}
      >
        <header className="sesion-encabezado">
          <h1 id="titulo-login">Iniciar Sesión</h1>
          <p>Ingresá tus credenciales para acceder al sistema</p>
        </header>

        {error && (
          <p className="sesion-error" role="alert">
            {error}
          </p>
        )}

        <label htmlFor="email">
          Correo Electrónico{" "}
          <span aria-hidden="true">*</span>
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="usuario@frlp.utn.edu.ar"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">
          Contraseña{" "}
          <span aria-hidden="true">*</span>
        </label>

        <div className="sesion-password">
          <input
            id="password"
            name="password"
            type={mostrarPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() =>
              setMostrarPassword(!mostrarPassword)
            }
            aria-label={
              mostrarPassword
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
            }
          >
            ◉
          </button>
        </div>

        <Link
          className="sesion-recuperar"
          to="/recuperar-contrasena"
        >
          ¿Olvidaste tu contraseña?
        </Link>

        <Captcha
          onVerify={(token: string) => {
            setCaptchaToken(token);

            if (token) {
              setError("");
            }
          }}
          onError={() => {
            setCaptchaToken("");
            setError("No se pudo cargar el CAPTCHA");
          }}
        />

        <button
          className="sesion-boton"
          type="submit"
        >
          Iniciar Sesión
        </button>
      </form>
    </section>
  );
}