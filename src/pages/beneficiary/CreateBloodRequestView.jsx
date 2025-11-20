// src/pages/beneficiary/CreateBloodRequestView.jsx
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Stack,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useCreateBloodRequestMutation } from "../../apis/bloodRequests.api";

const BLOOD_TYPES = ["O", "A", "B", "AB"];
const RH_FACTORS = ["+", "-"];

const CreateBloodRequestView = () => {
  const [form, setForm] = useState({
    blood_type: "",
    rh_factor: "",
    required_units: "",
    patient_details: "",
  });

  const [createRequest, { isLoading, isError, error, isSuccess }] =
    useCreateBloodRequestMutation();

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.blood_type || !form.rh_factor || !form.required_units) {
      alert("Completá todos los campos obligatorios.");
      return;
    }

    try {
      await createRequest({
        ...form,
        required_units: Number(form.required_units),
      }).unwrap();
      alert("Solicitud de sangre creada correctamente.");
      setForm({
        blood_type: "",
        rh_factor: "",
        required_units: "",
        patient_details: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Nueva solicitud de sangre
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Completá los datos de la solicitud para que el equipo organizador pueda
        generar campañas y donaciones en función de tu necesidad.
      </Typography>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 3, borderRadius: 2 }}
      >
        <Stack spacing={2.5}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Grupo sanguíneo"
              select
              fullWidth
              required
              value={form.blood_type}
              onChange={(e) => handleChange("blood_type", e.target.value)}
            >
              {BLOOD_TYPES.map((bt) => (
                <MenuItem key={bt} value={bt}>
                  {bt}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Factor RH"
              select
              fullWidth
              required
              value={form.rh_factor}
              onChange={(e) => handleChange("rh_factor", e.target.value)}
            >
              {RH_FACTORS.map((rh) => (
                <MenuItem key={rh} value={rh}>
                  {rh}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <TextField
            label="Unidades requeridas"
            type="number"
            required
            inputProps={{ min: 1 }}
            fullWidth
            value={form.required_units}
            onChange={(e) => handleChange("required_units", e.target.value)}
          />

          <TextField
            label="Detalles del paciente / caso"
            multiline
            minRows={3}
            fullWidth
            value={form.patient_details}
            onChange={(e) => handleChange("patient_details", e.target.value)}
            placeholder="Ej.: Paciente masculino, 45 años, internado en Hospital X..."
          />

          {isError && (
            <Alert severity="error">
              {error?.data?.message ||
                "No se pudo crear la solicitud. Intentalo de nuevo."}
            </Alert>
          )}

          {isSuccess && (
            <Alert severity="success">
              Solicitud creada correctamente. El equipo organizador podrá verla
              y gestionarla.
            </Alert>
          )}

          <Box textAlign="right">
            <Button type="submit" variant="contained" disabled={isLoading}>
              Enviar solicitud
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CreateBloodRequestView;
