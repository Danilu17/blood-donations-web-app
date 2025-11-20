// src/apis/donations.api.js
import { baseApi } from "./base.api";

export const donationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyDonations: builder.query({
      query: ({ page = 1, limit = 5, ...filters } = {}) => ({
        url: "/donations/",
        method: "GET",
        params: {
          page,
          limit,
          date_from: filters.dateFrom,
          date_to: filters.dateTo,
          campaign: filters.campaign,
          center: filters.center,
          status: filters.status,
        },
      }),
    }),

    getDonationsByCampaign: builder.query({
      query: (campaignId) => ({
        url: `/donations/campaign/${campaignId}`,
        method: "GET",
      }),
      providesTags: ["Donations"],
    }),

    scheduleDonation: builder.mutation({
      query: (body) => ({
        url: "/donations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Donations"],
    }),

    completeDonation: builder.mutation({
      query: ({ id, units }) => ({
        url: `/donations/${id}/complete`,
        method: "PATCH",
        body: { units },
      }),
      invalidatesTags: ["Donations"],
    }),
  }),
});

export const {
  useGetMyDonationsQuery,
  useGetDonationsByCampaignQuery,
  useScheduleDonationMutation,
  useCompleteDonationMutation,
} = donationsApi;
