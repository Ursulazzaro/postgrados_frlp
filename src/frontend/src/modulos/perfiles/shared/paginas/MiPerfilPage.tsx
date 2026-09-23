import {
  useState,
  type ChangeEvent,
} from "react";

import { useLocation } from "react-router-dom";

import CampoPerfil from "../componentes/CampoPerfil";

import DetallePerfilEstudiante from "../../estudiante/componentes/DetallePerfilEstudiante";
import DetallePerfilDocente from "../../docente/componentes/DetallePerfilDocente";

import "../estilos/MiPerfilPage.css";

interface DatosPerfil {
  nombre: string;
  apellido: string;
  dni: string;
  nacionalidad: string;
  email: string;
  emailAlternativo: string;
  telefono: string;
  domicilio: string;
  pais: string;
  provincia: string;
  ciudad: string;
  carrera: string;
  cohorte: string;
}

type Pestaña =
  | "Datos Personales"
  | "Contacto"
  | "Domicilio"
  | "Información";

const datosEstudiante: DatosPerfil = {
  nombre: "Juan Andres",
  apellido: "Perez",
  dni: "55476906",
  nacionalidad: "Argentina",
  email: "juan.perez@email.com",
  emailAlternativo: "jperez@email.com",
  telefono: "221 555-1234",
  domicilio: "Calle Falsa e/ Libertador y San Juan",
  pais: "Argentina",
  provincia: "Buenos Aires",
  ciudad: "La Plata",
  carrera: "Maestría en Educación",
  cohorte: "2026",
};

const datosDocente: DatosPerfil = {
  nombre: "Margarita",
  apellido: "Rodriguez",
  dni: "28456321",
  nacionalidad: "Argentina",
  email: "margarita.rodriguez@email.com",
  emailAlternativo: "mrodriguez@email.com",
  telefono: "221 555-5678",
  domicilio: "Calle 50 1234",
  pais: "Argentina",
  provincia: "Buenos Aires",
  ciudad: "La Plata",
  carrera: "",
  cohorte: "",
};

const pestañas: Pestaña[] = [
  "Datos Personales",
  "Contacto",
  "Domicilio",
  "Información",
];

export default function MiPerfilPage() {
  const location = useLocation();

  const esDocente =
    location.pathname.startsWith(
      "/dashboard/docente"
    );

  const rol = esDocente
    ? "Docente"
    : "Estudiante";

  const datosIniciales = esDocente
    ? datosDocente
    : datosEstudiante;

  const claveFoto = esDocente
    ? "fotoPerfilDocente"
    : "fotoPerfilEstudiante";

  const [tabActiva, setTabActiva] =
    useState<Pestaña>("Datos Personales");

  const [datos, setDatos] =
    useState<DatosPerfil>(datosIniciales);

  const [datosEditados, setDatosEditados] =
    useState<DatosPerfil>(datosIniciales);

  const [editando, setEditando] =
    useState(false);

  const [mensaje, setMensaje] =
    useState("");

  const [fotoPerfil, setFotoPerfil] =
    useState<string | null>(() =>
      localStorage.getItem(claveFoto)
    );

  const comenzarEdicion = () => {
    setDatosEditados(datos);
    setEditando(true);
    setMensaje("");
  };

  const cancelarEdicion = () => {
    setDatosEditados(datos);
    setEditando(false);
    setMensaje("");
  };

  const guardarCambios = () => {
    setDatos(datosEditados);
    setEditando(false);

    setMensaje(
      "Los datos fueron actualizados correctamente."
    );
  };

  const actualizarCampo = (
    campo: keyof DatosPerfil,
    valor: string
  ) => {
    setDatosEditados({
      ...datosEditados,
      [campo]: valor,
    });
  };

  const cambiarFoto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const archivo =
      event.target.files?.[0];

    if (!archivo) {
      return;
    }

    if (!archivo.type.startsWith("image/")) {
      setMensaje(
        "Seleccioná un archivo de imagen válido."
      );

      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      if (typeof lector.result !== "string") {
        return;
      }

      setFotoPerfil(lector.result);

      localStorage.setItem(
        claveFoto,
        lector.result
      );

      setMensaje(
        "La foto de perfil fue actualizada."
      );
    };

    lector.readAsDataURL(archivo);
  };

  const eliminarFoto = () => {
    setFotoPerfil(null);

    localStorage.removeItem(claveFoto);

    setMensaje(
      "La foto de perfil fue eliminada."
    );
  };

  return (
    <section className="perfil-pagina mi-perfil">
      <header className="perfil-pagina-encabezado">
        <h1>Mi Perfil</h1>

        <p>
          Consultá y actualizá la información registrada en tu perfil.
        </p>
      </header>

      <nav
        className="mi-perfil-pestanas"
        aria-label="Secciones del perfil"
      >
        {pestañas.map((pestaña) => (
          <button
            key={pestaña}
            type="button"
            onClick={() =>
              setTabActiva(pestaña)
            }
            className={
              tabActiva === pestaña
                ? "mi-perfil-pestana activa"
                : "mi-perfil-pestana"
            }
          >
            {pestaña}
          </button>
        ))}
      </nav>

      {mensaje && (
        <p
          className="mi-perfil-mensaje"
          role="status"
        >
          {mensaje}
        </p>
      )}

      <div className="mi-perfil-contenido">
        <article className="mi-perfil-tarjeta-personal">
          <header>
            {rol}
          </header>

          <div className="mi-perfil-avatar-contenedor">
            {fotoPerfil ? (
              <img
                src={fotoPerfil}
                alt={`Foto de perfil de ${datos.nombre} ${datos.apellido}`}
                className="mi-perfil-avatar"
              />
            ) : (
              <span
                className="mi-perfil-avatar mi-perfil-avatar-vacio"
                aria-hidden="true"
              >
                👤
              </span>
            )}

            {editando && (
              <div className="mi-perfil-foto-acciones">
                <label
                  htmlFor="foto-perfil"
                  className="mi-perfil-boton-foto"
                >
                  Cambiar foto
                </label>

                <input
                  id="foto-perfil"
                  type="file"
                  accept="image/*"
                  onChange={cambiarFoto}
                  className="mi-perfil-input-foto"
                />

                {fotoPerfil && (
                  <button
                    type="button"
                    onClick={eliminarFoto}
                    className="mi-perfil-eliminar-foto"
                  >
                    Eliminar foto
                  </button>
                )}
              </div>
            )}

            <h2>
              {datos.nombre} {datos.apellido}
            </h2>

            <p>DNI {datos.dni}</p>
          </div>

          <div className="mi-perfil-resumen-personal">
            <dl>
              <div>
                <dt>Correo</dt>
                <dd>{datos.email}</dd>
              </div>

              <div>
                <dt>Ciudad</dt>
                <dd>{datos.ciudad}</dd>
              </div>
            </dl>

            {!editando && (
              <button
                type="button"
                className="mi-perfil-modificar"
                onClick={comenzarEdicion}
              >
                Modificar datos
              </button>
            )}
          </div>
        </article>

        <article className="mi-perfil-datos">
          {tabActiva === "Datos Personales" && (
            <section>
              <h2>Datos Personales</h2>

              <div className="mi-perfil-grilla">
                <CampoPerfil
                  etiqueta="Nombre"
                  valor={datosEditados.nombre}
                  editando={editando}
                  onChange={(valor) =>
                    actualizarCampo(
                      "nombre",
                      valor
                    )
                  }
                />

                <CampoPerfil
                  etiqueta="Apellido"
                  valor={datosEditados.apellido}
                  editando={editando}
                  onChange={(valor) =>
                    actualizarCampo(
                      "apellido",
                      valor
                    )
                  }
                />

                <CampoPerfil
                  etiqueta="DNI"
                  valor={datosEditados.dni}
                  editando={editando}
                  onChange={(valor) =>
                    actualizarCampo(
                      "dni",
                      valor
                    )
                  }
                />

                <CampoPerfil
                  etiqueta="Nacionalidad"
                  valor={
                    datosEditados.nacionalidad
                  }
                  editando={editando}
                  onChange={(valor) =>
                    actualizarCampo(
                      "nacionalidad",
                      valor
                    )
                  }
                />
              </div>
            </section>
          )}

          {tabActiva === "Contacto" && (
            <section>
              <h2>Contacto</h2>

              <div className="mi-perfil-grilla">
                <CampoPerfil
                  etiqueta="Correo electrónico"
                  valor={datosEditados.email}
                  editando={editando}
                  tipo="email"
                  onChange={(valor) =>
                    actualizarCampo(
                      "email",
                      valor
                    )
                  }
                />

                <CampoPerfil
                  etiqueta="Correo alternativo"
                  valor={
                    datosEditados.emailAlternativo
                  }
                  editando={editando}
                  tipo="email"
                  onChange={(valor) =>
                    actualizarCampo(
                      "emailAlternativo",
                      valor
                    )
                  }
                />

                <CampoPerfil
                  etiqueta="Teléfono"
                  valor={datosEditados.telefono}
                  editando={editando}
                  tipo="tel"
                  onChange={(valor) =>
                    actualizarCampo(
                      "telefono",
                      valor
                    )
                  }
                />
              </div>
            </section>
          )}

          {tabActiva === "Domicilio" && (
            <section>
              <h2>Domicilio</h2>

              <div className="mi-perfil-grilla">
                <CampoPerfil
                  etiqueta="Domicilio"
                  valor={
                    datosEditados.domicilio
                  }
                  editando={editando}
                  onChange={(valor) =>
                    actualizarCampo(
                      "domicilio",
                      valor
                    )
                  }
                />

                <CampoPerfil
                  etiqueta="Ciudad"
                  valor={datosEditados.ciudad}
                  editando={editando}
                  onChange={(valor) =>
                    actualizarCampo(
                      "ciudad",
                      valor
                    )
                  }
                />

                <CampoPerfil
                  etiqueta="Provincia"
                  valor={
                    datosEditados.provincia
                  }
                  editando={editando}
                  onChange={(valor) =>
                    actualizarCampo(
                      "provincia",
                      valor
                    )
                  }
                />

                <CampoPerfil
                  etiqueta="País"
                  valor={datosEditados.pais}
                  editando={editando}
                  onChange={(valor) =>
                    actualizarCampo(
                      "pais",
                      valor
                    )
                  }
                />
              </div>
            </section>
          )}

          {tabActiva === "Información" && (
            <>
              {esDocente ? (
                <DetallePerfilDocente />
              ) : (
                <DetallePerfilEstudiante
                  carrera={datos.carrera}
                  cohorte={datos.cohorte}
                />
              )}
            </>
          )}

          {editando && (
            <footer className="mi-perfil-acciones">
              <button
                type="button"
                className="mi-perfil-cancelar"
                onClick={cancelarEdicion}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="mi-perfil-guardar"
                onClick={guardarCambios}
              >
                Guardar cambios
              </button>
            </footer>
          )}
        </article>
      </div>
    </section>
  );
}