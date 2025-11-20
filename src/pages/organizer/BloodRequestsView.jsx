// src/pages/organizer/BloodRequestsView.jsx
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
import {
  useGetBloodRequestsQuery,
  useUpdateBloodRequestMutation,
} from "../../apis/bloodRequests.api";

const BloodRequestsView = () => {
  const { data, isLoading, isError } = useGetBloodRequestsQuery({
    status: "PENDING",
    limit: 50,
    page: 0,
  });

  const [updateRequest, { isLoading: updating }] =
    useUpdateBloodRequestMutation();

  const requests = data?.data || data || [];

  const handleUpdateStatus = async (req, newStatus) => {
    const reason =
      newStatus === "REJECTED"
        ? window.prompt("Motivo del rechazo (opcional, se puede dejar vacío):")
        : undefined;

    try {
      await updateRequest({
        id: req.id,
        status: newStatus,
        review_notes: reason,
      }).unwrap();
      alert("Solicitud actualizada.");
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar la solicitud.");
    }
  };

  const renderStatusChip = (status) => {
    const map = {
      PENDING: { label: "Pendiente", color: "warning" },
      APPROVED: { label: "Aprobada", color: "success" },
      REJECTED: { label: "Rechazada", color: "error" },
      IN_PROGRESS: { label: "En campaña", color: "info" },
      COMPLETED: { label: "Cubierta", color: "primary" },
    };

    const config = map[status] || { label: status, color: "default" };
    return <Chip size="small" label={config.label} color={config.color} />;
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Solicitudes de sangre
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Acá ves las solicitudes hechas por beneficiarios y podés aprobarlas,
        rechazarlas o marcarlas como en campaña.
      </Typography>

      {isLoading && (
        <Stack alignItems="center" my={4}>
          <CircularProgress />
        </Stack>
      )}

      {isError && (
        <Alert severity="error">
          No se pudieron cargar las solicitudes de sangre.
        </Alert>
      )}

      {!isLoading && requests.length === 0 && (
        <Alert severity="info">
          No hay solicitudes pendientes en este momento.
        </Alert>
      )}

      {requests.length > 0 && (
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente / Detalles</TableCell>
                <TableCell>Grupo / Factor</TableCell>
                <TableCell>Unidades</TableCell>
                <TableCell>Solicitante</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((req) => {
                const user = req.requested_by || {};
                return (
                  <TableRow key={req.id}>
                    <TableCell>{req.patient_details}</TableCell>
                    <TableCell>
                      {req.blood_type}
                      {req.rh_factor}
                    </TableCell>
                    <TableCell>{req.required_units}</TableCell>
                    <TableCell>
                      {user.first_name} {user.last_name}
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{renderStatusChip(req.status)}</TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          disabled={updating}
                          onClick={() => handleUpdateStatus(req, "APPROVED")}
                        >
                          Aprobar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          disabled={updating}
                          onClick={() => handleUpdateStatus(req, "REJECTED")}
                        >
                          Rechazar
                        </Button>
                        <Button
                          size="small"
                          color="info"
                          disabled={updating}
                          onClick={() => handleUpdateStatus(req, "IN_PROGRESS")}
                        >
                          En campaña
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

export default BloodRequestsView;
