// src/apis/notifications.api.js
import { baseApi } from "./base.api";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Obtener notificaciones del usuario autenticado
    getNotifications: builder.query({
      query: (unreadOnly = false) => ({
        url: `/notifications?unread=${unreadOnly}`,
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),
    // Marcar como leída
    markNotificationRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
    // Crear notificación (admin/organizador)
    createNotification: builder.mutation({
      query: (body) => ({
        url: `/notifications`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useCreateNotificationMutation,
} = notificationsApi;
