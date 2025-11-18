import { Box, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMyVolunteerRegistrationsQuery } from "../../apis/volunteers.api";
import GenericTable from "../../components/ui/GenericTable";

function MyRegistrationsView() {
  const userId = useSelector((state) => state.user.id);
  const {
    data: registrations = [],
    isLoading,
    isError,
    error,
  } = useGetMyVolunteerRegistrationsQuery(userId);

  const columns = [
    {
      id: "campaign.name",
      label: "Campaña",
      render: (row) => row.campaign?.name || "N/A",
    },
    {
      id: "campaign.start_date",
      label: "Fecha",
      render: (row) => new Date(row.campaign?.start_date).toLocaleDateString(),
    },
    {
      id: "campaign.location",
      label: "Ubicación",
      render: (row) => row.campaign?.location || "N/A",
    },
    {
      id: "availability_hours",
      label: "Disponibilidad",
    },
    {
      id: "registered_at",
      label: "Registrado el",
      render: (row) => new Date(row.registered_at).toLocaleDateString(),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={0} sx={{ mb: 3, p: 2, bgcolor: "transparent" }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Mis Inscripciones
        </Typography>
        <Typography color="text.secondary">
          Campañas en las que estás registrado como voluntario
        </Typography>
      </Paper>

      <GenericTable
        title="Inscripciones como Voluntario"
        subtitle={`Total: ${registrations.length} inscripciones`}
        columns={columns}
        data={registrations}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </Box>
  );
}

export default MyRegistrationsView;
