// Proveedor global de autenticación para manejar el usuario y su sesión.

import { useState } from "react";
import { AuthContext, type AuthState } from "./useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthState | null>(null);

  const login = async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      throw new Error("El email y la contraseña son obligatorios");
    }

    setUser({
      email,
      rol: "COORDINADOR",
      token: "",
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}