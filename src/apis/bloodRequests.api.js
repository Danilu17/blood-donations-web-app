import { baseApi } from "./base.api";

export const bloodRequestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

    getMyBloodRequests: builder.query({
      query: (beneficiaryId) => {
        const params = new URLSearchParams({
          beneficiaryId: beneficiaryId,
          limit: "50",
          page: "0",
        });
        return `/blood-request?${params.toString()}`;
      },
      providesTags: ["BloodRequests"],
    }),

    createBloodRequest: builder.mutation({
      query: (body) => ({
        url: "/blood-request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["BloodRequests"],
    }),

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
