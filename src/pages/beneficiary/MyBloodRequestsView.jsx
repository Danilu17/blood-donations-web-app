// src/pages/beneficiary/MyBloodRequestsView.jsx
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
  Alert,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMyBloodRequestsQuery } from "../../apis/bloodRequests.api";

const MyBloodRequestsView = () => {
  const user = useSelector((state) => state.user);

  const { data, isLoading, isError } = useGetMyBloodRequestsQuery(user?.id, {
    skip: !user?.id,
  });

  const requests = data?.data || data || [];

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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={2}
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Mis solicitudes de sangre
          </Typography>
          <Typography color="text.secondary">
            Acá ves el estado de las solicitudes que realizaste como
            beneficiario.
          </Typography>
        </Box>

        {/* Botón para ir a crear nueva solicitud (rutas más abajo) */}
        <Button variant="contained" href="/beneficiary/blood-requests/new">
          Nueva solicitud
        </Button>
      </Stack>

      {isLoading && (
        <Stack alignItems="center" my={4}>
          <CircularProgress />
        </Stack>
      )}

      {isError && (
        <Alert severity="error">
          No se pudieron cargar tus solicitudes de sangre.
        </Alert>
      )}

      {!isLoading && requests.length === 0 && (
        <Alert severity="info">
          Todavía no realizaste ninguna solicitud de sangre.
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
                <TableCell>Estado</TableCell>
                <TableCell>Notas de revisión</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.patient_details}</TableCell>
                  <TableCell>
                    {req.blood_type}
                    {req.rh_factor}
                  </TableCell>
                  <TableCell>{req.required_units}</TableCell>
                  <TableCell>{renderStatusChip(req.status)}</TableCell>
                  <TableCell>{req.review_notes || req.notes || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default MyBloodRequestsView;
