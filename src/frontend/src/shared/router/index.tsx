// Define las rutas públicas y privadas de la aplicación.

import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../disposiciones/PublicLayout";
import DashboardLayout from "../disposiciones/DashboardLayout";
import PaginaNoEncontrada from "../paginas/PaginaNoEncontrada";

import ProtectedRoute from "../../modulos/manejo-sesion/ProtectedRoute";
import LoginPage from "../../modulos/manejo-sesion/paginas/LoginPage";
import RecuperarContrasenaPage from "../../modulos/manejo-sesion/paginas/RecuperarContrasenaPage";

import HomePage from "../../modulos/home/paginas/HomePage";
import DashboardPage from "../../modulos/dashboard/paginas/DashboardPage";
import FormularioInscripcion from "../../modulos/inscripcion/paginas/FormularioInscripcion";
import PaginaNoticias from "../../modulos/noticias/paginas/paginaNoticias";
import PaginaCarreras from "../../modulos/carreras/paginas/PaginaCarreras";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "recuperar-contrasena",
        element: <RecuperarContrasenaPage />,
      },
      { path: "carreras", element: <PaginaCarreras /> },
      { path: "inscripcion", element: <FormularioInscripcion /> },
      { path: "noticias", element: <PaginaNoticias /> },
      { path: "*", element: <PaginaNoEncontrada /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
        ],
      },
    ],
  },
]);