// Permite al usuario autenticado cambiar su contraseña desde Mi Perfil.

import {
  useState,
  type FormEvent,
} from "react";

import {
  api,
} from "../../../../shared/api/client";

import {
  useAuth,
} from "../../../manejo-sesion/useAuth";


export default function CambiarContrasena() {
  const {
    user,
  } = useAuth();

  const [
    contrasenaActual,
    setContrasenaActual,
  ] = useState("");

  const [
    contrasenaNueva,
    setContrasenaNueva,
  ] = useState("");

  const [
    repetirContrasena,
    setRepetirContrasena,
  ] = useState("");

  const [error, setError] =
    useState("");

  const [mensaje, setMensaje] =
    useState("");

  const [guardando, setGuardando] =
    useState(false);


  const guardar = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    if (
      contrasenaNueva
      !== repetirContrasena
    ) {
      setError(
        "Las contraseñas nuevas no coinciden"
      );

      return;
    }

    try {
      setGuardando(true);
      setError("");
      setMensaje("");

      await api.post(
        "/autenticacion/cambiar-contrasena",
        {
          contrasena_actual:
            contrasenaActual,

          contrasena_nueva:
            contrasenaNueva,

          repetir_contrasena:
            repetirContrasena,
        },
        user.token
      );

      setContrasenaActual("");
      setContrasenaNueva("");
      setRepetirContrasena("");

      setMensaje(
        "La contraseña fue actualizada correctamente."
      );

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : (
              "No se pudo cambiar la contraseña"
            )
      );
    } finally {
      setGuardando(false);
    }
  };


  return (
    <section
      className="mi-perfil-contrasena"
      aria-labelledby="titulo-cambiar-contrasena"
    >
      <header>
        <h2 id="titulo-cambiar-contrasena">
          Cambiar contraseña
        </h2>

        <p>
          Actualizá la contraseña utilizada
          para acceder al sistema.
        </p>
      </header>


      {error && (
        <p
          role="alert"
          className="mi-perfil-error"
        >
          {error}
        </p>
      )}


      {mensaje && (
        <p
          role="status"
          className="mi-perfil-mensaje"
        >
          {mensaje}
        </p>
      )}


      <form onSubmit={guardar}>
        <label htmlFor="perfil-contrasena-actual">
          Contraseña actual
        </label>

        <input
          id="perfil-contrasena-actual"
          type="password"
          required
          value={contrasenaActual}
          onChange={(event) =>
            setContrasenaActual(
              event.target.value
            )
          }
        />


        <label htmlFor="perfil-contrasena-nueva">
          Nueva contraseña
        </label>

        <input
          id="perfil-contrasena-nueva"
          type="password"
          required
          minLength={6}
          value={contrasenaNueva}
          onChange={(event) =>
            setContrasenaNueva(
              event.target.value
            )
          }
        />


        <label htmlFor="perfil-repetir-contrasena">
          Repetir nueva contraseña
        </label>

        <input
          id="perfil-repetir-contrasena"
          type="password"
          required
          minLength={6}
          value={repetirContrasena}
          onChange={(event) =>
            setRepetirContrasena(
              event.target.value
            )
          }
        />


        <button
          type="submit"
          className="mi-perfil-guardar"
          disabled={guardando}
        >
          {guardando
            ? "Guardando..."
            : "Cambiar contraseña"}
        </button>
      </form>
    </section>
  );
}