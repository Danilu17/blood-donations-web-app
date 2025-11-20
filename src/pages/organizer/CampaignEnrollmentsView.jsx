// src/pages/organizer/CampaignEnrollmentsView.jsx
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
  Stack,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetCampaignEnrollmentsQuery,
  useCancelEnrollmentMutation,
  useConfirmEnrollmentMutation,
} from "../../apis/enrollments.api";
import { useGetCampaignByIdQuery } from "../../apis/campaigns.api";

const CampaignEnrollmentsView = () => {
  const { id: campaignId } = useParams();
  const navigate = useNavigate();

  const { data: campaign, isLoading: loadingCampaign } =
    useGetCampaignByIdQuery(campaignId, { skip: !campaignId });

  const { data, isLoading, isError } = useGetCampaignEnrollmentsQuery(
    campaignId,
    { skip: !campaignId },
  );

  const [cancelEnrollment, { isLoading: cancelling }] =
    useCancelEnrollmentMutation();
  const [confirmEnrollment, { isLoading: confirming }] =
    useConfirmEnrollmentMutation();

  const enrollments = data?.data || data || [];

  const handleConfirm = async (enrollmentId) => {
    try {
      await confirmEnrollment(enrollmentId).unwrap();
      alert("Inscripción confirmada.");
    } catch (err) {
      console.error(err);
      alert("No se pudo confirmar la inscripción.");
    }
  };

  const handleCancel = async (enrollmentId) => {
    if (!window.confirm("¿Cancelar esta inscripción?")) return;
    try {
      await cancelEnrollment(enrollmentId).unwrap();
      alert("Inscripción cancelada.");
    } catch (err) {
      console.error(err);
      alert("No se pudo cancelar la inscripción.");
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

    return <Chip size="small" label={config.label} color={config.color} />;
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack direction="row" alignItems="center" mb={2} spacing={1}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" fontWeight={600}>
          Inscripciones de campaña
        </Typography>
      </Stack>

      {loadingCampaign && (
        <Stack alignItems="center" my={2}>
          <CircularProgress size={24} />
        </Stack>
      )}

      {campaign && (
        <Typography color="text.secondary" mb={2}>
          {campaign.name} —{" "}
          {campaign.campaign_date
            ? new Date(campaign.campaign_date).toLocaleDateString()
            : ""}
        </Typography>
      )}

      {isLoading && (
        <Stack alignItems="center" my={4}>
          <CircularProgress />
        </Stack>
      )}

      {isError && (
        <Alert severity="error">
          No se pudieron cargar las inscripciones de esta campaña.
        </Alert>
      )}

      {!isLoading && enrollments.length === 0 && (
        <Alert severity="info">Esta campaña aún no tiene inscripciones.</Alert>
      )}

      {enrollments.length > 0 && (
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Donante</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Grupo sanguíneo</TableCell>
                <TableCell>Estado elegibilidad</TableCell>
                <TableCell>Fecha inscripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.map((en) => {
                const donor = en.donor || {};
                const status = en.status || "";
                const canConfirm = status.toLowerCase() === "pending";
                const canCancel =
                  status.toLowerCase() === "pending" ||
                  status.toLowerCase() === "confirmed" ||
                  status.toLowerCase() === "waitlist";

                return (
                  <TableRow key={en.id}>
                    <TableCell>
                      {donor.first_name} {donor.last_name}
                    </TableCell>
                    <TableCell>{donor.email}</TableCell>
                    <TableCell>
                      {donor.blood_type}
                      {donor.rh_factor}
                    </TableCell>
                    <TableCell>
                      {donor.eligibility_status || "Sin evaluar"}
                    </TableCell>
                    <TableCell>
                      {en.created_at
                        ? new Date(en.created_at).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>{renderStatusChip(status)}</TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <Button
                          size="small"
                          variant="contained"
                          disabled={!canConfirm || confirming}
                          onClick={() => handleConfirm(en.id)}
                        >
                          Aprobar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          disabled={!canCancel || cancelling}
                          onClick={() => handleCancel(en.id)}
                        >
                          Cancelar
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default CampaignEnrollmentsView;
