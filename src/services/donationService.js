// src/services/donationService.js
import api from "./api";

export async function getMyDonations() {
  return api.get("/donations/me");
}
