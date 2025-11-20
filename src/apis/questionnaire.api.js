// src/apis/questionnaire.api.js
import { baseApi } from "./base.api";

export const questionnaireApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Donante: crear / actualizar cuestionario de salud
    createQuestionnaire: builder.mutation({
      query: (body) => ({
        // BACKEND: POST /api/health-questionnaire
        url: "/health-questionnaire",
        method: "POST",
        body,
      }),
      invalidatesTags: ["HealthQuestionnaire"],
    }),

    // Donante: obtener mi último cuestionario / estado de elegibilidad
    getMyLastQuestionnaire: builder.query({
      // BACKEND: GET /api/health-questionnaire/my-status
      query: () => "/health-questionnaire/my-status",
      providesTags: ["HealthQuestionnaire"],
    }),

    // (opcional) ver todo mi historial de cuestionarios
    getMyQuestionnaires: builder.query({
      // BACKEND: GET /api/health-questionnaire/my-questionnaires
      query: () => "/health-questionnaire/my-questionnaires",
      providesTags: ["HealthQuestionnaire"],
    }),
  }),
});

export const {
  useCreateQuestionnaireMutation,
  useGetMyLastQuestionnaireQuery,
  useGetMyQuestionnairesQuery,
} = questionnaireApi;
