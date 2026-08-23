import React from 'react';

export default function BarraLateral() {
  return (
    // Agrupamos en un fragmento porque el <aside> padre ya está en tu paginaNoticias.tsx
    <div className="flex flex-col gap-6">
      
      {/* SECCIÓN 1: Buscador */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <form role="search" className="flex flex-col">
          <label htmlFor="buscador" className="font-bold text-gray-900 mb-2">
            Buscar Noticias
          </label>
          <input 
            type="search" 
            id="buscador" 
            placeholder="Buscar....." 
            className="border border-gray-300 rounded-md p-2 bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </section>

      {/* SECCIÓN 2: Menú de Categorías */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Categorias</h3>
        
        {/* <nav> indica que esto es un bloque de navegación */}
        <nav aria-label="Filtro de categorías">
          {/* <ul> y <li> es la forma correcta de hacer listas, sin usar divs */}
          <ul className="space-y-3 font-medium text-sm">
            
            <li>
              {/* El botón seleccionado va en azul, simulando el mockup */}
              <button className="w-full text-left bg-blue-200 text-blue-800 px-4 py-2 rounded-md transition-colors border border-blue-300">
                Todas las noticias
              </button>
            </li>
            
            {/* Los demás botones van en gris */}
            <li>
              <button className="w-full text-left bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md transition-colors border border-gray-300 shadow-sm">
                Academico
              </button>
            </li>
            <li>
              <button className="w-full text-left bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md transition-colors border border-gray-300 shadow-sm">
                Posgrado
              </button>
            </li>
            <li>
              <button className="w-full text-left bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md transition-colors border border-gray-300 shadow-sm">
                Becas
              </button>
            </li>
            <li>
              <button className="w-full text-left bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md transition-colors border border-gray-300 shadow-sm">
                Eventos y Feriados
              </button>
            </li>

          </ul>
        </nav>
      </section>

    </div>
  );
}