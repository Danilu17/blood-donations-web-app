// src/pages/donor/AvailableCampaignsView.jsx
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetCampaignsQuery } from "../../apis/campaigns.api"; // ajustá la ruta según tu proyecto
import {
  useCreateEnrollmentMutation,
  useGetMyEnrollmentsQuery,
} from "../../apis/enrollments.api";

const AvailableCampaignsView = () => {
  const user = useSelector((state) => state.user);

  const {
    data: campaignsData,
    isLoading: loadingCampaigns,
    isError: errorCampaigns,
  } = useGetCampaignsQuery({ status: "ACTIVE" });

  const { data: myEnrollmentsData, isLoading: loadingEnrollments } =
    useGetMyEnrollmentsQuery(user?.id, {
      skip: !user?.id,
    });

  const [createEnrollment, { isLoading: enrolling }] =
    useCreateEnrollmentMutation();

  const campaigns = campaignsData?.data || campaignsData || [];
  const myEnrollments = myEnrollmentsData?.data || myEnrollmentsData || [];

  const getEnrollmentStatusForCampaign = (campaignId) => {
    const found = myEnrollments.find(
      (en) => en.campaign?.id === campaignId || en.campaign_id === campaignId,
    );
    return found?.status || null;
  };

  const handleEnroll = async (campaignId) => {
    if (!user?.id) return;

    try {
      await createEnrollment({
        campaignId, // debe coincidir con CreateEnrollmentDto
      }).unwrap();
      alert("Te inscribiste correctamente a la campaña.");
    } catch (error) {
      console.error(error);
      alert(
        error?.data?.message ||
          "No se pudo completar la inscripción. Intenta de nuevo.",
      );
    }
  };

  const renderStatusChip = (status) => {
    if (!status) return null;

    const map = {
      pending: { label: "Pendiente", color: "warning" },
      confirmed: { label: "Confirmada", color: "success" },
      cancelled: { label: "Cancelada", color: "default" },
      waitlist: { label: "Lista de espera", color: "info" },
    };

    const config = map[status.toLowerCase()] || {
      label: status,
      color: "default",
    };

    return (
      <Chip
        size="small"
        label={config.label}
        color={config.color}
        sx={{ ml: 1 }}
      />
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Campañas disponibles
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Elegí una campaña para inscribirte. Recordá completar tu cuestionario de
        salud para que el organizador pueda evaluar tu elegibilidad.
      </Typography>

      {(loadingCampaigns || loadingEnrollments) && (
        <Stack alignItems="center" my={4}>
          <CircularProgress />
        </Stack>
      )}

      {errorCampaigns && (
        <Alert severity="error" sx={{ mb: 2 }}>
          No se pudieron cargar las campañas.
        </Alert>
      )}

      {!loadingCampaigns && campaigns?.length === 0 && (
        <Alert severity="info">No hay campañas activas en este momento.</Alert>
      )}

      <Grid container spacing={3}>
        {campaigns?.map((campaign) => {
          const status = getEnrollmentStatusForCampaign(campaign.id);

          const isCompletedOrCancelled =
            campaign.status === "COMPLETED" || campaign.status === "CANCELLED";

          const isFull =
            (campaign.current_donors ?? 0) >= (campaign.max_donors ?? 0);

          const canEnroll =
            !status && !isCompletedOrCancelled && !isFull && user?.id;

          return (
            <Grid item xs={12} md={6} key={campaign.id}>
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {campaign.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  {campaign.location}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Fecha:{" "}
                  <strong>
                    {new Date(campaign.campaign_date).toLocaleDateString()}
                  </strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Horario:{" "}
                  <strong>
                    {campaign.start_time} - {campaign.end_time}
                  </strong>
                </Typography>

                <Typography variant="body2" color="text.secondary" mt={1}>
                  Cupos:{" "}
                  <strong>
                    {campaign.current_donors ?? 0}/{campaign.max_donors ?? "?"}
                  </strong>
                  {isFull && (
                    <Chip
                      size="small"
                      color="error"
                      label="Sin cupos"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                  spacing={1}
                >
                  <Box>{renderStatusChip(status)}</Box>

                  <Button
                    variant="contained"
                    size="small"
                    disabled={!canEnroll || enrolling}
                    onClick={() => handleEnroll(campaign.id)}
                  >
                    {isFull ? "Unirse a lista de espera" : "Inscribirme"}
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AvailableCampaignsView;
