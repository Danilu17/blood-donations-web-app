import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetDonationsQuery } from "../../apis/donations.api";

export default function MyDonationsView() {
  const user = useSelector((state) => state.user);
  const { data, isLoading, isError, error } = useGetDonationsQuery();

  const donations = Array.isArray(data) ? data : data?.data || [];

  // Filtrar solo donaciones del usuario actual
  const myDonations = donations.filter(
    (d) => d.donor?.id === user.id || d.donorId === user.id,
  );

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        {error?.data?.message || "Error al cargar donaciones"}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Mis Donaciones
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Historial completo de tus donaciones de sangre
      </Typography>

      {myDonations.length === 0 ? (
        <Alert severity="info">Aún no has realizado ninguna donación</Alert>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {myDonations.map((donation) => (
            <Box
              key={donation.id}
              sx={{
                p: 2,
                border: "1px solid #e5e7eb",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography fontWeight={600}>
                Campaña: {donation.campaign?.name || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha: {donation.scheduled_date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estado: {donation.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cantidad:{" "}
                {donation.quantity_ml
                  ? `${donation.quantity_ml} ml`
                  : "Pendiente"}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
