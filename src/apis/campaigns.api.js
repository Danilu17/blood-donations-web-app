// src/apis/campaigns.api.js
import { baseApi } from "./base.api";

export const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCampaigns: builder.query({
      query: () => ({
        url: "/campaigns/public",
        method: "GET",
      }),
      providesTags: ["Campaigns"],
    }),

    getCampaigns: builder.query({
      query: () => ({
        url: "/campaigns",
        method: "GET",
      }),
      providesTags: ["Campaigns"],
    }),

    getCampaignById: builder.query({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "GET",
      }),
      providesTags: ["Campaigns"],
    }),

    createCampaign: builder.mutation({
      query: (body) => ({
        url: "/campaigns",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Campaigns"],
    }),

    enrollToCampaign: builder.mutation({
      query: ({ campaignId, schedule }) => ({
        url: `/campaigns/${campaignId}/enroll`,
        method: "POST",
        body: { schedule },
      }),
      invalidatesTags: ["Campaigns", "Enrollments"],
    }),
  }),
});

export const {
  useGetPublicCampaignsQuery,
  useGetCampaignsQuery,
  useGetCampaignByIdQuery,
  useCreateCampaignMutation,
  useEnrollToCampaignMutation,
} = campaignsApi;

// 🔁 Alias para compatibilidad con código viejo
export { useGetPublicCampaignsQuery as useGetActiveCampaignsQuery };
