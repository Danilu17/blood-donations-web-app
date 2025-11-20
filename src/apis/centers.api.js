import { baseApi } from "./base.api";

export const centersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCenters: builder.query({
      query: () => ({
        url: "/centers",
        method: "GET",
      }),
      providesTags: ["Centers"],
    }),
  }),
});

export const { useGetCentersQuery } = centersApi;
