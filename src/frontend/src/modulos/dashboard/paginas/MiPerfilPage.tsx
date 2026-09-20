import { useState } from 'react';

export default function MiPerfilPage() {
  const [tabActiva, setTabActiva] = useState('Datos Personales');
  const pestañas = ['Datos Personales', 'Contacto', 'Domicilio', 'Carrera y Cohorte'];

  return (
    // 1. En lugar del clásico div envolvente, usamos <main> porque es el contenido central
    <main className="animate-fade-in max-w-5xl mx-auto">
      
      <nav className="flex space-x-2 border-b border-gray-200 mb-8 overflow-x-auto" aria-label="Pestañas de perfil">
        {pestañas.map((pestaña) => (
          <button
            key={pestaña}
            onClick={() => setTabActiva(pestaña)}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              tabActiva === pestaña
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {pestaña}
          </button>
        ))}
      </nav>

      {/* Este div SÍ se queda: Es un contenedor puramente estructural para armar la grilla */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA */}
        <article className="lg:col-span-1 bg-slate-900 text-white rounded-xl overflow-hidden shadow-lg flex flex-col relative">
          
          <header className="bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-center">
            Estudiante
          </header>
          
          <section className="p-6 flex flex-col items-center border-b border-slate-700">
            {/* 2. En lugar de un div, usamos <figure> para la imagen/avatar */}
            <figure className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner" aria-label="Avatar del usuario">
              👤
            </figure>
            
            <dl className="w-full space-y-3 mt-2">
              <div className="bg-slate-800 rounded px-3 py-2 text-sm text-slate-300 border border-slate-700 flex justify-between">
                <dt className="font-semibold text-white">Nombre:</dt>
                <dd>Juan Andres</dd>
              </div>
              <div className="bg-slate-800 rounded px-3 py-2 text-sm text-slate-300 border border-slate-700 flex justify-between">
                <dt className="font-semibold text-white">Apellido:</dt>
                <dd>Perez</dd>
              </div>
              <div className="bg-slate-800 rounded px-3 py-2 text-sm text-slate-300 border border-slate-700 flex justify-between">
                <dt className="font-semibold text-white">DNI:</dt>
                <dd>55476906</dd>
              </div>
            </dl>
          </section>

          <section className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <dl className="space-y-3">
              <div className="bg-slate-800 rounded px-3 py-2 text-sm text-slate-300 border border-slate-700 flex flex-col">
                <dt className="font-semibold text-white mb-1">Domicilio:</dt>
                <dd>Calle Falsa e/ Libertador y San Juan</dd>
              </div>
              <div className="bg-slate-800 rounded px-3 py-2 text-sm text-slate-300 border border-slate-700 flex justify-between">
                <dt className="font-semibold text-white">País:</dt>
                <dd>Argentina</dd>
              </div>
              <div className="bg-slate-800 rounded px-3 py-2 text-sm text-slate-300 border border-slate-700 flex justify-between">
                <dt className="font-semibold text-white">Provincia:</dt>
                <dd>Buenos Aires</dd>
              </div>
              <div className="bg-slate-800 rounded px-3 py-2 text-sm text-slate-300 border border-slate-700 flex justify-between">
                <dt className="font-semibold text-white">Ciudad:</dt>
                <dd>La Plata</dd>
              </div>
            </dl>
            
            {/* 3. Agrupamos el botón final en un <footer> */}
            <footer>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-6 shadow-sm">
                ✏️ Modificar
              </button>
            </footer>
          </section>
        </article>

        {/* COLUMNA DERECHA */}
        <article className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col">
          
          <header className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center">
              <span className="mr-2 text-blue-600 text-2xl" aria-hidden="true">🎓</span> Carrera
            </h2>
          </header>
          
          {/* 4. En lugar de un div, el nombre de la carrera es un párrafo <p> */}
          <p className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-center text-blue-800 font-extrabold text-xl shadow-sm">
            Maestría en educación
          </p>

          {/* 5. Transformamos la grilla de numeritos en una lista desordenada <ul> y <li> */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <li className="border border-gray-200 rounded-lg p-5 text-center hover:border-blue-400 transition-colors hover:shadow-sm">
              <span className="block text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Cantidad de materias Inscriptas</span>
              <strong className="text-4xl font-black text-slate-800">4</strong>
            </li>
            <li className="border border-gray-200 rounded-lg p-5 text-center hover:border-blue-400 transition-colors hover:shadow-sm">
              <span className="block text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Cantidad de materias de la carrera</span>
              <strong className="text-4xl font-black text-slate-800">17</strong>
            </li>
            <li className="border border-gray-200 rounded-lg p-5 text-center hover:border-blue-400 transition-colors hover:shadow-sm">
              <span className="block text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Finales que debe</span>
              <strong className="text-4xl font-black text-slate-800">1</strong>
            </li>
            <li className="border border-gray-200 rounded-lg p-5 text-center hover:border-blue-400 transition-colors hover:shadow-sm">
              <span className="block text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Encuestas a completar</span>
              <strong className="text-4xl font-black text-slate-800">0</strong>
            </li>
          </ul>

          <footer className="flex justify-end border-t border-gray-100 pt-6 mt-auto">
             <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-sm">
               Dar de Baja a la Carrera
             </button>
          </footer>
        </article>

      </div>
    </main>
  );
}