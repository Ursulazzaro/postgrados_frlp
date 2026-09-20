interface TarjetaDocenteProps {
  titulo: string;
  valor: string;
  accionTexto: string;
}

// 1. Componente reutilizable semántico
function TarjetaDocente({ titulo, valor, accionTexto }: TarjetaDocenteProps) {
  return (
    <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between hover:border-blue-300 transition-colors">
      <h3 className="text-slate-600 font-bold mb-4">{titulo}</h3>
      <div className="flex items-end justify-between mt-4">
        <span className="text-5xl font-light text-slate-400">{valor}</span>
        <button className="text-blue-600 text-sm font-semibold hover:underline">
          {accionTexto}
        </button>
      </div>
    </article>
  );
}

// 2. La página principal del Docente
export default function DashboardDocentePage() {
  return (
    <main className="animate-fade-in">
      
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Hola, Margarita!</h1>
        <p className="text-gray-500 mt-1 font-medium">Bienvenido/a a tu panel docente.</p>
      </header>

      {/* Tarjetas Superiores */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TarjetaDocente titulo="Seminarios Asignados" valor="4" accionTexto="Ver detalle →" />
        <TarjetaDocente titulo="Estudiantes a Cargo" valor="183" accionTexto="Ver detalle →" />
        <TarjetaDocente titulo="Carga de notas Pendientes" valor="2" accionTexto="Completar →" />
      </section>

      {/* Paneles Inferiores */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PANEL: Próximas Clases */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <header className="p-6 border-b border-gray-100 bg-slate-50 rounded-t-xl">
            <h3 className="text-lg font-bold text-gray-900">Próximas Clases</h3>
          </header>
          
          <ul className="divide-y divide-gray-100 flex-1 p-2">
            <li className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-700">Metodología de la Investigación</span>
              <time className="text-slate-500 font-medium">Jueves 17/05</time>
            </li>
            <li className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-700">Gestión de Proyectos</span>
              <time className="text-slate-500 font-medium">Martes 31/05</time>
            </li>
            <li className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-700">Maestría de Sistemas</span>
              <time className="text-slate-500 font-medium">Lunes 08/06</time>
            </li>
            <li className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-700">Especialización en Ingeniería Ambiental</span>
              <time className="text-slate-500 font-medium">Jueves 25/06</time>
            </li>
          </ul>
          
          <footer className="p-4 border-t border-gray-100 text-right bg-slate-50 rounded-b-xl">
             <button className="text-blue-600 text-sm font-semibold hover:underline">Ver Todo →</button>
          </footer>
        </article>

        {/* PANEL: Últimos Mensajes */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <header className="p-6 border-b border-gray-100 bg-slate-50 rounded-t-xl">
            <h3 className="text-lg font-bold text-gray-900">Últimos Mensajes</h3>
          </header>
          
          <ul className="p-4 space-y-4 flex-1">
            <li className="flex items-start space-x-4 bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex-shrink-0 mt-1" aria-hidden="true">
                <span className="text-2xl">🔔</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-900">Recordatorio: Carga de notas</h4>
                <p className="text-sm text-red-700 mt-1">Falta completar información de notas de algunos alumnos.</p>
              </div>
            </li>
            
            <li className="flex items-start space-x-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex-shrink-0 mt-1" aria-hidden="true">
                <span className="text-2xl">🔔</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Recordatorio: Asistencias</h4>
                <p className="text-sm text-slate-600 mt-1">Completó las asistencias del día viernes, pero no lo guardó, por favor revisar y guardar.</p>
              </div>
            </li>
          </ul>
        </article>

      </section>

    </main>
  );
}