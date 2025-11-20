// src/apis/ranking.api.js
import { baseApi } from "./base.api";

export const rankingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Ranking global
    getRanking: builder.query({
      query: () => ({
        url: `/ranking`,
        method: "GET",
      }),
      providesTags: ["Ranking"],
    }),
    // Ranking del usuario autenticado
    getMyRanking: builder.query({
      query: () => ({
        url: `/ranking/me`,
        method: "GET",
      }),
      providesTags: ["Ranking"],
    }),
  }),
});

export const { useGetRankingQuery, useGetMyRankingQuery } = rankingApi;
