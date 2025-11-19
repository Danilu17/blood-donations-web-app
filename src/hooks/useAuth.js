// src/hooks/useAuth.js
import { useMemo } from "react";

export function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function useAuth() {
  const user = useMemo(() => getStoredUser(), []);
  const isAuthenticated = !!user;

  const roles = user?.roles || user?.role || []; // depende de cómo lo devuelva tu backend

  return { user, isAuthenticated, roles };
}
