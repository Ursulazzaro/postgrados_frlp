// Formulario público de preinscripción para aspirantes a carreras de posgrado.

import { useState } from "react";
import "./FormularioInscripcion.css";

export default function FormularioInscripcion() {
 const [etapa, setEtapa] = useState(1);
  
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
  correo_alternativo: "",
  });

  const [mensaje, setMensaje] = useState("");

  const siguienteEtapa = () => {
    if (etapa === 1) {
      const errores: string[] = [];

      const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
      const soloTelefono = /^[0-9\s-]+$/;
      const correoValido =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

      if (!datos.apellido.trim()) {
        errores.push("El apellido es obligatorio.");
      } else if (!soloLetras.test(datos.apellido)) {
        errores.push("El apellido solo puede contener letras.");
      }

      if (!datos.nombre.trim()) {
        errores.push("El nombre es obligatorio.");
      } else if (!soloLetras.test(datos.nombre)) {
        errores.push("El nombre solo puede contener letras.");
      }

      if (!datos.nacionalidad.trim()) {
        errores.push("La nacionalidad es obligatoria.");
      } else if (!soloLetras.test(datos.nacionalidad)) {
        errores.push("La nacionalidad solo puede contener letras.");
      }

      if (!datos.dni.trim()) {
        errores.push("El DNI es obligatorio.");
      } else if (!/^[0-9]+$/.test(datos.dni)) {
        errores.push("El DNI solo puede contener números.");
      }

      if (datos.telefono && !soloTelefono.test(datos.telefono)) {
        errores.push(
          "El teléfono solo puede contener números, espacios y guiones."
        );
      }

      if (!datos.email.trim()) {
        errores.push("El correo electrónico es obligatorio.");
      } else if (!correoValido.test(datos.email)) {
        errores.push(
          "El correo electrónico no tiene un formato válido."
        );
      }

      if (!datos.pais) {
        errores.push("Seleccioná un país.");
      }

      if (!datos.provincia) {
        errores.push("Seleccioná una provincia.");
      }

      if (!datos.ciudad.trim()) {
        errores.push("La ciudad es obligatoria.");
      } else if (!soloLetras.test(datos.ciudad)) {
        errores.push("La ciudad solo puede contener letras.");
      }

      if (!datos.titulo_anterior.trim()) {
        errores.push("El título anterior es obligatorio.");
      }

      if (!datos.universidad_anterior.trim()) {
        errores.push("La universidad anterior es obligatoria.");
      }

      if (errores.length > 0) {
        setMensaje(errores.join(" "));
        return;
      }

      setMensaje("");
      }

      if (etapa < 4) {
        setEtapa(etapa + 1);
      }
    };

  const etapaAnterior = () => {
    if (etapa > 1) {
      setEtapa(etapa - 1);
    }
  };

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

        <nav className="inscripcion-etapas" aria-label="Etapas de inscripción">
        <div className={etapa === 1 ? "inscripcion-etapa activa" : "inscripcion-etapa"}>
          <span>1</span>
          <p>Datos Personales</p>
        </div>

        <div className={etapa === 2 ? "inscripcion-etapa activa" : "inscripcion-etapa"}>
          <span>2</span>
          <p>Documentación</p>
        </div>

        <div className={etapa === 3 ? "inscripcion-etapa activa" : "inscripcion-etapa"}>
          <span>3</span>
          <p>Beca (Opcional)</p>
        </div>

        <div className={etapa === 4 ? "inscripcion-etapa activa" : "inscripcion-etapa"}>
          <span>4</span>
          <p>Confirmación</p>
        </div>
      </nav>

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
                pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+"
                title="El apellido solo puede contener letras."
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
                pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+"
                title="El nombre solo puede contener letras."
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
                pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+"
                title="La nacionalidad solo puede contener letras."
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
                type="text"
                required
                inputMode="numeric"
                pattern="[0-9]+"
                title="El DNI solo puede contener números."
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
                pattern="[0-9\s-]+"
                title="El teléfono solo puede contener números, espacios y guiones."
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
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                placeholder="Ejemplo@correo.com"
                value={datos.email}
                onChange={(e) =>
                  setDatos({ ...datos, email: e.target.value })
                }
              />
            </div>

            <div className="inscripcion-campo">
              <label htmlFor="correo_alternativo">Correo Electrónico Alternativo</label>

              <input
                id="correo_alternativo"
                name="correo:alternativo"
                type="email"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                placeholder="Ejemplo@correo.com"
                value={datos.correo_alternativo}
                onChange={(e) =>
                  setDatos({ ...datos, correo_alternativo: e.target.value})
                }
              />
            </div>

            <div className="inscripcion-campo inscripcion-campo-ancho-completo">
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
                onChange={(e) => {
                  e.currentTarget.setCustomValidity("");
                  setDatos({ ...datos, provincia: e.target.value });
                }}
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity("Seleccioná una provincia.")
                }
              >
                <option value="">Seleccionar</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="Catamarca">Catamarca</option>
                <option value="Chaco">Chaco</option>
                <option value="Chubut">Chubut</option>
                <option value="Ciudad Autónoma de Buenos Aires">
                  Ciudad Autónoma de Buenos Aires
                </option>
                <option value="Córdoba">Córdoba</option>
                <option value="Corrientes">Corrientes</option>
                <option value="Entre Ríos">Entre Ríos</option>
                <option value="Formosa">Formosa</option>
                <option value="Jujuy">Jujuy</option>
                <option value="La Pampa">La Pampa</option>
                <option value="La Rioja">La Rioja</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Misiones">Misiones</option>
                <option value="Neuquén">Neuquén</option>
                <option value="Río Negro">Río Negro</option>
                <option value="Salta">Salta</option>
                <option value="San Juan">San Juan</option>
                <option value="San Luis">San Luis</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Santiago del Estero">Santiago del Estero</option>
                <option value="Tierra del Fuego, Antártida e Islas del Atlántico Sur">
                  Tierra del Fuego, Antártida e Islas del Atlántico Sur
                </option>
                <option value="Tucumán">Tucumán</option>
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
                pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+"
                title="La ciudad solo puede contener letras."
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

          <button
            type="button"
            onClick={siguienteEtapa}
          >
            Siguiente ➜
          </button>
        </form>
      </section>
    </section>
  );
}