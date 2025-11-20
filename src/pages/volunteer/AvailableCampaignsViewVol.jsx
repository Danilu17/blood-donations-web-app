// src/pages/volunteer/AvailableCampaignsView.jsx
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import {
  LocationOn,
  CalendarMonth,
  AccessTime,
  People,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useGetPublicCampaignsQuery } from "../../apis/campaigns.api";
import { useRegisterVolunteerMutation } from "../../apis/volunteers.api";

function AvailableCampaignsViewVol() {
  const userId = useSelector((state) => state.user.id);

  const { data, isLoading, isError } = useGetPublicCampaignsQuery();
  const campaigns = data?.results || data?.items || data?.data || data || [];

  const [registerVolunteer] = useRegisterVolunteerMutation();

  const handleRegister = async (campaignId) => {
    try {
      await registerVolunteer({
        volunteerId: userId,
        campaignId,
        availability_hours: "Tiempo completo",
        special_skills: "",
      }).unwrap();

      alert("Te has registrado como voluntario exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrarse como voluntario");
    }
  };

  if (isLoading) return <Typography>Cargando campañas...</Typography>;
  if (isError)
    return <Typography color="error">Error al cargar campañas</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={0} sx={{ mb: 3, p: 2, bgcolor: "transparent" }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Campañas Disponibles - Voluntarios
        </Typography>
        <Typography color="text.secondary">
          Únete como voluntario a las campañas de donación
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} md={6} lg={4} key={campaign.id}>
            <Card sx={{ height: "100%", boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {campaign.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {campaign.description}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationOn sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2">
                    {campaign.center_name || campaign.location}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CalendarMonth sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2">
                    {campaign.date
                      ? campaign.date
                      : new Date(campaign.start_date).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AccessTime sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2">
                    {campaign.start_time} - {campaign.end_time}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <People sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2">
                    {campaign.current_donors}/{campaign.max_donors} donantes
                  </Typography>
                </Box>

                <Chip
                  label="Activa"
                  color="success"
                  size="small"
                  sx={{ mb: 2 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleRegister(campaign.id)}
                  sx={{
                    backgroundColor: "#dc2626",
                    "&:hover": { backgroundColor: "#b91c1c" },
                  }}
                >
                  Ser Voluntario
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {campaigns.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center", mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            No hay campañas activas
          </Typography>
          <Typography color="text.secondary">
            No hay campañas disponibles en este momento
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default AvailableCampaignsViewVol;
