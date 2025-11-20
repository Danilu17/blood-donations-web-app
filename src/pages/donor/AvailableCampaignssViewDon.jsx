// src/pages/donor/AvailableCampaignsViewDon.jsx
import { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Chip,
  TextField,
} from "@mui/material";
import {
  useGetPublicCampaignsQuery,
  useEnrollToCampaignMutation,
} from "../../apis/campaigns.api";

/**
 * Devuelve un mensaje de error en español a partir de un objeto de error o un fallback.
 */
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
  const [filter, setFilter] = useState("");

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
      setInfoMsg('Inscripción enviada. Revisa tu estado en "Mis donaciones".');
      await refetch();
    } catch (error) {
      const msg = getErrorMessage(error, "No se pudo inscribir a la campaña.");
      setErrorMsg(msg);
    } finally {
      setEnrollingId(null);
    }
  };

  // Filtro por nombre de campaña o centro
  const filteredCampaigns = useMemo(() => {
    const term = filter.toLowerCase();
    return campaigns.filter(
      (c) =>
        c.name?.toLowerCase().includes(term) ||
        c.center_name?.toLowerCase().includes(term) ||
        c.location?.toLowerCase().includes(term),
    );
  }, [campaigns, filter]);

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

      <TextField
        fullWidth
        placeholder="Filtrar por nombre o centro"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        margin="normal"
      />

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
        {filteredCampaigns.map((c) => {
          const date = new Date(c.date);
          const dateStr = date.toLocaleDateString();
          return (
            <Grid item xs={12} md={6} key={c.id}>
              <Paper sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {c.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.center_name || c.location}
                </Typography>
                <Typography variant="body2">
                  Fecha: {dateStr} — Horario: {c.start_time} - {c.end_time}
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
                    ? "Ya estás inscrito"
                    : enrollingId === c.id
                      ? "Inscribiendo..."
                      : "Inscribirse"}
                </Button>
              </Paper>
            </Grid>
          );
        })}
        {filteredCampaigns.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body2">No se encontraron campañas.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default AvailableCampaignsViewDon;
