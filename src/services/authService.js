// src/services/authService.js
import api from "./api";

function saveSession(access_token, user) {
  if (access_token) localStorage.setItem("access_token", access_token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
}

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  const { access_token, user } = res;
  saveSession(access_token, user);
  return user;
}

export async function register(payload) {
  // payload debe incluir: nombre, apellido, dni, fecha_nacimiento, sexo, correo, teléfono, dirección, contraseña
  return api.post("/auth/register", payload);
}

export async function verifyEmail(token) {
  return api.get(`/auth/verify-email`, { params: { token } });
}

export async function forgotPassword(email) {
  return api.post("/auth/forgot-password", { email });
}

export async function resetPassword(token, newPassword) {
  return api.post("/auth/reset-password", {
    token,
    new_password: newPassword,
  });
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}
