// src/apis/reports.api.js
import { baseApi } from "./base.api";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Generar reporte de una campaña
    generateCampaignReport: builder.mutation({
      query: (campaignId) => ({
        url: `/reports/campaign/${campaignId}`,
        method: "GET",
      }),
      invalidatesTags: ["Reports"],
    }),
    // Generar resumen global de donaciones
    generateDonationsSummary: builder.mutation({
      query: () => ({
        url: `/reports/donations/summary`,
        method: "GET",
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

export const {
  useGenerateCampaignReportMutation,
  useGenerateDonationsSummaryMutation,
} = reportsApi;
