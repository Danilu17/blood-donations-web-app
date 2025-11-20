// src/mocks/mockBackend.js
// Este módulo simula un backend en memoria para que la aplicación
// funcione sin necesidad de llamar a servicios remotos. Se utiliza
// para almacenar campañas, inscripciones, donaciones, cuestionarios y
// centros de donación. Todos los datos se mantienen en memoria para la
// sesión actual; si deseas persistirlos, podrías almacenar `mockDB` en
// localStorage.

// Base de datos simulada. Puedes agregar más objetos según tus
// necesidades. Algunos campos están predefinidos para facilitar las
// operaciones iniciales (por ejemplo, centros de donación y usuarios
// de prueba). Se utilizan strings para los IDs por simplicidad.
const mockDB = {
  // Centros de donación disponibles
  centers: [
    {
      id: "c1",
      name: "Hospital Central",
      address: "Av. Rivadavia 1234, Ciudad",
      openingHours: "08:00 - 16:00",
      capacity: 50,
      contact: "011-1234-5678",
    },
    {
      id: "c2",
      name: "Clínica Sur",
      address: "Calle 9 de Julio 567, Ciudad",
      openingHours: "09:00 - 15:00",
      capacity: 30,
      contact: "011-9876-5432",
    },
  ],
  // Campañas creadas por organizadores
  campaigns: [],
  // Inscripciones a campañas (donantes)
  enrollments: [],
  // Donaciones realizadas y programadas
  donations: [],
  // Cuestionarios de salud enviados por los donantes
  questionnaires: [],
  // Voluntarios registrados
  volunteers: [],
};

/**
 * Genera un ID único simple. Para un entorno de producción sería mejor
 * utilizar bibliotecas como uuid, pero `crypto.randomUUID` es
 * suficiente para este prototipo.
 */
function generateId(prefix = "id") {
  return `${prefix}-${crypto.randomUUID()}`;
}

// ==== Centros ====
/**
 * Devuelve la lista de centros de donación.
 */
export function getCenters() {
  return mockDB.centers.slice();
}

// ==== Campañas ====
/**
 * Crea una nueva campaña y la agrega a la base de datos simulada.
 * Devuelve la campaña creada.
 */
export function createCampaign(data) {
  const campaign = {
    id: generateId("campaign"),
    name: data.name,
    description: data.description || "",
    centerId: data.center_id || null,
    center: mockDB.centers.find((c) => c.id === data.center_id) || null,
    campaignDate: data.campaign_date,
    startTime: data.start_time,
    endTime: data.end_time,
    minAge: data.min_age ?? null,
    maxAge: data.max_age ?? null,
    minWeight: data.min_weight ?? null,
    requiredBloodTypes: data.required_blood_types ?? [],
    maxDonors: data.max_donors ?? null,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  };
  mockDB.campaigns.push(campaign);
  return campaign;
}

/**
 * Devuelve todas las campañas. Opcionalmente puede filtrar por
 * organizador, fecha, etc. Para simplificar, este prototipo devuelve
 * todas las campañas activas ordenadas por fecha de creación.
 */
export function getCampaigns() {
  return mockDB.campaigns.slice().sort((a, b) => {
    return new Date(a.campaignDate) - new Date(b.campaignDate);
  });
}

// ==== Cuestionarios de salud ====
/**
 * Guarda un cuestionario de salud para un usuario. Cada cuestionario
 * contiene el ID del usuario y la fecha en que se envió.
 */
export function createHealthQuestionnaire(userId, body) {
  const questionnaire = {
    id: generateId("questionnaire"),
    userId,
    weight: body.weight ?? null,
    diseases: body.diseases ?? [],
    medications: body.medications ?? [],
    lastDonation: body.last_donation ?? null,
    bloodGroup: body.blood_group ?? null,
  };
  mockDB.questionnaires.push(questionnaire);
  return questionnaire;
}

/**
 * Obtiene el último cuestionario enviado por un usuario, si existe.
 */
export function getLastHealthQuestionnaire(userId) {
  const items = mockDB.questionnaires.filter((q) => q.userId === userId);
  if (items.length === 0) return null;
  return items[items.length - 1];
}

// ==== Enrollments (inscripciones) ====
/**
 * Devuelve las inscripciones a campañas. Si se pasa un ID de campaña,
 * filtra las inscripciones para esa campaña. Cada inscripción contiene
 * los datos del donante y su estado (PENDING, CONFIRMED, CANCELLED,
 * WAITING_LIST).
 */
export function getCampaignEnrollments(campaignId) {
  const raw = mockDB.enrollments.filter((e) => {
    return campaignId ? e.campaignId === campaignId : true;
  });
  return raw;
}

/**
 * Agrega una nueva inscripción de un donante a una campaña. No se
 * realizan validaciones de cupo ni elegibilidad en este prototipo.
 */
export function registerForCampaign({ campaignId, donorId }) {
  const enrollment = {
    id: generateId("enroll"),
    campaignId,
    donorId,
    status: "PENDING",
    created_at: new Date().toISOString(),
    // Información del donante simplificada; para un prototipo se
    // podrían obtener más datos del usuario.
    donor: {
      id: donorId,
      full_name: `Donante ${donorId}`,
      email: `donante${donorId}@example.com`,
      blood_type: "O",
      rh_factor: "+",
      eligibility_status: "DESCONOCIDO",
    },
  };
  mockDB.enrollments.push(enrollment);
  return enrollment;
}

/**
 * Confirma una inscripción cambiando su estado a CONFIRMED.
 */
export function confirmEnrollment(id) {
  const enrollment = mockDB.enrollments.find((e) => e.id === id);
  if (enrollment) enrollment.status = "CONFIRMED";
  return enrollment;
}

/**
 * Cancela una inscripción cambiando su estado a CANCELLED.
 */
export function cancelEnrollment(id) {
  const enrollment = mockDB.enrollments.find((e) => e.id === id);
  if (enrollment) enrollment.status = "CANCELLED";
  return enrollment;
}

// ==== Donaciones ====
/**
 * Devuelve la lista completa de donaciones. Si se pasa un ID de
 * campaña, filtra las donaciones asociadas a esa campaña.
 */
export function getDonations(campaignId) {
  const raw = mockDB.donations.filter((d) => {
    return campaignId ? d.campaignId === campaignId : true;
  });
  return raw;
}

/**
 * Marca una donación como completada y asigna la cantidad donada en
 * mililitros. Si la donación no existe, devuelve null.
 */
export function completeDonation(id, quantity_ml = 450) {
  const donation = mockDB.donations.find((d) => d.id === id);
  if (!donation) return null;
  donation.status = "COMPLETED";
  donation.quantity_ml = quantity_ml;
  donation.actual_date = new Date().toISOString().split("T")[0];
  donation.certificate_id = generateId("cert");
  return donation;
}

/**
 * Marca una donación como cancelada. Útil para prototipos donde un
 * organizador rechaza la donación de un inscrito. Si la donación no
 * existe, devuelve null.
 */
export function cancelDonation(id) {
  const donation = mockDB.donations.find((d) => d.id === id);
  if (!donation) return null;
  donation.status = "CANCELLED";
  return donation;
}

/**
 * Genera un certificado (simulado) para una donación. No crea un PDF,
 * solo devuelve los datos del certificado que se podrían mostrar.
 */
export function generateCertificate(id) {
  const donation = mockDB.donations.find((d) => d.id === id);
  if (!donation || donation.status !== "COMPLETED") return null;
  return {
    certificateId: donation.certificate_id,
    donationId: donation.id,
    donor: {
      name: donation.donorName || `Donante ${donation.donorId}`,
      bloodType: donation.bloodType || "O+",
      email: donation.donorEmail || `${donation.donorId}@example.com`,
    },
    campaign: {
      name: donation.campaignName || "Campaña",
      location: donation.campaignLocation || "Centro",
      address: donation.campaignAddress || "Dirección",
    },
    donationDetails: {
      date: donation.actual_date,
      scheduledDate: donation.scheduled_date,
      scheduledTime: donation.scheduled_time,
      quantityMl: donation.quantity_ml,
    },
    generatedAt: new Date().toISOString(),
  };
}

// ==== Donaciones programadas ====
/**
 * Programa una nueva donación. Se usa cuando un donante se inscribe a
 * una campaña y se confirma su participación. En este prototipo, la
 * donación se crea como PENDING y se marca como completada a través
 * de `completeDonation`.
 */
export function createDonation({
  campaignId,
  donorId,
  scheduled_date,
  scheduled_time,
}) {
  const donation = {
    id: generateId("donation"),
    campaignId,
    donorId,
    scheduled_date,
    scheduled_time,
    status: "PENDING",
    created_at: new Date().toISOString(),
    // Para simplificar, guardamos algunos datos redundantes para
    // mostrar en tablas sin tener que hacer joins.
    donorName: `Donante ${donorId}`,
    donorEmail: `${donorId}@example.com`,
    bloodType: "O+",
    campaignName: mockDB.campaigns.find((c) => c.id === campaignId)?.name || "",
    campaignLocation:
      mockDB.campaigns.find((c) => c.id === campaignId)?.center?.name || "",
    campaignAddress:
      mockDB.campaigns.find((c) => c.id === campaignId)?.center?.address || "",
  };
  mockDB.donations.push(donation);
  return donation;
}

// ==== Voluntariado ====
/**
 * Registra a un usuario como voluntario para una campaña. En este
 * prototipo se crea un registro en la lista `volunteers`.
 */
export function registerVolunteer({
  volunteerId,
  campaignId,
  availability_hours,
  special_skills,
}) {
  const volunteer = {
    id: generateId("volunteer"),
    volunteerId,
    campaignId,
    availability_hours,
    special_skills,
    created_at: new Date().toISOString(),
  };
  mockDB.volunteers.push(volunteer);
  return volunteer;
}

/**
 * Devuelve las campañas en las que está registrado un voluntario.
 */
export function getMyVolunteerRegistrations(volunteerId) {
  return mockDB.volunteers.filter((v) => v.volunteerId === volunteerId);
}

// ==== Exportación por defecto ====
export default {
  getCenters,
  createCampaign,
  getCampaigns,
  createHealthQuestionnaire,
  getLastHealthQuestionnaire,
  getCampaignEnrollments,
  registerForCampaign,
  confirmEnrollment,
  cancelEnrollment,
  getDonations,
  completeDonation,
  cancelDonation,
  generateCertificate,
  createDonation,
  registerVolunteer,
  getMyVolunteerRegistrations,
};
