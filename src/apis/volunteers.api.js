// src/apis/volunteers.api.js
import { baseApi } from "./base.api";

export const volunteersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyVolunteerRegistrations: builder.query({
      query: () => ({
        url: "/volunteers/me",
        method: "GET",
      }),
      providesTags: ["Volunteers"],
    }),

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
  useRegisterVolunteerMutation,
} = volunteersApi;
