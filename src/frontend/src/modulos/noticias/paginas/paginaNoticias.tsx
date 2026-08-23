import TarjetaNoticia from "../componentes/tarjetasNoticias";
import BarraLateral from "../componentes/BarraLateral";
import { noticiasFalsas } from "../mocks/noticiasFalsas";
import imagenHero from "../../../imagenes/hero-home.png";
import "./PaginaNoticias.css";

export default function PaginaNoticias() {
  return (
    <>
      <section
        className="noticias-hero"
        style={{ backgroundImage: `url(${imagenHero})` }}
        aria-labelledby="noticias-titulo"
      >
        <section className="noticias-hero-contenido">
          <h1 id="noticias-titulo">Noticias</h1>
          <p>
            Enterate de las últimas novedades y comunicados de la facultad
          </p>
        </section>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <section className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-2">
            Últimas Noticias
          </h2>

          <section className="space-y-2">
            {noticiasFalsas.map((noticia) => (
              <TarjetaNoticia
                key={noticia.id}
                categoria={noticia.categoria}
                titulo={noticia.titulo}
                resumen={noticia.resumen}
                imagenUrl={noticia.imagenUrl}
              />
            ))}
          </section>
        </section>

        <aside className="md:w-1/3">
          <BarraLateral />
        </aside>
      </section>
    </>
  );
}