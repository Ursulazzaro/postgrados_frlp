import { useState } from "react";
import "./paginaFAQ.css";

type ContenidoRespuesta =
  | {
      tipo: "parrafo";
      texto: string;
    }
  | {
      tipo: "subtitulo";
      texto: string;
    };

type Pregunta = {
  pregunta: string;
  respuesta: ContenidoRespuesta[];
};

type Categoria = {
  titulo: string;
  preguntas: Pregunta[];
};

const categorias: Categoria[] = [
  {
    titulo: "Modalidad",
    preguntas: [
      {
  pregunta: "¿Cómo es la modalidad de cursada?",
  respuesta: [
      {
        tipo: "parrafo",
        texto:
          "Toda nuestra propuesta académica se dicta completamente a distancia, a través del Campus Virtual. Podés estudiar cuándo y dónde quieras, construyendo tu propio aprendizaje.",
      },
      {
        tipo: "parrafo",
        texto:
          "El Aula virtual está disponible las 24 horas, lo que permite a los estudiantes organizar sus horarios y actividades cotidianas en relación a la cursada, y también elegir el ritmo, horarios y lugar de estudio de acuerdo a las preferencias personales.",
      },
      {
        tipo: "parrafo",
        texto:
          "En el Aula virtual se organizan foros de discusión y espacio de intercambio de experiencias, actividades de variada índole, trabajos prácticos, espacios de intercambio con los compañeros y docentes y clases impartidas por los especialistas, denominadas AVS.",
      },
      {
        tipo: "parrafo",
        texto:
          "El contenido está organizado en Módulos y Unidades, que se desarrollan semana a semana a través del material de estudio, de actividades prácticas optativas e intercambio de experiencias a través del Foro.",
      },
      {
        tipo: "parrafo",
        texto:
          "Dependiendo de la modalidad de la propuesta académica que elijas, la frecuencia de las clases y la obligatoriedad de participar en vivo de los encuentros varía. Verificá con qué modalidad se dicta el curso que elegiste para conocer qué requisitos deberás cumplir para cursar y obtener el certificado de aprobación. Esta información se muestra en la página de cada curso, junto con la fecha de inicio de cursada.",
      },
      {
        tipo: "subtitulo",
        texto: "Características particulares de cada modalidad de enseñanza",
      },
      {
        tipo: "subtitulo",
        texto: "Modalidad A distancia",
      },
      {
        tipo: "parrafo",
        texto:
          "Los cursos, carreras y seminarios de posgrado que se brindan bajo esta modalidad disponen de encuentros con los docentes que se llevan a cabo de forma semanal o quincenal y tienen una duración de entre una y dos horas. Los alumnos no están obligados a participar de las clases en vivo, y los encuentros quedan grabados en el Campus Virtual, para que pueda accederse a los mismos en cualquier momento. También se pueden descargar. Las fechas y horarios de las clases son pautados por el docente al inicio de la cursada. Para obtener su certificado de aprobación, los alumnos deben haber aprobado con 7 o más todas las actividades y tareas obligatorias de la cursada.",
      },
      {
        tipo: "subtitulo",
        texto: "Modalidad A distancia ágil",
      },
      {
        tipo: "parrafo",
        texto:
          "Los cursos que se brindan bajo esta modalidad disponen de encuentros con los docentes que se llevan a cabo de forma semanal o quincenal y tienen una duración de entre una y dos horas. Los alumnos no están obligados a participar de las clases en vivo, y los encuentros quedan grabados en el Campus Virtual, para que pueda accederse a los mismos en cualquier momento. También se pueden descargar. Las fechas y horarios de las clases son pautados por el docente al inicio de la cursada. Para obtener su certificado de aprobación, los alumnos deben haber aprobado con 7 o más todas las actividades y tareas obligatorias de la cursada.",
      },
      {
        tipo: "subtitulo",
        texto: "Modalidad Taller",
      },
      {
        tipo: "parrafo",
        texto:
          'Este modelo educativo está centrado en el "aprender-haciendo". El saber práctico se genera a través de instancias de trabajo que se desarrollan en base a la metodología de aprendizaje basado en proyectos, para que los alumnos adquieran las destrezas, competencias y habilidades planteadas en los objetivos del taller. Los talleres cuentan con clases virtuales de consulta con los tutores, de frecuencia semanal o quincenal. Son dinámicas y se centran en la participación activa de los alumnos y enfocadas al proyecto que se esté trabajando. Los alumnos no están obligados a participar de las clases en vivo. Los encuentros quedan grabados en el Campus Virtual, para que pueda accederse a los mismos en cualquier momento. También se pueden descargar. Cuentan con entregas de trabajos prácticos semanales, orientados a la elaboración del proyecto final. Para obtener su certificado de aprobación, los alumnos deben aprobar cada una de las etapas del proyecto, y aprobar con 7 o más el proyecto integrador final.',
      },
      {
        tipo: "subtitulo",
        texto: "Modalidad Vivo",
      },
      {
        tipo: "parrafo",
        texto:
          "Esta modalidad está conformada por clases en vivo con participación activa de los alumnos, acompañadas por material de estudio, foros de participación, trabajos prácticos y exámenes online disponibles en el Campus Virtual. Para mantener la regularidad y acceder al examen final, los estudiantes deben asistir al menos al 75% de las clases en vivo. Para obtener su certificado de aprobación, los alumnos deben acreditar un 75% de asistencia y aprobar la totalidad de las actividades obligatorias. Las fechas y horarios de las clases están indicados en la página web de cada curso.",
      },
      {
        tipo: "subtitulo",
        texto: "Modalidad Seminario",
      },
      {
        tipo: "parrafo",
        texto:
          "Este modelo educativo consta de uno o dos encuentros en vivo, de asistencia obligatoria, que se acompañan por material de estudio, foros de participación y una evaluación final. Para mantener la regularidad y acceder al examen final, los estudiantes deben asistir al 100% de las clases en vivo. Para obtener su certificado de aprobación, los alumnos deben acreditar 100% de asistencia y aprobar el trabajo práctico final obligatorio. Las fechas y horarios de las clases están indicados en la página web de cada curso.",
      },
    ],
  },
    ],
  },
  
  {
  titulo: "Inscripción",
  preguntas: [
    {
      pregunta: "¿Cómo hago para inscribirme a un curso?",
      respuesta: [
        {
          tipo: "parrafo",
          texto:
            'Para inscribirte deberás hacer click en el botón de "Inscripción" en la página web de tu curso de interés. Allí podrás registrarte y cargar tus datos o iniciar sesión con tu usuario existente.',
        },
        {
          tipo: "parrafo",
          texto:
            'La página te redireccionará a las opciones de pago. En caso de tener un cupón de descuento, ¡este es el momento de utilizarlo! Encontrarás el botón "Tengo un cupón de descuento" para cargar tu código.',
        },
        {
          tipo: "parrafo",
          texto:
            "Luego de confirmar la transacción, el pago puede demorar entre 48 y 72hs en impactar en el sistema. Te enviaremos un correo electrónico para informarte cuando el mismo haya sido acreditado.",
        },
        {
          tipo: "parrafo",
          texto:
            "En caso que el curso seleccionado cuente con un proceso de admisión, deberás enviar la documentación requerida para ser admitido y luego poder efectuar la inscripción.",
        },
      ],
    },
    {
      pregunta: "¿Cómo hago para inscribirme a una carrera o posgrado?",
      respuesta: [
        {
          tipo: "parrafo",
          texto:
            "Nuestras carreras y posgrados cuentan con un proceso de admisión en el que te solicitaremos que cargues en el Panel del Alumno la documentación requerida según cada caso.",
        },
        {
          tipo: "parrafo",
          texto:
            "Una vez revisada la documentación, te enviaremos un correo electrónico para informarte cuál es el estado de la misma y que puedas continuar con tu inscripción.",
        },
        {
          tipo: "parrafo",
          texto:
            "Podés conocer cuáles son los formularios y documentos solicitados en los temarios de tu carrera o posgrado de interés.",
        },
      ],
    },
    {
      pregunta: "¿Cuáles son los medios de pago y financiación?",
      respuesta: [
        {
          tipo: "parrafo",
          texto:
            "Podés abonar a través de Mercado Pago con tarjeta de débito, crédito o en efectivo.",
        },
        {
          tipo: "parrafo",
          texto:
            "En caso de abonar con cualquier tarjeta de crédito -independientemente del banco de emisión- podrás financiar el pago en 3 o 6 cuotas sin interés dependiendo del curso. También hay cursos con financiación específica, de tenerla se informa debajo de la presentación.",
        },
      ],
    },
    {
      pregunta: "¿Puedo inscribirme si soy extranjero o resido en el exterior?",
      respuesta: [
        {
          tipo: "parrafo",
          texto:
            "¡Sí! Nuestros cursos y modalidad te permiten cursar y participar de las cursadas online estés donde estés. Ponemos a tu disposición la plataforma de pago PayPal, con tarjeta de crédito, para garantizar la seguridad de tu pago.",
        },
        {
          tipo: "parrafo",
          texto:
            "En caso de querer inscribirte a las tecnicaturas o licenciatura, por favor revisá los requisitos de ingreso en el temario de cada carrera para conocer los pasos a seguir.",
        },
      ],
    },
  ],
},
  {
    titulo: "Cursado",
    preguntas: [
      {
        pregunta: "Me inscribí al curso, ¿y ahora qué hago?",
        respuesta:
          "Una vez completada la inscripción, recibirás la información necesaria para continuar con la cursada.",
      },
      {
        pregunta: "¿Puedo inscribirme a un curso que ya comenzó?",
        respuesta:
          "La posibilidad de inscribirte una vez iniciada la cursada depende de las condiciones de cada propuesta.",
      },
      {
        pregunta: "¿Hay cupos limitados para cursar?",
        respuesta:
          "La disponibilidad de cupos depende de cada curso o propuesta académica.",
      },
    ],
  },
  {
    titulo: "Otros temas",
    preguntas: [
      {
        pregunta: "¿Cuánto tarda en acreditarse mi pago?",
        respuesta:
          "El tiempo de acreditación depende del medio de pago utilizado.",
      },
      {
        pregunta: "¿Cómo solicito mi comprobante de pago?",
        respuesta:
          "Podés solicitar el comprobante de pago a través de los canales de atención correspondientes.",
      },
      {
        pregunta: "¿Cómo presentar equivalencias de otra carrera o Universidad?",
        respuesta:
          "La presentación y evaluación de equivalencias depende de los requisitos establecidos para cada carrera.",
      },
      {
        pregunta: "¿Los cursos y/o carreras otorgan puntaje docente?",
        respuesta:
          "El reconocimiento de puntaje docente depende de las características y normativa correspondiente a cada propuesta.",
      },
      {
        pregunta: "Certificado y validación para LinkedIn",
        respuesta:
          "Una vez cumplidos los requisitos correspondientes, se emite el certificado de la propuesta realizada.",
      },
      {
        pregunta: "Quiero cambiar mi información registrada",
        respuesta:
          "Si necesitás modificar información registrada, utilizá los canales de atención correspondientes.",
      },
      {
        pregunta: "Olvidé mi usuario y/o contraseña",
        respuesta:
          "Utilizá la opción de recuperación de acceso disponible en la plataforma.",
      },
      {
        pregunta: "¿Cuáles son los términos y condiciones de cursada?",
        respuesta:
          "Las condiciones de cursada dependen de cada propuesta y se encuentran informadas junto con sus requisitos.",
      },
    ],
  },
];

export default function PaginaFAQ() {
  const [preguntaAbierta, setPreguntaAbierta] = useState<string | null>(null);

  const alternarPregunta = (idPregunta: string) => {
    setPreguntaAbierta((actual) =>
      actual === idPregunta ? null : idPregunta
    );
  };

  return (
    <main className="faq">
      <section className="faq-hero" aria-labelledby="titulo-faq">
        <div className="faq-hero-contenido">
          <h1 id="titulo-faq">Preguntas frecuentes</h1>

          <p>
            Sabemos que al momento de inscribirte tenés muchas consultas por
            responder, por eso te compartimos las preguntas frecuentes que
            recibimos para ayudarte en el proceso.
          </p>
        </div>
      </section>

      <section
        className="faq-contenido"
        aria-label="Preguntas frecuentes"
      >
        {categorias.map((categoria) => (
          <section className="faq-categoria" key={categoria.titulo}>
            <div className="faq-categoria-titulo">
              <span aria-hidden="true">→</span>
              <h2>{categoria.titulo}</h2>
            </div>

            <div className="faq-lista">
              {categoria.preguntas.map((item, indice) => {
                const idPregunta = `${categoria.titulo}-${indice}`;
                const estaAbierta = preguntaAbierta === idPregunta;

                return (
                  <div className="faq-item" key={idPregunta}>
                    <button
                      type="button"
                      className="faq-pregunta"
                      aria-expanded={estaAbierta}
                      aria-controls={`respuesta-${idPregunta}`}
                      onClick={() => alternarPregunta(idPregunta)}
                    >
                      <span>{item.pregunta}</span>

                      <span
                        className={`faq-icono ${
                          estaAbierta ? "abierta" : ""
                        }`}
                        aria-hidden="true"
                      >
                       ⌄
                      </span>
                    </button>

                    {estaAbierta && (
                      <div
                        id={`respuesta-${idPregunta}`}
                        className="faq-respuesta"
                      >
                        {item.respuesta.map((contenido, indiceContenido) =>
                          contenido.tipo === "subtitulo" ? (
                            <h3 key={indiceContenido}>{contenido.texto}</h3>
                          ) : (
                            <p key={indiceContenido}>{contenido.texto}</p>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}