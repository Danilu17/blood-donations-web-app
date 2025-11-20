// src/services/authService.js
import api from "./api";

function saveSession(access_token, user) {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("user", JSON.stringify(user));
}

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });

  const { access_token, user } = res.data.data; // ✔️ Correcto

  saveSession(access_token, user);
  return user; // ✔️ devuelve solo el user
}

export async function register(payload) {
  return api.post("/auth/register", payload);
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
