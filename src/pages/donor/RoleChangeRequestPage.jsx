// src/pages/donor/RoleChangeRequestPage.jsx
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import {
  useRequestRoleChangeMutation,
  useGetMyRoleChangeRequestsQuery,
} from "../../apis/role-change.api";

/**
 * Opciones de rol que puede solicitar un donante. No se incluye "admin"
 * para evitar solicitudes no autorizadas.
 */
const AVAILABLE_ROLES = [
  { value: "beneficiary", label: "Beneficiario" },
  { value: "organizer", label: "Organizador" },
];

function RoleChangeRequestPage() {
  const [form, setForm] = useState({ requested_role: "", justification: "" });
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    data: requests,
    isLoading: loadingRequests,
    error: loadError,
  } = useGetMyRoleChangeRequestsQuery();

  const [requestRoleChange, { isLoading: submitting }] =
    useRequestRoleChangeMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");
    if (!form.requested_role) {
      setErrorMsg("Debes seleccionar el rol solicitado.");
      return;
    }
    try {
      await requestRoleChange(form).unwrap();
      setMessage("Solicitud enviada correctamente.");
      setForm({ requested_role: "", justification: "" });
    } catch (error) {
      // Intenta recuperar un mensaje legible del error
      const data = error?.data;
      const msg =
        data?.message || error?.error || "Error al enviar la solicitud.";
      setErrorMsg(Array.isArray(msg) ? msg.join(", ") : msg);
    }
  };

  return (
    <Box p={3} maxWidth={800} mx="auto">
      <Typography variant="h5" mb={2}>
        Solicitar cambio de rol
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}
        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            label="Rol solicitado"
            name="requested_role"
            value={form.requested_role}
            onChange={handleChange}
            margin="normal"
            required
          >
            {AVAILABLE_ROLES.map((r) => (
              <MenuItem key={r.value} value={r.value}>
                {r.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Justificación (opcional)"
            name="justification"
            value={form.justification}
            onChange={handleChange}
            margin="normal"
            multiline
            minRows={3}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{ mt: 2 }}
          >
            {submitting ? <CircularProgress size={22} /> : "Enviar solicitud"}
          </Button>
        </form>
      </Paper>

      <Typography variant="h6" mb={1}>
        Mis solicitudes
      </Typography>

      {loadingRequests ? (
        <Box textAlign="center" p={2}>
          <CircularProgress />
        </Box>
      ) : requests && requests.length > 0 ? (
        <Paper sx={{ p: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Rol solicitado</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Justificación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>
                    {new Date(req.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{req.requested_role}</TableCell>
                  <TableCell>{req.status}</TableCell>
                  <TableCell>{req.justification || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Typography variant="body2">Todavía no tienes solicitudes.</Typography>
      )}
    </Box>
  );
}

export default RoleChangeRequestPage;
