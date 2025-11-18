import { baseApi } from "./base.api";

export const volunteersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Obtener mis inscripciones como voluntario
    getMyVolunteerRegistrations: builder.query({
      query: (volunteerId) => ({
        url: `/campaigns/volunteers/user/${volunteerId}`,
        method: "GET",
      }),
      providesTags: ["volunteers"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyVolunteerRegistrationsQuery } = volunteersApi;
