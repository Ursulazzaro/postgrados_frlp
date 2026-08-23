// Formulario público de preinscripción para aspirantes a carreras de posgrado.

import { useState } from "react";
import "./FormularioInscripcion.css";

export default function FormularioInscripcion() {
  const [datos, setDatos] = useState({
    dni: "",
    apellido: "",
    nombre: "",
    email: "",
    tipo_carrera: "Especializacion",
  });

  const [mensaje, setMensaje] = useState("");

  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const respuesta = await fetch(
        "http://localhost:8000/api/v1/inscripcion/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        }
      );

      setMensaje(
        respuesta.ok
          ? "¡Inscripción enviada con éxito! Revisá tu email."
          : "Error al enviar la inscripción. Verificá tus datos."
      );
    } catch {
      setMensaje("Error de conexión con el servidor.");
    }
  };

  return (
    <section className="inscripcion">
      <section className="inscripcion-formulario">
        <h1>Preinscripción a Posgrado</h1>

        {mensaje && <p className="inscripcion-mensaje">{mensaje}</p>}

        <form onSubmit={enviarFormulario}>
          <fieldset>
            <legend className="sr-only">Datos del aspirante</legend>

            <label htmlFor="dni">DNI</label>
            <input
              id="dni"
              name="dni"
              required
              value={datos.dni}
              onChange={(e) => setDatos({ ...datos, dni: e.target.value })}
            />

            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              required
              value={datos.nombre}
              onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
            />

            <label htmlFor="apellido">Apellido</label>
            <input
              id="apellido"
              name="apellido"
              required
              value={datos.apellido}
              onChange={(e) => setDatos({ ...datos, apellido: e.target.value })}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={datos.email}
              onChange={(e) => setDatos({ ...datos, email: e.target.value })}
            />

            <label htmlFor="carrera">Carrera</label>
            <select
              id="carrera"
              name="carrera"
              value={datos.tipo_carrera}
              onChange={(e) =>
                setDatos({ ...datos, tipo_carrera: e.target.value })
              }
            >
              <option value="Especializacion">Especialización</option>
              <option value="Maestria">Maestría</option>
              <option value="Doctorado">Doctorado</option>
            </select>
          </fieldset>

          <button type="submit">Enviar inscripción</button>
        </form>
      </section>
    </section>
  );
}