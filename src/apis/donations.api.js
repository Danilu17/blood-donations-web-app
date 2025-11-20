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

    // Listar todas las donaciones (luego filtramos por campaña en el hook)
    getDonations: builder.query({
      query: () => ({
        url: "/donations",
        method: "GET",
      }),
      providesTags: ["Donations"],
    }),

    // Marcar donación como completada
    completeDonation: builder.mutation({
      query: ({ id, quantity_ml }) => ({
        url: `/donations/${id}/complete`,
        method: "PATCH",
        body: { quantity_ml },
      }),
      invalidatesTags: ["Donations"],
    }),

    // Generar certificado para una donación
    generateDonationCertificate: builder.mutation({
      query: (id) => ({
        url: `/donations/${id}/certificate`,
        method: "GET",
      }),
      invalidatesTags: ["Donations", "Certificates"],
    }),
  }),
});

export const {
  useCreateDonationMutation,
  useCompleteDonationMutation,
  useGetDonationsQuery,
  useGenerateCertificateMutation,
} = donationsApi;
