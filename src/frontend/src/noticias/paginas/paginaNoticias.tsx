import React from 'react';
import TarjetaNoticia from '../componentes/tarjetasNoticias';
import BarraLateral from '../componentes/BarraLateral';
import { noticiasFalsas } from '../mocks/noticiasFalsas';

export default function PaginaNoticias() {
  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* 1. SECCIÓN HERO (El banner gigante) */}
      <section 
        className="relative bg-cover bg-center h-80 flex items-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-5xl font-extrabold text-white mb-4">Noticias</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Enterate de las ultimas novedades y comunicados de la facultad
          </p>
        </div>
      </section>

      {/* 2. CONTENEDOR PRINCIPAL */}
      <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        
        {/* Columna Izquierda (Acá se dibujan las Tarjetas) */}
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-2">Últimas Noticias</h2>
          
          <div className="space-y-2">
            {/* El .map agarra tu lista de noticias y dibuja un componente por cada una */}
            {noticiasFalsas.map((noticia) => (
              <TarjetaNoticia 
                key={noticia.id}
                categoria={noticia.categoria}
                titulo={noticia.titulo}
                resumen={noticia.resumen}
                imagenUrl={noticia.imagenUrl}
              />
            ))}
          </div>
        </div>

        {/* Columna Derecha (Acá ponemos el Sidebar) */}
        <aside className="md:w-1/3">
          <BarraLateral />
        </aside>

      </section>
    </main>
  );
}