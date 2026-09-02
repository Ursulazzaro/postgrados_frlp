import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../modulos/manejo-sesion/useAuth";

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    // Contenedor principal que ocupa toda la pantalla
    <div className="min-h-screen flex bg-gray-100 font-sans">
      
      {/* 1. BARRA LATERAL (Sidebar) - Azul oscura según el mockup */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10">
        
        {/* Logo y Título */}
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold tracking-wider">UTN FRLP</h2>
          <p className="text-sm text-slate-400 mt-1">Estudiante</p>
        </div>

        {/* Menú de Navegación */}
        <nav aria-label="Navegación del panel" className="mt-6 flex-1 px-4 space-y-2">
          {/* NavLink pinta el botón de azul automáticamente si estamos en esa URL */}
          <NavLink 
            to="/dashboard" 
            end
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-blue-600 text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            🏠 Inicio
          </NavLink>

          <NavLink 
            to="/dashboard/perfil"
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-blue-600 text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            👤 Mi Perfil
          </NavLink>

          <NavLink 
            to="/dashboard/estado-academico"
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-blue-600 text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            📊 Estado Académico
          </NavLink>
          
          <NavLink 
            to="/dashboard/tesis"
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-blue-600 text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            📝 Trabajo Final / Tesis
          </NavLink>
                    {/* BOTÓN TEMPORAL PARA VER LA VISTA DEL DOCENTE */}
          <NavLink 
            to="/dashboard/docente"
            className={({ isActive }) => 
              `flex items-center px-4 py-3 mt-8 rounded-md text-sm font-bold transition-colors ${
                isActive ? "bg-amber-500 text-slate-900 shadow-md" : "text-amber-400 border border-amber-500 hover:bg-amber-500 hover:text-slate-900"
              }`
            }
          >
            👁️ Vista Docente (Test)
          </NavLink>
        </nav>

        {/* Botón Cerrar Sesión (Fijo abajo) */}
        <div className="p-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm"
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ÁREA DERECHA (Header + Contenido Central) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* 2. ENCABEZADO SUPERIOR (Header) - Blanco según el mockup */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-end px-8 shadow-sm z-0">
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-blue-600 text-xl transition-colors">✉️</button>
            <button className="text-gray-400 hover:text-blue-600 text-xl transition-colors">🔔</button>
            
            {/* Perfil de Usuario simulado (Como en el Mockup: Juan Perez) */}
            <div className="flex items-center space-x-3 border-l pl-6 border-gray-200 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
              <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold shadow-sm">
                JP
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-gray-800 leading-tight">Juan Perez</p>
                <p className="text-xs text-gray-500">Estudiante</p>
              </div>
              <span className="text-gray-400 text-xs">▼</span>
            </div>
          </div>
        </header>

        {/* 3. CONTENIDO DINÁMICO (El "Agujero" del marco) */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}