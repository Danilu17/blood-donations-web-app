// src/apis/donations.api.js
import { baseApi } from "./base.api";

export const donationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyDonations: builder.query({
      query: () => ({
        url: "/donations/me",
        method: "GET",
      }),
      providesTags: ["Donations"],
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
