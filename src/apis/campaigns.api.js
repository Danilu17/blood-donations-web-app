// src/apis/campaigns.api.js
import { baseApi } from "./base.api";

export const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: (params = {}) => {
        const query = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            query.append(key, value);
          }
        });

        return `/campaigns${query.toString() ? `?${query.toString()}` : ""}`;
      },
      providesTags: ["Campaigns"],
    }),

    getCampaignById: builder.query({
      query: (id) => `/campaigns/${id}`,
      providesTags: (result, error, id) => [{ type: "Campaigns", id }],
    }),

    createCampaign: builder.mutation({
      query: (body) => ({
        url: "/campaigns",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Campaigns"],
    }),

    updateCampaign: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/campaigns/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Campaigns",
        { type: "Campaigns", id },
      ],
    }),

    completeCampaign: builder.mutation({
      query: (id) => ({
        url: `/campaigns/${id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["Campaigns"],
    }),

    cancelCampaign: builder.mutation({
      query: (id) => ({
        url: `/campaigns/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Campaigns"],
    }),
  }),
});

export const {
  useGetCampaignsQuery,
  useGetCampaignByIdQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useCompleteCampaignMutation,
  useCancelCampaignMutation,
} = campaignsApi;
