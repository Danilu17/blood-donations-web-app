// src/services/certificateService.js
import api from "./api";

export async function downloadDonationCertificate(donationId) {
  // Descarga PDF de certificado para una donación específica
  const res = await api.get(`/certificates/donation/${donationId}`, {
    responseType: "blob",
  });

  const blob = new Blob([res], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `certificado-donacion-${donationId}.pdf`;
  link.click();
  window.URL.revokeObjectURL(url);
}
