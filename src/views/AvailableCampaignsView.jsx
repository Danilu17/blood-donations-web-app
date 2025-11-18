import { useState } from "react";
import { Box, Typography, Paper, Button, Stack } from "@mui/material";
import GenericTable from "../components/GenericTable";
import { MOCK_CAMPAIGNS } from "../mocks/campaigns.mocks";

function AvailableCampaignsView() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campaigns = MOCK_CAMPAIGNS.filter((c) => c.status === "ACTIVE");

  const columns = [
    { id: "name", label: "Campaña" },
    { id: "centerName", label: "Centro" },
    { id: "address", label: "Dirección" },
    { id: "date", label: "Fecha" },
    {
      id: "time",
      label: "Horario",
      render: (row) => `${row.startTime} - ${row.endTime}`,
    },
    {
      id: "slots",
      label: "Cupos",
      render: (row) => `${row.slotsTaken}/${row.slotsTotal}`,
    },
  ];

  const handleRowClick = (row) => {
    setSelectedCampaign(row);
  };

  const handleEnroll = () => {
    if (!selectedCampaign) return;
    alert(`Te inscribiste a la campaña: ${selectedCampaign.name}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Campañas de donación activas
      </Typography>
      <Typography color="text.secondary" mb={2}>
        Consultá todas las campañas disponibles, verificá requisitos y reservá
        tu turno.
      </Typography>

      <GenericTable
        title="Campañas activas"
        subtitle="Listado de todas las campañas de donación disponibles"
        columns={columns}
        data={campaigns}
        isLoading={false}
        isError={false}
        onRowClick={handleRowClick}
      />

      <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
        <Button
          variant="contained"
          disabled={!selectedCampaign}
          onClick={handleEnroll}
        >
          Reservar turno
        </Button>
      </Stack>

      {selectedCampaign && (
        <Paper sx={{ p: 2, mt: 2 }} elevation={0} variant="outlined">
          <Typography variant="h6" fontWeight={600} mb={1}>
            Detalle de la campaña
          </Typography>

          <Typography>
            <strong>Nombre:</strong> {selectedCampaign.name}
          </Typography>
          <Typography>
            <strong>Centro:</strong> {selectedCampaign.centerName}
          </Typography>
          <Typography>
            <strong>Dirección:</strong> {selectedCampaign.address}
          </Typography>
          <Typography>
            <strong>Fecha y horario:</strong> {selectedCampaign.date} |{" "}
            {selectedCampaign.startTime} - {selectedCampaign.endTime}
          </Typography>
          <Typography>
            <strong>Requisitos:</strong> {selectedCampaign.minAge} a{" "}
            {selectedCampaign.maxAge} años, mínimo {selectedCampaign.minWeight}{" "}
            kg.
          </Typography>
          <Typography>
            <strong>Grupos solicitados:</strong>{" "}
            {selectedCampaign.requiredBloodTypes.join(", ")}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default AvailableCampaignsView;
