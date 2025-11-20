import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import GenericTable from "../../components/tables/GenericTable";
import { useParams } from "react-router-dom";
import { useCampaignRegistrations } from "../../hooks/useCampaignRegistrations";

const RegistrationsView = () => {
  const { campaignId } = useParams();
  const { registrations, toggleAttendance } =
    useCampaignRegistrations(campaignId);

  const columns = [
    { id: "donorName", label: "Nombre" },
    { id: "donorEmail", label: "Correo" },
    { id: "bloodType", label: "Grupo" },
    { id: "eligibilityStatus", label: "Elegibilidad" },
    { id: "registrationDate", label: "Fecha inscripción" },
    {
      id: "attended",
      label: "Asistencia",
      render: (row) => (row.attended ? "✔ Asistió" : "Pendiente"),
    },
  ];

  const handleExport = () => {
    alert("Exportar lista (mock)");
  };

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Inscriptos en la campaña
      </Typography>

      <GenericTable
        title="Lista de inscriptos"
        subtitle="Aquí podés gestionar asistencia y revisar elegibilidad"
        columns={columns}
        data={registrations}
        isLoading={false}
        isError={false}
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

      {/* Acciones por cada registro */}
      <Paper variant="outlined" sx={{ mt: 3, p: 2, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Marcar asistencia
        </Typography>

        {registrations.map((reg) => (
          <Box
            key={reg.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#f9fafb",
              p: 1.5,
              borderRadius: 2,
              mb: 1,
            }}
          >
            <Typography>
              {reg.donorName} –{" "}
              <span style={{ color: "#6b7280" }}>{reg.donorEmail}</span>
            </Typography>

            <Button
              variant="contained"
              onClick={() => toggleAttendance(reg.id)}
              sx={{
                backgroundColor: reg.attended ? "#16a34a" : "#2563eb",
                "&:hover": {
                  backgroundColor: reg.attended ? "#15803d" : "#1d4ed8",
                },
                borderRadius: 2,
              }}
            >
              {reg.attended ? "Asistencia marcada" : "Marcar asistencia"}
            </Button>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default RegistrationsView;
