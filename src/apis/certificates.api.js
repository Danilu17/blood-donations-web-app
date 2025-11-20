// src/apis/certificates.api.js
import { baseApi } from "./base.api";

export const certificatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    downloadCertificate: builder.query({
      query: (donationId) => ({
        url: `/certificates/${donationId}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
      providesTags: ["Certificates"],
    }),
  }),
});

export const { useDownloadCertificateQuery, useLazyDownloadCertificateQuery } =
  certificatesApi;
