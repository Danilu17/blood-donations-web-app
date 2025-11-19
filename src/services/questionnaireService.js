// src/services/questionnaireService.js
import api from "./api";

export async function createHealthQuestionnaire(payload) {
  // payload: { weight, diseases, medication, last_donation_date, blood_type, rh_factor, ... }
  return api.post("/health-questionnaire", payload);
}

export async function getMyLastQuestionnaire() {
  return api.get("/health-questionnaire/me/last");
}

export async function getMyQuestionnaireHistory() {
  return api.get("/health-questionnaire/me/history");
}
