// src/apis/roleChange.api.js
import { baseApi } from "./base.api";

export const roleChangeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ADMIN: listar solicitudes (puede filtrar por status)
    getRoleChangeRequests: builder.query({
      query: (params = {}) => {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            query.append(key, value);
          }
        });

        return `/role-change${query.toString() ? `?${query.toString()}` : ""}`;
      },
      providesTags: ["RoleChange"],
    }),

    // Usuario: ver sus propias solicitudes (por si lo usás en donor)
    getMyRoleChangeRequests: builder.query({
      query: () => `/role-change/my-requests`,
      providesTags: ["RoleChange"],
    }),

    // ADMIN: revisar solicitud
    reviewRoleChangeRequest: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/role-change/${id}/review`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["RoleChange", "Users"],
    }),
  }),
});

export const {
  useGetRoleChangeRequestsQuery,
  useGetMyRoleChangeRequestsQuery,
  useReviewRoleChangeRequestMutation,
} = roleChangeApi;
