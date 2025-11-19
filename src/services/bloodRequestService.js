// src/services/bloodRequestService.js
import api from "./api";

export async function createBloodRequest(payload) {
  // payload: { blood_type, rh_factor, units, center_id, urgency, estimated_date, notes? }
  return api.post("/blood-requests", payload);
}

export async function getMyBloodRequests() {
  return api.get("/blood-requests/me");
}
