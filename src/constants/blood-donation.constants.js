export const BLOOD_TYPE_OPTIONS = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

export const USER_ROLE_OPTIONS = [
  { value: "donor", label: "Donante" },
  { value: "organizer", label: "Organizador" },
  { value: "volunteer", label: "Voluntario" },
];

export const CAMPAIGN_STATUS_OPTIONS = [
  { value: "scheduled", label: "Programada" },
  { value: "active", label: "Activa" },
  { value: "completed", label: "Completada" },
  { value: "cancelled", label: "Cancelada" },
];

export const DONATION_STATUS_OPTIONS = [
  { value: "scheduled", label: "Programada" },
  { value: "completed", label: "Completada" },
  { value: "cancelled", label: "Cancelada" },
  { value: "no_show", label: "No asistió" },
];

// Mapas para colores de chips
export const CAMPAIGN_STATUS_COLORS = {
  scheduled: "info",
  active: "success",
  completed: "default",
  cancelled: "error",
};

export const DONATION_STATUS_COLORS = {
  scheduled: "warning",
  completed: "success",
  cancelled: "error",
  no_show: "default",
};
