// src/apis/role-change.api.js
import { baseApi } from "./base.api";

export const roleChangeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Solicitar cambio de rol: el cuerpo debe contener
     * `{ requested_role: 'beneficiary' | 'organizer', justification?: string }`.
     * Se invalida la etiqueta `RoleChangeRequests` para recargar la lista tras enviar.
     */
    requestRoleChange: builder.mutation({
      query: ({ requested_role, justification }) => ({
        url: "/role-change/request",
        method: "POST",
        body: { requested_role, justification },
      }),
      invalidatesTags: ["RoleChangeRequests"],
    }),
    /**
     * Obtener mis solicitudes de cambio de rol.
     */
    getMyRoleChangeRequests: builder.query({
      query: () => ({ url: "/role-change/my-requests", method: "GET" }),
      providesTags: ["RoleChangeRequests"],
    }),
  }),
});

export const { useRequestRoleChangeMutation, useGetMyRoleChangeRequestsQuery } =
  roleChangeApi;
