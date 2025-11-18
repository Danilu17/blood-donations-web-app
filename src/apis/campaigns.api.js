import { baseApi } from "./base.api";

export const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Crear campaña
    createCampaign: builder.mutation({
      query: (body) => ({
        url: `/campaigns`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["campaigns"],
    }),

    // Obtener todas las campañas
    getCampaigns: builder.query({
      query: () => ({
        url: `/campaigns`,
        method: "GET",
      }),
      providesTags: ["campaigns"],
    }),

    // Obtener campañas activas
    getActiveCampaigns: builder.query({
      query: () => ({
        url: `/campaigns/active`,
        method: "GET",
      }),
      providesTags: ["campaigns"],
    }),

    // Obtener campaña por ID
    getCampaignById: builder.query({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "GET",
      }),
      providesTags: ["campaigns"],
    }),

    // Registrar voluntario
    registerVolunteer: builder.mutation({
      query: (body) => ({
        url: `/campaigns/volunteers`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["campaigns", "volunteers"],
    }),

    // 📌 Agendar donación
    scheduleDonation: builder.mutation({
      query: (body) => ({
        url: `/donations/schedule`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["campaigns", "donations"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCampaignMutation,
  useGetCampaignsQuery,
  useGetActiveCampaignsQuery,
  useGetCampaignByIdQuery,
  useRegisterVolunteerMutation,
  useScheduleDonationMutation,
} = campaignsApi;
