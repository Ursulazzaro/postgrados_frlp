import { useState } from "react";
import "./PaginaCalendario.css";

type TipoEvento = "clases" | "inscripcion" | "examen" | "feriado" | "otros";

type Evento = {
  fecha: string;
  titulo: string;
  descripcion: string;
  tipo: TipoEvento;
};

const eventos: Evento[] = [
  {
    fecha: "2026-02-17",
    titulo: "Inscripción a carreras",
    descripcion: "Inscripción a carreras y materias de todos los niveles",
    tipo: "inscripcion",
  },
  {
    fecha: "2026-04-04",
    titulo: "Inicio de clases",
    descripcion: "Comienzo Ciclo Lectivo 2026",
    tipo: "clases",
  },
  {
    fecha: "2026-04-16",
    titulo: "Mesa de examen Final",
    descripcion: "Sin actividad. 1er Turno examen Final.",
    tipo: "examen",
  },
  {
    fecha: "2026-05-02",
    titulo: "Día del personal docente Universitario",
    descripcion: "Sin actividad. Día del personal docente universitario de la UTN",
    tipo: "otros",
  },
  {
    fecha: "2026-06-16",
    titulo: "Feriado",
    descripcion: "Sin actividad. Día de paso a la Inmortalidad de Güemes",
    tipo: "feriado",
  },
  {
    fecha: "2026-06-20",
    titulo: "Feriado",
    descripcion: "Sin actividad. Día de paso a la Inmortalidad del General Belgrano",
    tipo: "feriado",
  },
];

const nombresMeses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const nombresDias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function obtenerDiasDelMes(anio: number, mes: number) {
  return new Date(anio, mes + 1, 0).getDate();
}

function obtenerPrimerDia(anio: number, mes: number) {
  const dia = new Date(anio, mes, 1).getDay();

  // JavaScript considera domingo = 0.
  // Nosotros queremos lunes = 0.
  return dia === 0 ? 6 : dia - 1;
}

function obtenerEvento(fecha: string) {
  return eventos.find((evento) => evento.fecha === fecha);
}

export default function PaginaCalendario() {
  const [anio, setAnio] = useState(2026);
  const [mes, setMes] = useState(5); // Junio

  const diasDelMes = obtenerDiasDelMes(anio, mes);
  const primerDia = obtenerPrimerDia(anio, mes);

  const cambiarMes = (direccion: number) => {
    let nuevoMes = mes + direccion;
    let nuevoAnio = anio;

    if (nuevoMes < 0) {
      nuevoMes = 11;
      nuevoAnio--;
    }

    if (nuevoMes > 11) {
      nuevoMes = 0;
      nuevoAnio++;
    }

    setMes(nuevoMes);
    setAnio(nuevoAnio);
  };

  const diasCalendario = [];

  for (let i = 0; i < primerDia; i++) {
    diasCalendario.push(null);
  }

  for (let dia = 1; dia <= diasDelMes; dia++) {
    diasCalendario.push(dia);
  }

  const eventosDelMes = eventos.filter((evento) => {
    const fecha = new Date(`${evento.fecha}T00:00:00`);

    return (
      fecha.getFullYear() === anio &&
      fecha.getMonth() === mes
    );
  });

  return (
    <main className="calendario">
      <section className="calendario-contenido">
        <header className="calendario-encabezado">
          <div>
            <h1>Calendario Académico</h1>
            <p>Consulta las fechas importantes del ciclo lectivo</p>
          </div>

          <div className="calendario-anio">
            <label htmlFor="anio">Seleccionar año</label>

            <select
              id="anio"
              value={anio}
              onChange={(e) => {
                setAnio(Number(e.target.value));
                setMes(0);
              }}
            >
              <option value="2026">2026</option>
            </select>
          </div>
        </header>

        <section className="calendario-cuerpo">
          <div className="calendario-eventos">
            <h2 className="sr-only">Eventos académicos</h2>

            {eventosDelMes.length === 0 ? (
              <p className="calendario-sin-eventos">
                No hay eventos registrados para este mes.
              </p>
            ) : (
              eventosDelMes.map((evento) => {
                const fecha = new Date(`${evento.fecha}T00:00:00`);

                return (
                  <article
                    className={`calendario-evento calendario-evento-${evento.tipo}`}
                    key={evento.fecha}
                  >
                    <div className="calendario-evento-fecha">
                      <span>{nombresMeses[mes]}</span>
                      <strong>{fecha.getDate()}</strong>
                    </div>

                    <div className="calendario-evento-contenido">
                      <h3>{evento.titulo}</h3>
                      <p>{evento.descripcion}</p>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <div className="calendario-panel">
            <div className="calendario-navegacion">
              <button
                type="button"
                onClick={() => cambiarMes(-1)}
                aria-label="Mes anterior"
              >
                ‹
              </button>

              <h2>
                {nombresMeses[mes]} {anio}
              </h2>

              <button
                type="button"
                onClick={() => cambiarMes(1)}
                aria-label="Mes siguiente"
              >
                ›
              </button>
            </div>

            <div className="calendario-dias-semana">
              {nombresDias.map((dia) => (
                <span key={dia}>{dia}</span>
              ))}
            </div>

            <div className="calendario-dias">
              {diasCalendario.map((dia, indice) => {
                if (dia === null) {
                  return <span key={`vacio-${indice}`} />;
                }

                const fecha = `${anio}-${String(mes + 1).padStart(
                  2,
                  "0"
                )}-${String(dia).padStart(2, "0")}`;

                const evento = obtenerEvento(fecha);

                return (
                  <span
                    key={fecha}
                    className={
                      evento
                        ? `calendario-dia calendario-dia-${evento.tipo}`
                        : "calendario-dia"
                    }
                  >
                    {dia}
                  </span>
                );
              })}
            </div>

            <div className="calendario-leyenda">
              <div>
                <span className="leyenda-color leyenda-clases" />
                Inicio de clases
              </div>

              <div>
                <span className="leyenda-color leyenda-inscripcion" />
                Inscripciones
              </div>

              <div>
                <span className="leyenda-color leyenda-examen" />
                Mesa de final
              </div>

              <div>
                <span className="leyenda-color leyenda-feriado" />
                Feriados
              </div>

              <div>
                <span className="leyenda-color leyenda-otros" />
                Otros eventos
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}