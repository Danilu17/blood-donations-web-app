// src/pages/donor/MyRegistrationsView.jsx
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
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  useGetMyEnrollmentsQuery,
  useCancelEnrollmentMutation,
} from "../../apis/enrollments.api";

const MyRegistrationsView = () => {
  const user = useSelector((state) => state.user);
  const { data, isLoading, isError } = useGetMyEnrollmentsQuery(user?.id, {
    skip: !user?.id,
  });

  const [cancelEnrollment, { isLoading: cancelling }] =
    useCancelEnrollmentMutation();

  const enrollments = data?.data || data || [];

  const handleCancel = async (id) => {
    if (!window.confirm("¿Seguro que querés cancelar esta inscripción?"))
      return;
    try {
      await cancelEnrollment(id).unwrap();
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
      <Typography variant="h4" fontWeight={600} mb={1}>
        Mis inscripciones
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Acá ves el estado de tus inscripciones a campañas: pendiente, confirmada
        o en lista de espera.
      </Typography>

      {isLoading && (
        <Stack alignItems="center" my={4}>
          <CircularProgress />
        </Stack>
      )}

      {isError && (
        <Alert severity="error">No se pudieron cargar tus inscripciones.</Alert>
      )}

      {!isLoading && enrollments.length === 0 && (
        <Alert severity="info">
          Todavía no te inscribiste a ninguna campaña.
        </Alert>
      )}

      {enrollments.length > 0 && (
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Campaña</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Horario</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.map((en) => {
                const campaign = en.campaign || {};
                const status = en.status || "";

                const canCancel = status.toLowerCase() === "pending";

                return (
                  <TableRow key={en.id}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>
                      {campaign.campaign_date
                        ? new Date(campaign.campaign_date).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {campaign.start_time} - {campaign.end_time}
                    </TableCell>
                    <TableCell>{renderStatusChip(status)}</TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        color="error"
                        disabled={!canCancel || cancelling}
                        onClick={() => handleCancel(en.id)}
                      >
                        Cancelar
                      </Button>
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

export default MyRegistrationsView;
