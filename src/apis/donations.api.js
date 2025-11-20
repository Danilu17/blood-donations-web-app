import { baseApi } from "./base.api";

export const donationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDonation: builder.mutation({
      query: (body) => ({
        url: "/donations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Donations"],
    }),

    getDonations: builder.query({
      query: (params = {}) => {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            query.append(key, value);
          }
        });
        return `/donations${query.toString() ? `?${query.toString()}` : ""}`;
      },
      providesTags: ["Donations"],
    }),

    completeDonation: builder.mutation({
      query: ({ id, quantity_ml }) => ({
        url: `/donations/${id}/complete`,
        method: "PATCH",
        body: { quantity_ml },
      }),
      invalidatesTags: ["Donations"],
    }),

    generateDonationCertificate: builder.mutation({
      query: (id) => ({
        url: `/donations/${id}/certificate`,
        method: "GET",
      }),
      invalidatesTags: ["Donations", "Certificates"],
    }),
  }),
});

export const {
  useCreateDonationMutation,
  useCompleteDonationMutation,
  useGetDonationsQuery,
  useGenerateDonationCertificateMutation,
} = donationsApi;
