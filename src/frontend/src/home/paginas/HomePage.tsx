// Página pública de inicio del Sistema de Posgrado UTN FRLP.

import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section>
      <h1>Bienvenido al Sistema de Posgrado UTN FRLP</h1>

      <p>
        Gestioná tu inscripción, consultá tu estado académico y accedé a la
        información de tu carrera.
      </p>

      <Link to="/login">
        Iniciar sesión
      </Link>
    </section>
  );
}