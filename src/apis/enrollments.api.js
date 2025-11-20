// src/apis/enrollments.api.js
import { baseApi } from "./base.api";

export const enrollmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Donante: crear inscripción
    createEnrollment: builder.mutation({
      query: (body) => ({
        url: "/enrollments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Enrollments", "Campaigns"],
    }),

    // Donante: mis inscripciones
    getMyEnrollments: builder.query({
      query: (donorId) =>
        `/enrollments?donorId=${encodeURIComponent(donorId)}&limit=50&page=0`,
      providesTags: ["Enrollments"],
    }),

    // Organizador: inscripciones de una campaña
    getCampaignEnrollments: builder.query({
      query: (campaignId) =>
        `/enrollments?campaignId=${encodeURIComponent(
          campaignId,
        )}&limit=100&page=0`,
      providesTags: ["Enrollments"],
    }),

    // Donante: cancelar inscripción
    cancelEnrollment: builder.mutation({
      query: (id) => ({
        url: `/enrollments/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Enrollments", "Campaigns"],
    }),

    // Organizador: confirmar inscripción
    confirmEnrollment: builder.mutation({
      query: (id) => ({
        url: `/enrollments/${id}/confirm`,
        method: "PATCH",
      }),
      invalidatesTags: ["Enrollments", "Campaigns"],
    }),
  }),
});

export const {
  useCreateEnrollmentMutation,
  useGetMyEnrollmentsQuery,
  useGetCampaignEnrollmentsQuery,
  useCancelEnrollmentMutation,
  useConfirmEnrollmentMutation,
} = enrollmentsApi;
