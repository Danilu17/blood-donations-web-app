// src/services/centerService.js
import api from "./api";

export async function getCenters(params = {}) {
  return api.get("/centers", { params });
}
