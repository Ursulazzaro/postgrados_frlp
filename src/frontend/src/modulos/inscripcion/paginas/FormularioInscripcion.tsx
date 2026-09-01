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
  nacionalidad: "",
  telefono: "",
  domicilio: "",
  pais: "",
  provincia: "",
  ciudad: "",
  titulo_anterior: "",
  universidad_anterior: "",
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
            <legend className="sr-only">Datos personales</legend>

            <div className="inscripcion-campo">
              <label htmlFor="carrera">
                Carrera Elegida <span>*</span>
              </label>

              <select
                id="carrera"
                name="carrera"
                value={datos.tipo_carrera}
                onChange={(e) =>
                  setDatos({ ...datos, tipo_carrera: e.target.value })
                }
                required
              >
                <option value="Especializacion">Especialización</option>
                <option value="Maestria">Maestría</option>
                <option value="Doctorado">Doctorado</option>
              </select>
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="apellido">
                Apellido/s <span>*</span>
              </label>

              <input
                id="apellido"
                name="apellido"
                required
                value={datos.apellido}
                onChange={(e) =>
                  setDatos({ ...datos, apellido: e.target.value })
                }
              />
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="nombre">
                Nombre/s <span>*</span>
              </label>

              <input
                id="nombre"
                name="nombre"
                required
                value={datos.nombre}
                onChange={(e) =>
                  setDatos({ ...datos, nombre: e.target.value })
                }
              />
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="nacionalidad">
                Nacionalidad <span>*</span>
              </label>

              <input
                id="nacionalidad"
                name="nacionalidad"
                required
                value={datos.nacionalidad}
                onChange={(e) =>
                  setDatos({ ...datos, nacionalidad: e.target.value })
                }
              />
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="dni">
                DNI o Pasaporte <span>*</span>
              </label>

              <input
                id="dni"
                name="dni"
                required
                value={datos.dni}
                onChange={(e) =>
                  setDatos({ ...datos, dni: e.target.value })
                }
              />
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="telefono">Teléfono Móvil</label>

              <input
                id="telefono"
                name="telefono"
                placeholder="Ej: 221-221-2221"
                value={datos.telefono}
                onChange={(e) =>
                  setDatos({ ...datos, telefono: e.target.value })
                }
              />
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="email">
                Correo Electrónico <span>*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Ejemplo@correo.com"
                value={datos.email}
                onChange={(e) =>
                  setDatos({ ...datos, email: e.target.value })
                }
              />
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="domicilio">Domicilio</label>

              <input
                id="domicilio"
                name="domicilio"
                placeholder="Ingresa tu domicilio actual"
                value={datos.domicilio}
                onChange={(e) =>
                  setDatos({ ...datos, domicilio: e.target.value })
                }
              />
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="pais">
                País <span>*</span>
              </label>

              <select
                id="pais"
                name="pais"
                required
                value={datos.pais}
                onChange={(e) =>
                  setDatos({ ...datos, pais: e.target.value })
                }
              >
                <option value="">Seleccionar</option>
                <option value="Argentina">Argentina</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="provincia">
                Provincia <span>*</span>
              </label>

              <select
                id="provincia"
                name="provincia"
                required
                value={datos.provincia}
                onChange={(e) =>
                  setDatos({ ...datos, provincia: e.target.value })
                }
              >
                <option value="">Seleccionar</option>
                <option value="Buenos Aires">Buenos Aires</option>
              </select>
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="ciudad">
                Ciudad <span>*</span>
              </label>

              <input
                id="ciudad"
                name="ciudad"
                required
                value={datos.ciudad}
                onChange={(e) =>
                  setDatos({ ...datos, ciudad: e.target.value })
                }
              />
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="titulo_anterior">
                Título anterior <span>*</span>
              </label>

              <input
                id="titulo_anterior"
                name="titulo_anterior"
                required
                placeholder="Ingresa tu titulación anterior"
                value={datos.titulo_anterior}
                onChange={(e) =>
                  setDatos({ ...datos, titulo_anterior: e.target.value })
                }
              />
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="universidad_anterior">
                Universidad Anterior <span>*</span>
              </label>

              <input
                id="universidad_anterior"
                name="universidad_anterior"
                required
                placeholder="Ingresa tu institución anterior"
                value={datos.universidad_anterior}
                onChange={(e) =>
                  setDatos({ ...datos, universidad_anterior: e.target.value })
                }
              />
            </div>
          </fieldset>

          <button type="submit">Enviar inscripción</button>
        </form>
      </section>
    </section>
  );
}