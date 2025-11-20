// src/pages/common/CentersView.jsx
import { Box, Paper, Typography, CircularProgress, Grid } from "@mui/material";
import { useGetCentersQuery } from "../../apis/centers.api";

const getErrorMessage = (error, fallback) => {
  if (!error) return fallback;
  const data = error.data;
  let msg =
    data?.message ||
    (typeof error.error === "string" && error.error) ||
    fallback;
  return Array.isArray(msg) ? msg.join(", ") : msg;
};

function CentersView() {
  const { data, isLoading, error } = useGetCentersQuery();

  const centers = data?.results || data?.items || data?.data || data || [];

  if (isLoading) {
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  const errorMsg = error
    ? getErrorMessage(error, "Error al cargar centros de donación.")
    : "";

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
