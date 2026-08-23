// Define las rutas públicas y privadas de la aplicación.

import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../disposiciones/PublicLayout";
import DashboardLayout from "../disposiciones/DashboardLayout";
import ProtectedRoute from "../auth/ProtectedRoute";

import HomePage from "../../home/paginas/HomePage";
import LoginPage from "../auth/paginas/LoginPage";
import DashboardPage from "../../dashboard/paginas/DashboardPage";
import FormularioInscripcion from "../../inscripcion/paginas/FormularioInscripcion";
import PaginaNoticias from "../../noticias/paginas/paginaNoticias";
import PaginaNoEncontrada from "../paginas/PaginaNoEncontrada";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
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
          { path: "inscripcion", element: <FormularioInscripcion /> },
        ],
      },
    ],
  },
]);