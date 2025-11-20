// src/apis/volunteers.api.js
import { baseApi } from "./base.api";

export const volunteersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Para no romper código existente: devuelve la lista completa
    getMyVolunteerRegistrations: builder.query({
      query: () => ({
        url: "/volunteers",
        method: "GET",
      }),
      providesTags: ["Volunteers"],
    }),

    // Endpoint más genérico: listar voluntarios (ADMIN / ORGANIZER)
    getVolunteers: builder.query({
      query: () => ({
        url: "/volunteers",
        method: "GET",
      }),
      providesTags: ["Volunteers"],
    }),

    // ADMIN: convertir usuario en voluntario
    registerVolunteer: builder.mutation({
      query: (body) => ({
        url: "/volunteers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Volunteers", "Campaigns"],
    }),
  }),
});

export const {
  useGetMyVolunteerRegistrationsQuery,
  useGetVolunteersQuery,
  useRegisterVolunteerMutation,
} = volunteersApi;
