// Página de inicio de sesión para acceder a las funciones privadas del sistema.

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";

import imagenFondo from "../../../imagenes/hero-inicio.jpg";
import "./ManejoSesion.css";

interface RecaptchaApi {
  render: (
    elemento: HTMLElement,
    opciones: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    }
  ) => number;

  reset: (widgetId?: number) => void;
}

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const captchaRef = useRef<HTMLDivElement>(null);
  const captchaWidgetId = useRef<number | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      return;
    }

    const cargarCaptcha = () => {
      if (!window.grecaptcha || !captchaRef.current) {
        return;
      }

      if (captchaWidgetId.current !== null) {
        return;
      }

      captchaWidgetId.current = window.grecaptcha.render(
        captchaRef.current,
        {
          sitekey: RECAPTCHA_SITE_KEY,

          callback: (token: string) => {
            setCaptchaToken(token);
            setError("");
          },

          "expired-callback": () => {
            setCaptchaToken("");
          },

          "error-callback": () => {
            setCaptchaToken("");
            setError("No se pudo cargar el CAPTCHA");
          },
        }
      );
    };

    const scriptExistente =
      document.getElementById("recaptcha-script");

    if (scriptExistente) {
      if (window.grecaptcha) {
        cargarCaptcha();
      } else {
        scriptExistente.addEventListener("load", cargarCaptcha);
      }

      return () => {
        scriptExistente.removeEventListener("load", cargarCaptcha);
      };
    }

    const script = document.createElement("script");

    script.id = "recaptcha-script";
    script.src =
      "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = cargarCaptcha;

    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

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

      if (
        window.grecaptcha &&
        captchaWidgetId.current !== null
      ) {
        window.grecaptcha.reset(captchaWidgetId.current);
      }

      setCaptchaToken("");
    }
  };

  return (
    <section
      className="sesion"
      style={{ backgroundImage: `url(${imagenFondo})` }}
    >
      <form
        className="sesion-formulario"
        onSubmit={handleSubmit}
      >
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

        <div
          className="sesion-captcha"
          ref={captchaRef}
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