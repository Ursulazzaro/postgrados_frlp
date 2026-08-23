// Layout compartido por las páginas públicas de la aplicación.

import { Outlet } from "react-router-dom";
import BarraNavHome from "../components/BarraNavHome/BarraNavHome";
import PiePagina from "../components/PiePagina/PiePagina";

export default function PublicLayout() {
  return (
    <>
      <BarraNavHome />

      <main>
        <Outlet />
      </main>

      <PiePagina />
    </>
  );
}