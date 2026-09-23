// Proveedor global de autenticación para manejar el usuario y su sesión.

import { useState } from "react";
import { AuthContext, type AuthState } from "./useAuth";
import type { Rol } from "../../shared/tipos";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthState | null>(null);

  const login = async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      throw new Error("El email y la contraseña son obligatorios");
    }

    // Asignación de rol mockeada según el email para pruebas
    let rolAsignado: Rol = "ESTUDIANTE"; // Por defecto estudiante
    
    if (email.toLowerCase().includes("docente")) {
      rolAsignado = "DOCENTE";
    } else if (email.toLowerCase().includes("admin") || email.toLowerCase().includes("coordinador")) {
      rolAsignado = "COORDINADOR";
    }

    setUser({
      email,
      rol: rolAsignado,
      token: "mock-jwt-token",
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
