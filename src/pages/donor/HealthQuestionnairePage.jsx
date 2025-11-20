// src/pages/donor/HealthQuestionnairePage.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  useCreateQuestionnaireMutation,
  useGetMyLastQuestionnaireQuery,
} from "../../apis/questionnaire.api";

const BLOOD_TYPES = ["A", "B", "AB", "O"];
const RH_FACTORS = ["+", "-"];

const getErrorMessage = (error, fallback) => {
  if (!error) return fallback;
  const data = error.data;
  let msg =
    data?.message ||
    (typeof error.error === "string" && error.error) ||
    fallback;
  return Array.isArray(msg) ? msg.join(", ") : msg;
};

function HealthQuestionnairePage() {
  const [form, setForm] = useState({
    weight: "",
    height: "",
    diseases: "",
    medication: "",
    last_donation_date: "",
    blood_type: "",
    rh_factor: "",
  });
  const [eligibility, setEligibility] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { data: lastQuestionnaireRaw, isLoading: loadingLast } =
    useGetMyLastQuestionnaireQuery();

  // El endpoint /health-questionnaire/my-status devuelve { message, data }
  const lastQuestionnaire =
    lastQuestionnaireRaw && lastQuestionnaireRaw.data
      ? lastQuestionnaireRaw.data
      : lastQuestionnaireRaw;

  const [
    createHealthQuestionnaire,
    { isLoading: submitting, error: submitError },
  ] = useCreateQuestionnaireMutation();

  useEffect(() => {
    if (lastQuestionnaire) {
      setEligibility(
        lastQuestionnaire.eligibility_status || lastQuestionnaire.status,
      );
    }
  }, [lastQuestionnaire]);

  useEffect(() => {
    if (submitError) {
      setErrorMsg(
        getErrorMessage(
          submitError,
          "Error al enviar el cuestionario. Inténtalo de nuevo.",
        ),
      );
    }
  }, [submitError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Valida peso, altura, grupo Rh y la fecha de última donación (mínimo 60 días).
  const validate = () => {
    const weightNumber = Number(form.weight);
    if (Number.isNaN(weightNumber) || weightNumber < 50) {
      setErrorMsg("El peso debe ser mayor o igual a 50 kg.");
      return false;
    }

    const heightNumber = Number(form.height);
    if (
      Number.isNaN(heightNumber) ||
      heightNumber < 100 ||
      heightNumber > 250
    ) {
      setErrorMsg("La altura debe estar entre 100 cm y 250 cm.");
      return false;
    }

    if (!form.blood_type || !form.rh_factor) {
      setErrorMsg("Debes completar grupo sanguíneo y factor Rh.");
      return false;
    }

    if (form.last_donation_date) {
      const lastDate = new Date(form.last_donation_date);
      const diffMs = Date.now() - lastDate.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      if (diffDays < 60) {
        setErrorMsg("Deben pasar al menos 60 días desde la última donación.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");
    if (!validate()) return;

    // Mapeo al DTO del backend (CreateHealthQuestionnaireDto)
    const payload = {
      weight_kg: Number(form.weight),
      height_cm: Number(form.height),
      blood_type: form.blood_type, // A, B, AB, O
      rh_factor: form.rh_factor, // + o -

      last_donation_date: form.last_donation_date || undefined,

      // Si tiene fecha de última donación, asumimos que ya donó antes
      has_donated_before: Boolean(form.last_donation_date),

      // Si escribe enfermedades, marcamos que tiene enfermedad crónica
      has_chronic_disease:
        !!form.diseases && String(form.diseases).trim() !== "",

      // Si escribe medicación, marcamos que toma medicación
      is_taking_medication:
        !!form.medication && String(form.medication).trim() !== "",

      // Por ahora no mostramos campos en el formulario para estos,
      // pero el DTO los exige, así que enviamos false por defecto.
      had_recent_surgery: false,
      had_recent_tattoo_piercing: false,
      is_pregnant_or_breastfeeding: false,
      had_recent_travel_to_endemic_areas: false,
      has_risky_behavior: false,
      had_covid_recently: false,
      received_vaccine_recently: false,

      // Guardamos texto extra en notas
      additional_notes: [form.diseases, form.medication]
        .filter((x) => x && String(x).trim() !== "")
        .join(" | "),
    };

    try {
      const res = await createHealthQuestionnaire(payload).unwrap();
      const status = res.eligibility_status || res.status;
      setEligibility(status);
      setMessage("Cuestionario enviado correctamente.");
    } catch (error) {
      const msg = getErrorMessage(
        error,
        "Error al enviar el cuestionario. Inténtalo de nuevo.",
      );
      setErrorMsg(msg);
    }
  };

  return (
    <Box p={3} maxWidth={800} mx="auto">
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" mb={2}>
          Cuestionario de salud
        </Typography>

        {!loadingLast && eligibility && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Estado de elegibilidad actual: <strong>{eligibility}</strong>
          </Alert>
        )}

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

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Peso (kg)"
            name="weight"
            type="number"
            value={form.weight}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Altura (cm)"
            name="height"
            type="number"
            value={form.height}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Enfermedades"
            name="diseases"
            value={form.diseases}
            onChange={handleChange}
            margin="normal"
            multiline
            minRows={2}
          />

          <TextField
            fullWidth
            label="Medicación actual"
            name="medication"
            value={form.medication}
            onChange={handleChange}
            margin="normal"
            multiline
            minRows={2}
          />

          <TextField
            fullWidth
            type="date"
            label="Fecha de última donación"
            name="last_donation_date"
            value={form.last_donation_date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Box display="flex" gap={2}>
            <TextField
              select
              fullWidth
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
              fullWidth
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
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={submitting}
          >
            {submitting ? (
              <CircularProgress size={22} />
            ) : (
              "Guardar cuestionario"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default HealthQuestionnairePage;
