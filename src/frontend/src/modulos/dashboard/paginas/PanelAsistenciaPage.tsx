export default function PanelAsistenciaPage() {
  // Una mini base de datos de ejemplo basada en tu mockup
  const alumnos = [
    { id: 1, nombre: "Juan Pepito" },
    { id: 2, nombre: "Thiago Bedoya Agüero" },
    { id: 3, nombre: "Nicolas Vazquez" },
    { id: 4, nombre: "Malvina Ramirez" },
    { id: 5, nombre: "Justina Agüero" },
  ];

  return (
    <main className="animate-fade-in max-w-5xl mx-auto">
      
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Panel de Inasistencias</h1>
        <p className="text-gray-500 mt-1 font-medium">Hola, Margarita! Selecciona una materia para pasar lista.</p>
      </header>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        
        {/* 1. ZONA DE FILTROS (Formulario Semántico con <form>, <label> y <select>) */}
        <form className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          
          <div className="flex flex-col col-span-2">
            <label htmlFor="materia" className="text-sm font-semibold text-gray-700 mb-2">Seleccionar Materia <span className="text-red-500">*</span></label>
            <select id="materia" className="border border-gray-300 rounded-md p-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              <option>Seleccionar</option>
              <option>Metodología de la Investigación</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="turno" className="text-sm font-semibold text-gray-700 mb-2">Seleccionar turno <span className="text-red-500">*</span></label>
            <select id="turno" className="border border-gray-300 rounded-md p-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              <option>Seleccionar</option>
              <option>Noche</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2 border-l border-gray-100 pl-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="fecha" className="text-sm font-semibold text-gray-700 w-12">Fecha</label>
              <input type="date" id="fecha" defaultValue="2026-06-02" className="border border-gray-300 rounded-md p-1.5 w-full text-sm bg-gray-50" />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="curso" className="text-sm font-semibold text-gray-700 w-12">Curso</label>
              <input type="text" id="curso" defaultValue="P21" className="border border-gray-300 rounded-md p-1.5 w-full text-sm bg-gray-50 font-bold text-center" />
            </div>
          </div>
        </form>

        <hr className="border-gray-100 mb-6" />

        {/* 2. ZONA DE BÚSQUEDA Y ACCIÓN RÁPIDA */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
            <input type="search" placeholder="Buscar Alumno" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm flex items-center shadow-sm">
            <span className="mr-2">✔️</span> Marcar a todos presentes
          </button>
        </div>

        {/* 3. TABLA SEMÁNTICA (<table, thead, tbody, tr, th, td>) */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left border-collapse">
            
            <thead className="bg-slate-100 text-slate-700 text-sm">
              <tr>
                <th className="p-4 border-b border-gray-200 w-16 font-bold">#</th>
                <th className="p-4 border-b border-gray-200 font-bold">Alumnos</th>
                <th className="p-4 border-b border-gray-200 text-center w-32 text-emerald-700 font-extrabold tracking-wide">Presente</th>
                <th className="p-4 border-b border-gray-200 text-center w-32 text-red-700 font-extrabold tracking-wide">Ausente</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100">
              {alumnos.map((alumno) => (
                <tr key={alumno.id} className="hover:bg-blue-50 transition-colors">
                  <td className="p-4 text-gray-500 text-sm font-semibold">{alumno.id}</td>
                  <td className="p-4 font-bold text-slate-800 text-sm">{alumno.nombre}</td>
                  <td className="p-4 text-center">
                    {/* Botones de radio nativos, pero coloreados con Tailwind */}
                    <input type="radio" name={`asistencia-${alumno.id}`} defaultChecked className="w-5 h-5 accent-emerald-500 cursor-pointer" />
                  </td>
                  <td className="p-4 text-center">
                    <input type="radio" name={`asistencia-${alumno.id}`} className="w-5 h-5 accent-red-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>

        {/* 4. BOTONES FINALES */}
        <footer className="mt-8 flex justify-end space-x-4">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-colors shadow-sm flex items-center">
             🗑️ Descartar
          </button>
          <button className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-6 rounded-md transition-colors shadow-sm flex items-center">
             💾 Guardar
          </button>
        </footer>

      </section>
    </main>
  );
}