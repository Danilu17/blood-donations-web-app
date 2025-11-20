// src/pages/donor/MyEnrollmentsView.jsx
import { Box, Typography, Paper } from "@mui/material";
import GenericTable from "../../components/tables/GenericTable";

/**
 * Datos MOCK: inscripciones del donante a distintas campañas.
 * No depende del backend, es todo visual para el demo.
 */
const mockEnrollments = [
  {
    id: "enr-1",
    campaignName: "Campaña Hospital Central",
    date: "29/11/2025 08:35",
    location: "Hospital Juan A. Fernández, CABA",
    status: "CONFIRMADA",
    notes: "Presentarse 10 minutos antes.",
  },
  {
    id: "enr-2",
    campaignName: "Jornada de donación Clínica Sur",
    date: "10/12/2025 09:00",
    location: "Clínica Sur, Av. Siempre Viva 742",
    status: "LISTA DE ESPERA",
    notes: "En caso de liberarse un lugar se enviará aviso.",
  },
  {
    id: "enr-3",
    campaignName: "Colecta Escuela Técnica 37",
    date: "05/01/2026 14:30",
    location: "ET N°37 'Hogar Naval Stella Maris'",
    status: "CANCELADA",
    notes: "La campaña fue reprogramada.",
  },
];

const columns = [
  { id: "campaignName", label: "Campaña" },
  { id: "date", label: "Fecha y horario" },
  { id: "location", label: "Lugar" },
  {
    id: "status",
    label: "Estado",
    render: (row) => {
      const label = row.status || "PENDIENTE";
      let color = "#6b7280";

      if (label === "CONFIRMADA") color = "#16a34a";
      if (label === "CANCELADA") color = "#dc2626";
      if (label === "LISTA DE ESPERA") color = "#eab308";

      return <span style={{ color }}>{label}</span>;
    },
  },
  { id: "notes", label: "Notas" },
];

export default function MyEnrollmentsView() {
  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Mis inscripciones a campañas
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          borderRadius: 2,
          p: 2,
        }}
      >
        <GenericTable
          title="Inscripciones"
          subtitle="Aquí podés ver a qué campañas te inscribiste y el estado de cada una."
          columns={columns}
          data={mockEnrollments}
          isLoading={false}
          isError={false}
        />
      </Paper>
    </Box>
  );
}
