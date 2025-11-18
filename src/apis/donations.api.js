import { baseApi } from "./base.api";

export const donationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Programar donación
    scheduleDonation: builder.mutation({
      query: (body) => ({
        url: `/donations`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["donations", "campaigns"],
    }),

    // Obtener todas las donaciones
    getDonations: builder.query({
      query: () => ({
        url: `/donations`,
        method: "GET",
      }),
      providesTags: ["donations"],
    }),

    // Obtener donaciones por donante
    getDonationsByDonor: builder.query({
      query: (donorId) => ({
        url: `/donations/donor/${donorId}`,
        method: "GET",
      }),
      providesTags: ["donations"],
    }),

    // Completar donación
    completeDonation: builder.mutation({
      query: ({ id, quantity_ml }) => ({
        url: `/donations/${id}/complete`,
        method: "PATCH",
        body: { quantity_ml },
      }),
      invalidatesTags: ["donations"],
    }),

    // Generar certificado
    generateCertificate: builder.query({
      query: (donationId) => ({
        url: `/donations/${donationId}/certificate`,
        method: "GET",
      }),
      providesTags: ["certificates"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useScheduleDonationMutation,
  useGetDonationsQuery,
  useGetDonationsByDonorQuery,
  useCompleteDonationMutation,
  useGenerateCertificateQuery,
} = donationsApi;
