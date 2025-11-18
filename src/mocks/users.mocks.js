// src/mocks/users.mocks.js

export const MOCK_USERS = [
  {
    id: "donor-id-123",
    role: "donor",
    name: "Juan Donante",
    email: "donor@example.com",
    password: "password",
    bloodType: "O+",
    eligibilityStatus: "APTO",
    points: 120,
    level: "PLATA",
  },
  {
    id: "organizer-id-123",
    role: "organizer",
    name: "María Organizadora",
    email: "organizer@example.com",
    password: "password",
    bloodType: "A+",
  },
  {
    id: "volunteer-id-123",
    role: "volunteer",
    name: "Carlos Voluntario",
    email: "volunteer@example.com",
    password: "password",
    bloodType: "B+",
  },
];
