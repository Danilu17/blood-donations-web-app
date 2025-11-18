// src/mocks/campaigns.mocks.js
export const MOCK_CAMPAIGN_STATUS = {
  ACTIVE: "ACTIVE",
  FINISHED: "FINISHED",
  CANCELED: "CANCELED",
};
export const MOCK_CAMPAIGNS = [
  {
    id: "camp-1",
    name: "Campaña Hospital Argerich",
    centerName: "Hospital Argerich",
    address: "Pi y Margall 750, CABA",
    date: "2025-12-10",
    startTime: "09:00",
    endTime: "14:00",
    requiredBloodTypes: ["0+", "A+"],
    minAge: 18,
    maxAge: 65,
    minWeight: 50,
    slotsTotal: 50,
    slotsTaken: 32,
    status: "ACTIVE",
    description: "Donación de sangre total para pacientes en cirugía.",
  },
  {
    id: "camp-2",
    name: "Donación Universidad de Buenos Aires",
    centerName: "FIUBA - Paseo Colón",
    address: "Av. Paseo Colón 850, CABA",
    date: "2025-12-18",
    startTime: "10:00",
    endTime: "16:00",
    requiredBloodTypes: ["0-", "A-", "B-"],
    minAge: 18,
    maxAge: 65,
    minWeight: 50,
    slotsTotal: 80,
    slotsTaken: 65,
    status: "ACTIVE",
    description:
      "Actividad voluntaria para fortalecer el banco público de sangre.",
  },
];
