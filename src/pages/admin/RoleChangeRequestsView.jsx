// src/pages/admin/RoleChangeRequestsView.jsx
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
  useGetRoleChangeRequestsQuery,
  useReviewRoleChangeRequestMutation,
} from "../../apis/role-change.api";

const RoleChangeRequestsView = () => {
  const { data, isLoading, isError } = useGetRoleChangeRequestsQuery({
    status: "PENDING",
    limit: 100,
    page: 0,
  });

  const [reviewRequest, { isLoading: reviewing }] =
    useReviewRoleChangeRequestMutation();

  const requests = data?.data || data || [];

  const handleReview = async (req, status) => {
    const notes =
      status === "REJECTED"
        ? window.prompt("Motivo del rechazo (opcional):")
        : undefined;

    try {
      await reviewRequest({
        id: req.id,
        status,
        review_notes: notes,
      }).unwrap();
      alert("Solicitud revisada.");
    } catch (err) {
      console.error(err);
      alert("No se pudo revisar la solicitud.");
    }
  };

  const renderStatusChip = (status) => {
    const map = {
      PENDING: { label: "Pendiente", color: "warning" },
      APPROVED: { label: "Aprobada", color: "success" },
      REJECTED: { label: "Rechazada", color: "error" },
    };

    const config = map[status] || { label: status, color: "default" };
    return <Chip size="small" label={config.label} color={config.color} />;
  };

  const renderRoleChip = (role) => {
    if (!role) return null;
    const map = {
      donor: { label: "Donante", color: "default" },
      beneficiary: { label: "Beneficiario", color: "info" },
      organizer: { label: "Organizador", color: "success" },
      admin: { label: "Administrador", color: "primary" },
    };
    const config = map[role] || { label: role, color: "default" };
    return <Chip size="small" label={config.label} color={config.color} />;
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Solicitudes de cambio de rol
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Revisá las solicitudes de usuarios que quieren cambiar su rol (por
        ejemplo, donante → organizador).
      </Typography>

      {isLoading && (
        <Stack alignItems="center" my={4}>
          <CircularProgress />
        </Stack>
      )}

      {isError && (
        <Alert severity="error">
          No se pudieron cargar las solicitudes de cambio de rol.
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
                <TableCell>Usuario</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol actual</TableCell>
                <TableCell>Rol solicitado</TableCell>
                <TableCell>Justificación</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((req) => {
                const user = req.user || req.requested_by || {};
                return (
                  <TableRow key={req.id}>
                    <TableCell>
                      {user.first_name} {user.last_name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{renderRoleChip(user.role)}</TableCell>
                    <TableCell>
                      {renderRoleChip(req.requested_role || req.requestedRole)}
                    </TableCell>
                    <TableCell>{req.justification || "-"}</TableCell>
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
                          disabled={reviewing}
                          onClick={() => handleReview(req, "APPROVED")}
                        >
                          Aprobar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          disabled={reviewing}
                          onClick={() => handleReview(req, "REJECTED")}
                        >
                          Rechazar
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

export default RoleChangeRequestsView;
