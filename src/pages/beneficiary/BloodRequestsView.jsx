// src/pages/beneficiary/BloodRequestsView.jsx
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  useGetMyBloodRequestsQuery,
  useCreateBloodRequestMutation,
} from "../../apis/bloodRequests.api";
import { useGetCentersQuery } from "../../apis/centers.api";

const BLOOD_TYPES = ["A", "B", "AB", "0"];
const RH_FACTORS = ["+", "-"];
const URGENCIES = ["Baja", "Media", "Alta", "Crítica"];

const getErrorMessage = (error, fallback) => {
  if (!error) return fallback;
  const data = error.data;
  let msg =
    data?.message ||
    (typeof error.error === "string" && error.error) ||
    fallback;
  return Array.isArray(msg) ? msg.join(", ") : msg;
};

function BloodRequestsView() {
  const [form, setForm] = useState({
    blood_type: "",
    rh_factor: "",
    units: "",
    center_id: "",
    urgency: "",
    estimated_date: "",
    notes: "",
  });
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const {
    data: centersData,
    isLoading: loadingCenters,
    error: centersError,
  } = useGetCentersQuery();

  const {
    data: requestsData,
    isLoading: loadingRequests,
    error: requestsError,
    refetch: refetchRequests,
  } = useGetMyBloodRequestsQuery();

  const [createBloodRequest] = useCreateBloodRequestMutation();

  const centers =
    centersData?.results ||
    centersData?.items ||
    centersData?.data ||
    centersData ||
    [];

  const requests =
    requestsData?.results ||
    requestsData?.items ||
    requestsData?.data ||
    requestsData ||
    [];

  const loading = loadingCenters || loadingRequests;

  const combinedError =
    centersError || requestsError
      ? getErrorMessage(
          centersError || requestsError,
          "Error al cargar datos de solicitudes.",
        )
      : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");
    setSending(true);

    try {
      await createBloodRequest({
        ...form,
        units: Number(form.units),
      }).unwrap();

      setInfoMsg("Solicitud enviada correctamente.");
      setForm({
        blood_type: "",
        rh_factor: "",
        units: "",
        center_id: "",
        urgency: "",
        estimated_date: "",
        notes: "",
      });
      await refetchRequests();
    } catch (error) {
      const msg = getErrorMessage(error, "No se pudo enviar la solicitud.");
      setErrorMsg(msg);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Solicitudes de sangre
      </Typography>

      {(errorMsg || combinedError) && (
        <Typography color="error" variant="body2" mb={2}>
          {errorMsg || combinedError}
        </Typography>
      )}
      {infoMsg && (
        <Typography color="primary" variant="body2" mb={2}>
          {infoMsg}
        </Typography>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Crear nueva solicitud
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              select
              label="Grupo sanguíneo"
              name="blood_type"
              value={form.blood_type}
              onChange={handleChange}
              margin="normal"
              required
            >
              {BLOOD_TYPES.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Factor Rh"
              name="rh_factor"
              value={form.rh_factor}
              onChange={handleChange}
              margin="normal"
              required
            >
              {RH_FACTORS.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="number"
              label="Cantidad de unidades"
              name="units"
              value={form.units}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              select
              label="Centro de donación"
              name="center_id"
              value={form.center_id}
              onChange={handleChange}
              margin="normal"
              sx={{ minWidth: 220 }}
              required
            >
              {centers.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name} — {c.address}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Urgencia"
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              margin="normal"
              required
            >
              {URGENCIES.map((u) => (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="date"
              label="Fecha estimada"
              name="estimated_date"
              value={form.estimated_date}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>

          <TextField
            fullWidth
            label="Notas adicionales (opcional)"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            margin="normal"
            multiline
            minRows={2}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={sending}
          >
            {sending ? "Enviando..." : "Enviar solicitud"}
          </Button>
        </form>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Mis solicitudes
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha estimada</TableCell>
              <TableCell>Centro</TableCell>
              <TableCell>Tipo de sangre</TableCell>
              <TableCell>Unidades</TableCell>
              <TableCell>Urgencia</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.estimated_date}</TableCell>
                <TableCell>{r.center_name || r.center?.name}</TableCell>
                <TableCell>
                  {r.blood_type} {r.rh_factor}
                </TableCell>
                <TableCell>{r.units}</TableCell>
                <TableCell>{r.urgency}</TableCell>
                <TableCell>{r.status}</TableCell>
              </TableRow>
            ))}
            {requests.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Todavía no registraste solicitudes.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default BloodRequestsView;
