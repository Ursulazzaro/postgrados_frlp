import React from 'react';

// 1. EL MOLDE: Creamos nuestra tarjeta reutilizable inteligente
// Semánticamente correcta: usa <article> para englobar el dato
interface TarjetaMetricaProps {
  titulo: string;
  valor: string;
  colorBorde: string;
  children?: React.ReactNode;
}

function TarjetaMetrica({ titulo, valor, colorBorde, children }: TarjetaMetricaProps) {
  return (
    <article className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${colorBorde} flex flex-col justify-between hover:shadow-md transition-shadow`}>
      <h3 className="text-gray-500 text-sm font-bold mb-3">{titulo}</h3>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-extrabold text-gray-800">{valor}</span>
        {/* Aquí inyectaremos gráficos o enlaces desde afuera */}
        <div>{children}</div> 
      </div>
    </article>
  );
}

// 2. LA PÁGINA: Ensamblamos todo usando CSS Grid
export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      
      {/* Saludo principal */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Hola, Juan!</h1>
        <p className="text-gray-500 mt-1 font-medium">Bienvenido/a a tu panel de estudiante.</p>
      </header>

      {/* LA MAGIA DEL GRID: 1 columna en celular, 2 en tablet, 3 en PC */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        <TarjetaMetrica titulo="Estado del legajo" valor="Completo" colorBorde="border-green-500">
          <span className="bg-green-100 text-green-600 rounded-full w-10 h-10 flex items-center justify-center text-xl">✓</span>
        </TarjetaMetrica>

        <TarjetaMetrica titulo="Estado Académico" valor="En Curso" colorBorde="border-yellow-400">
          {/* Simulamos el mini gráfico de barras de tu mockup con CSS */}
          <div className="flex items-end space-x-1 h-8 opacity-80">
            <div className="w-3 h-4 bg-yellow-400 rounded-sm"></div>
            <div className="w-3 h-6 bg-yellow-400 rounded-sm"></div>
            <div className="w-3 h-8 bg-yellow-400 rounded-sm"></div>
          </div>
        </TarjetaMetrica>

        <TarjetaMetrica titulo="Avance del posgrado" valor="40%" colorBorde="border-blue-500">
          <span className="text-blue-600 text-sm font-bold cursor-pointer hover:underline">Ver Progreso →</span>
        </TarjetaMetrica>

        <TarjetaMetrica titulo="Seminarios aprobados" valor="13" colorBorde="border-slate-800">
          <span className="text-slate-600 text-sm font-bold cursor-pointer hover:underline">Ver todos →</span>
        </TarjetaMetrica>

        <TarjetaMetrica titulo="Inasistencias" valor="6" colorBorde="border-red-500">
          <span className="text-slate-600 text-sm font-bold cursor-pointer hover:underline">Ver todos →</span>
        </TarjetaMetrica>

        <TarjetaMetrica titulo="Nota Promedio" valor="7.4" colorBorde="border-teal-500">
          <span className="text-slate-600 text-sm font-bold cursor-pointer hover:underline">Ver notas →</span>
        </TarjetaMetrica>

      </section>

            {/* ÁREA INFERIOR: Paneles anchos para Próximas Clases y Alertas */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PANEL IZQUIERDO: Próximas Clases */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <header className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Próximas Clases</h3>
          </header>
          
          {/* Usamos <ul> para listas de elementos (HTML Semántico) */}
          <ul className="divide-y divide-gray-100 flex-1 p-2">
            <li className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-700">Metodología de la Investigación</span>
              {/* <time> le da contexto a la fecha */}
              <time className="text-slate-500 font-medium">Jueves 17/05</time>
            </li>
            <li className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-700">Gestión de Proyectos</span>
              <time className="text-slate-500 font-medium">Martes 31/05</time>
            </li>
            <li className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center text-sm">
              <span className="font-medium text-slate-700">Maestría de Sistemas</span>
              <time className="text-slate-500 font-medium">Lunes 08/06</time>
            </li>
          </ul>
        </article>

        {/* PANEL DERECHO: Últimas Notificaciones */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <header className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Últimas Notificaciones</h3>
          </header>
          
          <div className="p-6 flex-1">
            {/* Tarjeta de Alerta Rojasimilar al mockup */}
            <div className="flex items-start space-x-4 bg-red-50 p-5 rounded-lg border border-red-100">
              <div className="flex-shrink-0 mt-1 relative">
                <span className="text-2xl">🔔</span>
                {/* Puntito rojo de notificación nueva */}
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-red-50 rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-900 tracking-wide">Recordatorio: Carga de encuesta</h4>
                <p className="text-sm text-red-700 mt-1 leading-relaxed">
                  Falta completar información de la encuesta de la materia Metodología de la Investigación.
                </p>
              </div>
            </div>
            
          </div>
        </article>

      </section>

    </div>
  );
}