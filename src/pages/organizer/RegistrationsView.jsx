// src/pages/organizer/RegistrationsView.jsx
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import GenericTable from "../../components/tables/GenericTable";
import { useParams } from "react-router-dom";
import { useCampaignRegistrations } from "../../hooks/useCampaignRegistrations";

const RegistrationsView = () => {
  const { campaignId } = useParams();
  const { registrations, isLoading, isError, handleConfirm, handleCancel } =
    useCampaignRegistrations(campaignId);

  const columns = [
    { id: "donorName", label: "Nombre" },
    { id: "donorEmail", label: "Correo" },
    { id: "bloodType", label: "Grupo" },
    { id: "eligibilityStatus", label: "Elegibilidad" },
    { id: "registrationDate", label: "Fecha inscripción" },
    {
      id: "status",
      label: "Estado",
      render: (row) => {
        const label = row.status || "PENDING";
        let color = "#6b7280";

        if (label === "CONFIRMED") color = "#16a34a";
        if (label === "CANCELLED") color = "#dc2626";
        if (label === "WAITING_LIST") color = "#eab308";

        return <span style={{ color }}>{label}</span>;
      },
    },
  ];

  const handleExport = () => {
    // TODO: implementar export real (CSV/PDF) más adelante
    alert("Exportar lista (mock)");
  };

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Inscriptos en la campaña
      </Typography>

      <GenericTable
        title="Lista de inscriptos"
        subtitle="Aquí podés aprobar o rechazar inscripciones"
        columns={columns}
        data={registrations}
        isLoading={isLoading}
        isError={isError}
      />

      <Stack direction="row" mt={3} gap={2}>
        <Button
          variant="outlined"
          onClick={handleExport}
          sx={{
            borderColor: "#2563eb",
            color: "#2563eb",
            "&:hover": {
              backgroundColor: "#eff6ff",
              borderColor: "#1d4ed8",
              color: "#1d4ed8",
            },
          }}
        >
          Exportar lista
        </Button>
      </Stack>

      {/* Acciones por cada inscripción */}
      <Paper variant="outlined" sx={{ mt: 3, p: 2, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Gestionar inscripciones
        </Typography>

        {registrations.length === 0 && !isLoading && (
          <Typography color="text.secondary">
            Todavía no hay inscriptos para esta campaña.
          </Typography>
        )}

        {registrations.map((reg) => (
          <Box
            key={reg.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#f9fafb",
              p: 1.5,
              borderRadius: 2,
              mb: 1,
            }}
          >
            <Box>
              <Typography fontWeight={500}>{reg.donorName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {reg.donorEmail} – {reg.bloodType} –{" "}
                <strong>{reg.eligibilityStatus}</strong>
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleConfirm(reg.id)}
                disabled={reg.status === "CONFIRMED"}
                sx={{
                  backgroundColor: "#16a34a",
                  "&:hover": { backgroundColor: "#15803d" },
                  borderRadius: 2,
                }}
              >
                {reg.status === "CONFIRMED" ? "Confirmado" : "Aprobar"}
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={() => handleCancel(reg.id)}
                disabled={reg.status === "CANCELLED"}
                sx={{
                  borderColor: "#dc2626",
                  color: "#dc2626",
                  "&:hover": {
                    backgroundColor: "#fef2f2",
                    borderColor: "#b91c1c",
                    color: "#b91c1c",
                  },
                  borderRadius: 2,
                }}
              >
                {reg.status === "CANCELLED" ? "Cancelada" : "Cancelar"}
              </Button>
            </Stack>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default RegistrationsView;
