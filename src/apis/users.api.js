// src/apis/users.api.js
import { baseApi } from "./base.api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([k, v]) => {
          if (v !== "" && v !== null && v !== undefined) params.append(k, v);
        });
        return {
          url: `/users?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
