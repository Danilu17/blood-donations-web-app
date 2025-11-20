// src/apis/centers.api.js
import { baseApi } from "./base.api";

export const centersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCenters: builder.query({
      query: (params = {}) => {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            query.append(key, value);
          }
        });

        return `/centers${query.toString() ? `?${query.toString()}` : ""}`;
      },
      providesTags: ["Centers"],
    }),

    createCenter: builder.mutation({
      query: (body) => ({
        url: `/centers`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Centers"],
    }),

    updateCenter: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/centers/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Centers"],
    }),

    toggleCenter: builder.mutation({
      query: (id) => ({
        url: `/centers/${id}/toggle-active`,
        method: "PATCH",
      }),
      invalidatesTags: ["Centers"],
    }),

    deleteCenter: builder.mutation({
      query: (id) => ({
        url: `/centers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Centers"],
    }),
  }),
});

export const {
  useGetCentersQuery,
  useCreateCenterMutation,
  useUpdateCenterMutation,
  useToggleCenterMutation,
  useDeleteCenterMutation,
} = centersApi;
