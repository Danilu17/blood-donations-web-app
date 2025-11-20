// src/api/donations.api.js
import { baseApi } from "./base.api";

export const donationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Crear donación (organizador registra donación)
    createDonation: builder.mutation({
      query: (body) => ({
        url: "/donations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Donations"],
    }),

    // Opcional: listar donaciones de una campaña (si agregás filtro en backend)
    getDonationsByCampaign: builder.query({
      query: (campaignId) =>
        `/donations?campaignId=${encodeURIComponent(campaignId)}`,
      providesTags: ["Donations"],
    }),

    // Generar certificado para una donación ya creada
    generateCertificate: builder.mutation({
      query: (donationId) => ({
        url: `/donations/${donationId}/certificate`,
        method: "GET",
      }),
      invalidatesTags: ["Donations", "Certificates"],
    }),
  }),
});

export const {
  useCreateDonationMutation,
  useGetDonationsByCampaignQuery,
  useGenerateCertificateMutation,
} = donationsApi;
