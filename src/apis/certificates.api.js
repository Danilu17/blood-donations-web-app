// src/apis/certificates.api.js
import { baseApi } from "./base.api";

export const certificatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Descargar un certificado existente por su ID
    downloadCertificate: builder.query({
      query: (certificateId) => ({
        url: `/certificates/${certificateId}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
      providesTags: ["Certificates"],
    }),
  }),
});

export const { useDownloadCertificateQuery, useLazyDownloadCertificateQuery } =
  certificatesApi;
