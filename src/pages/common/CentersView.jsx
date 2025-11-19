// src/pages/common/CentersView.jsx
import { useEffect, useState } from "react";
import { Box, Paper, Typography, CircularProgress, Grid } from "@mui/material";
import { getCenters } from "../../services/centerService";

function CentersView() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getCenters();
        setCenters(data.results || data.items || data.data || data || []);
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          "Error al cargar centros de donación.";
        setErrorMsg(Array.isArray(msg) ? msg.join(", ") : msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
        Centros de donación
      </Typography>

      {errorMsg && (
        <Typography color="error" variant="body2" mb={2}>
          {errorMsg}
        </Typography>
      )}

      <Grid container spacing={2}>
        {centers.map((c) => (
          <Grid item xs={12} md={6} key={c.id}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6">{c.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {c.address}
              </Typography>
              <Typography variant="body2">
                Horarios: {c.schedule || c.opening_hours}
              </Typography>
              <Typography variant="body2">
                Capacidad: {c.capacity ?? "—"}
              </Typography>
              <Typography variant="body2">
                Contacto: {c.contact || c.phone}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CentersView;
