import { baseApi } from "./base.api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login de usuario
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation } = authApi;
