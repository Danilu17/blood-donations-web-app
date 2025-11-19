// src/services/campaignService.js
import api from "./api";

export async function getPublicCampaigns(params = {}) {
  // Filtros básicos: fecha desde, estado, centro, etc.
  return api.get("/campaigns/public", { params });
}

export async function getMyCampaignEnrollments() {
  return api.get("/enrollments/me");
}

export async function enrollToCampaign(campaignId, timeSlot) {
  return api.post("/enrollments", {
    campaign_id: campaignId,
    time_slot: timeSlot,
  });
}
