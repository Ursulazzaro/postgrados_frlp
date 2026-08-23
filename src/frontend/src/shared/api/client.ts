// Cliente HTTP compartido para realizar solicitudes al backend.

const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const respuesta = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!respuesta.ok) {
    const error = await respuesta
      .json()
      .catch(() => ({ message: respuesta.statusText }));

    throw new Error(error.message ?? `Error ${respuesta.status}`);
  }

  return respuesta.json();
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: "DELETE",
    }),
};