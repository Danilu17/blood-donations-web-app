// src/pages/donor/AvailableCampaignsView.jsx
import { useEffect, useState } from "react";
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
  getPublicCampaigns,
  enrollToCampaign,
} from "../../services/campaignService";

function AvailableCampaignsView() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getPublicCampaigns();
      // depende de cómo respondas desde el backend
      setCampaigns(data.results || data.items || data.data || data || []);
    } catch (error) {
      const msg = error?.response?.data?.message || "Error al cargar campañas.";
      setErrorMsg(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleEnroll = async (campaignId) => {
    setEnrollingId(campaignId);
    setInfoMsg("");
    setErrorMsg("");
    try {
      // acá podrías pedir un horario/turno específico
      await enrollToCampaign(campaignId, null);
      setInfoMsg(
        'Inscripción enviada. Revisá tu estado en "Mis inscripciones".',
      );
      await load();
    } catch (error) {
      const msg =
        error?.response?.data?.message || "No se pudo inscribir a la campaña.";
      setErrorMsg(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) {
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

      {errorMsg && (
        <Typography color="error" variant="body2" mb={2}>
          {errorMsg}
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

export default AvailableCampaignsView;
