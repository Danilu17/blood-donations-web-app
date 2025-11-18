import { Box, Paper, Typography } from "@mui/material";
import GenericTable from "../../components/GenericTable";
import { useNavigate } from "react-router-dom";
import { useOrganizerCampaigns } from "../../hooks/useOrganizerCampaigns";
import CampaignDetails from "./CampaignDetails";

const MyCampaignsView = () => {
  const navigate = useNavigate();
  const { campaigns, selectedCampaign, handleSelect } = useOrganizerCampaigns();

  const columns = [
    { id: "name", label: "Campaña" },
    { id: "date", label: "Fecha" },
    {
      id: "horario",
      label: "Horario",
      render: (row) => `${row.startTime} - ${row.endTime}`,
    },
    {
      id: "slots",
      label: "Cupos",
      render: (row) => `${row.slotsTaken}/${row.slotsTotal}`,
    },
    { id: "status", label: "Estado" },
  ];

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Mis Campañas
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Aquí podés ver todas las campañas que creaste, revisar sus estados y
        administrar inscriptos.
      </Typography>

      <GenericTable
        title="Lista de campañas"
        subtitle="Selecciona una campaña para ver más detalles"
        columns={columns}
        data={campaigns}
        isLoading={false}
        isError={false}
        onRowClick={handleSelect}
        addButton={{
          label: "Crear campaña",
          onClick: () => navigate("/organizer/create-campaign"),
        }}
      />

      {/* Detalles */}
      {selectedCampaign && (
        <Paper
          sx={{ mt: 3, p: 2, borderRadius: 2 }}
          elevation={0}
          variant="outlined"
        >
          <CampaignDetails campaign={selectedCampaign} />
        </Paper>
      )}
    </Box>
  );
};

export default MyCampaignsView;
