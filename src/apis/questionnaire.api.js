import { baseApi } from "./base.api";

export const questionnaireApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyLastQuestionnaire: builder.query({
      query: () => ({
        url: "/questionnaire/me/last",
        method: "GET",
      }),
      providesTags: ["Questionnaire"],
    }),

    createHealthQuestionnaire: builder.mutation({
      query: (body) => ({
        url: "/questionnaire",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Questionnaire"],
    }),
  }),
});

export const {
  useGetMyLastQuestionnaireQuery,
  useCreateHealthQuestionnaireMutation,
} = questionnaireApi;
