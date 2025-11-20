import { baseApi } from "./base.api";

export const enrollmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEnrollment: builder.mutation({
      query: (body) => ({
        url: "/enrollments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Enrollments", "Campaigns"],
    }),

    getMyEnrollments: builder.query({
      query: (donorId) => {
        if (!donorId) return { url: "/enrollments" };
        const params = new URLSearchParams({
          limit: "50",
          page: "0",
        });
        return `/enrollments?${params.toString()}`;
      },
      providesTags: ["Enrollments"],
    }),

    getCampaignEnrollments: builder.query({
      query: (campaignId) => {
        if (!campaignId) return "/enrollments";
        const params = new URLSearchParams({
          campaignId: campaignId,
          limit: "100",
          page: "0",
        });
        return `/enrollments?${params.toString()}`;
      },
      providesTags: ["Enrollments"],
    }),

    cancelEnrollment: builder.mutation({
      query: (id) => ({
        url: `/enrollments/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Enrollments", "Campaigns"],
    }),

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
