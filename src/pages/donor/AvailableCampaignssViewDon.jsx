// src/pages/donor/AvailableCampaignsView.jsx
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Chip,
} from "@mui/material";
import {
  useGetPublicCampaignsQuery,
  useEnrollToCampaignMutation,
} from "../../apis/campaigns.api";

const getErrorMessage = (error, fallback) => {
  if (!error) return fallback;
  const data = error.data;
  let msg =
    data?.message ||
    (typeof error.error === "string" && error.error) ||
    fallback;
  return Array.isArray(msg) ? msg.join(", ") : msg;
};

function AvailableCampaignsViewDon() {
  const [enrollingId, setEnrollingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const {
    data,
    isLoading,
    error: loadError,
    refetch,
  } = useGetPublicCampaignsQuery();

  const [enrollToCampaign] = useEnrollToCampaignMutation();

  const campaigns = data?.results || data?.items || data?.data || data || [];

  const loadErrorMsg = loadError
    ? getErrorMessage(loadError, "Error al cargar campañas.")
    : "";

  const handleEnroll = async (campaignId) => {
    setEnrollingId(campaignId);
    setInfoMsg("");
    setErrorMsg("");

    try {
      await enrollToCampaign({ campaignId, schedule: null }).unwrap();
      setInfoMsg(
        'Inscripción enviada. Revisá tu estado en "Mis inscripciones".',
      );
      await refetch();
    } catch (error) {
      const msg = getErrorMessage(error, "No se pudo inscribir a la campaña.");
      setErrorMsg(msg);
    } finally {
      setEnrollingId(null);
    }
  };

  if (isLoading) {
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Campañas disponibles
      </Typography>

      {(errorMsg || loadErrorMsg) && (
        <Typography color="error" variant="body2" mb={2}>
          {errorMsg || loadErrorMsg}
        </Typography>
      )}
      {infoMsg && (
        <Typography color="primary" variant="body2" mb={2}>
          {infoMsg}
        </Typography>
      )}

      <Grid container spacing={2}>
        {campaigns.map((c) => (
          <Grid item xs={12} md={6} key={c.id}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6">{c.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {c.center_name || c.location}
              </Typography>
              <Typography variant="body2">
                Fecha: {c.date} — Horario: {c.start_time} - {c.end_time}
              </Typography>
              <Box mt={1} mb={1}>
                <Chip
                  label={`Cupos: ${c.current_donors ?? 0} / ${c.max_donors ?? "N/A"}`}
                  size="small"
                />
              </Box>
              <Button
                variant="contained"
                onClick={() => handleEnroll(c.id)}
                disabled={!!c.is_enrolled || enrollingId === c.id}
              >
                {c.is_enrolled
                  ? "Ya estás inscripto"
                  : enrollingId === c.id
                    ? "Inscribiendo..."
                    : "Inscribirse"}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AvailableCampaignsViewDon;
