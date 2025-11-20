// src/apis/bloodRequests.api.js
import { baseApi } from "./base.api";

export const bloodRequestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ORGANIZADOR / ADMIN: listar solicitudes con filtros
    getBloodRequests: builder.query({
      query: (params = {}) => {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            query.append(key, value);
          }
        });

        return `/blood-request${query.toString() ? `?${query.toString()}` : ""}`;
      },
      providesTags: ["BloodRequests"],
    }),

    // BENEFICIARIO: listar MIS solicitudes
    // Ajustá el nombre del parámetro al que espera tu FilterBloodRequestDto
    // Ejemplo: beneficiaryId, requesterId, etc.
    getMyBloodRequests: builder.query({
      query: (beneficiaryId) =>
        `/blood-request?beneficiaryId=${encodeURIComponent(
          beneficiaryId,
        )}&limit=50&page=0`,
      providesTags: ["BloodRequests"],
    }),

    // BENEFICIARIO: crear nueva solicitud
    createBloodRequest: builder.mutation({
      query: (body) => ({
        url: "/blood-request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["BloodRequests"],
    }),

    // ORGANIZADOR / ADMIN: actualizar estado / notas
    updateBloodRequest: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/blood-request/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["BloodRequests"],
    }),
  }),
});

export const {
  useGetBloodRequestsQuery,
  useGetMyBloodRequestsQuery,
  useCreateBloodRequestMutation,
  useUpdateBloodRequestMutation,
} = bloodRequestsApi;
