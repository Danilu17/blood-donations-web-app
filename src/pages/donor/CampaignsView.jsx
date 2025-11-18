import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import GenericTable from "../../components/GenericTable";
import { useMockCampaigns } from "../../hooks/useMockCampaigns";

const CampaignsView = () => {
  const { campaigns, selectedCampaign, handleSelect } = useMockCampaigns();

  // Columnas de la tabla
  const columns = [
    { id: "name", label: "Campaña" },
    { id: "centerName", label: "Centro" },
    { id: "address", label: "Dirección" },
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
  ];

  const handleEnroll = () => {
    if (!selectedCampaign) return;
    alert(`Te inscribiste a la campaña:\n${selectedCampaign.name}`);
  };

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      {/* Header */}
      <Typography variant="h4" fontWeight={600} mb={1}>
        Campañas Disponibles
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Consultá las campañas activas cerca tuyo y reservá un turno para donar
        sangre.
      </Typography>

      {/* Tabla */}
      <GenericTable
        title="Listado de campañas"
        subtitle="Selecciona una campaña para ver más detalles"
        columns={columns}
        data={campaigns}
        isLoading={false}
        isError={false}
        onRowClick={handleSelect}
      />

      {/* Botón de inscripción */}
      <Stack direction="row" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          disabled={!selectedCampaign}
          sx={{
            backgroundColor: "#dc2626",
            "&:hover": { backgroundColor: "#b91c1c" },
          }}
          onClick={handleEnroll}
        >
          Reservar turno
        </Button>
      </Stack>

      {/* Detalle de campaña */}
      {selectedCampaign && (
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ mt: 3, p: 2, borderRadius: 2 }}
        >
          <Typography variant="h6" fontWeight={600} mb={1}>
            Detalle de la campaña seleccionada
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Centro:</strong> {selectedCampaign.centerName}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Dirección:</strong> {selectedCampaign.address}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Fecha:</strong> {selectedCampaign.date}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Horario:</strong> {selectedCampaign.startTime} -{" "}
            {selectedCampaign.endTime}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Cupos:</strong> {selectedCampaign.slotsTaken}/
            {selectedCampaign.slotsTotal}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Requisitos:</strong> {selectedCampaign.minAge} a{" "}
            {selectedCampaign.maxAge} años, mínimo {selectedCampaign.minWeight}{" "}
            kg.
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Grupos solicitados:</strong>{" "}
            {selectedCampaign.requiredBloodTypes.join(", ")}
          </Typography>

          <Typography sx={{ mt: 2 }}>{selectedCampaign.description}</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default CampaignsView;
