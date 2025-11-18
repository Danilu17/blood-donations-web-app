import { Box, Typography, Divider, Button } from "@mui/material";
import { Navigate } from "react-router-dom";

const CampaignDetails = ({ campaign }) => {
  const isFinished = campaign.status === "FINISHED";

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={1}>
        Detalle de la campaña
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Nombre:</strong> {campaign.name}
      </Typography>
      <Typography>
        <strong>Fecha:</strong> {campaign.date}
      </Typography>
      <Typography>
        <strong>Horario:</strong> {campaign.startTime} – {campaign.endTime}
      </Typography>

      <Typography sx={{ mt: 1 }}>
        <strong>Centro:</strong> {campaign.centerName}
      </Typography>
      <Typography>
        <strong>Dirección:</strong> {campaign.address}
      </Typography>

      <Typography sx={{ mt: 1 }}>
        <strong>Cupos:</strong> {campaign.slotsTaken}/{campaign.slotsTotal}
      </Typography>

      <Typography>
        <strong>Estado:</strong> {campaign.status}
      </Typography>

      <Typography sx={{ mt: 2 }}>{campaign.description}</Typography>

      {/* Acciones */}
      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2563eb",
            "&:hover": { backgroundColor: "#1d4ed8" },
          }}
          onClick={() => Navigate(`/organizer/registrations/${campaign.id}`)}
        >
          Ver inscriptos
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2563eb",
            "&:hover": { backgroundColor: "#1d4ed8" },
          }}
          onClick={() => Navigate(`/organizer/donations/${campaign.id}`)}
        >
          Gestionar donaciones
        </Button>

        {!isFinished && (
          <Button
            variant="outlined"
            sx={{
              borderColor: "#dc2626",
              color: "#dc2626",
              "&:hover": {
                backgroundColor: "#fee2e2",
                borderColor: "#b91c1c",
                color: "#b91c1c",
              },
            }}
          >
            Cancelar campaña
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CampaignDetails;
