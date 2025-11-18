import { baseApi } from "./base.api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Registro de usuarios
    registerUser: builder.mutation({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),

    // Obtener todos los usuarios
    getUsers: builder.query({
      query: ({ role = "", bloodType = "", limit = 100, page = 1 } = {}) => {
        const params = new URLSearchParams();
        if (role) params.append("role", role);
        if (bloodType) params.append("bloodType", bloodType);
        if (limit) params.append("limit", limit.toString());
        if (page) params.append("page", page.toString());

        const queryString = params.toString();
        return {
          url: `/users${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),

    // Obtener usuario por ID
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    // Obtener donantes
    getDonors: builder.query({
      query: () => ({
        url: `/users?role=donor`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    // Obtener organizadores
    getOrganizers: builder.query({
      query: () => ({
        url: `/users?role=organizer`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetDonorsQuery,
  useGetOrganizersQuery,
} = usersApi;
