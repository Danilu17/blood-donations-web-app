import { baseApi } from "./base.api";

export const bloodRequestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBloodRequests: builder.query({
      query: () => ({
        url: "/blood-requests/me",
        method: "GET",
      }),
      providesTags: ["Requests"],
    }),

    createBloodRequest: builder.mutation({
      query: (body) => ({
        url: "/blood-requests",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Requests"],
    }),
  }),
});

export const { useGetMyBloodRequestsQuery, useCreateBloodRequestMutation } =
  bloodRequestsApi;
