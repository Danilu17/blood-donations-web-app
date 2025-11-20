import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCreateCampaignMutation } from "../../apis/campaigns.api";

export default function CreateCampaignView() {
  const navigate = useNavigate();
  const [createCampaign, { isLoading }] = useCreateCampaignMutation();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    campaign_date: "",
    start_time: "",
    end_time: "",
    max_donors: "",
  });

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
      case "location":
      case "address":
        if (!value || value.trim().length < 3) {
          newErrors[name] = "Debe tener al menos 3 caracteres";
        } else if (value.length > 255) {
          newErrors[name] = "No debe exceder 255 caracteres";
        } else {
          delete newErrors[name];
        }
        break;

      case "campaign_date":
        if (!value) {
          newErrors[name] = "La fecha es obligatoria";
        } else {
          delete newErrors[name];
        }
        break;

      case "start_time":
      case "end_time":
        if (!value) {
          newErrors[name] = "La hora es obligatoria";
        } else {
          const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
          if (!timeRegex.test(value)) {
            newErrors[name] = "Formato de hora inválido (HH:MM)";
          } else {
            delete newErrors[name];
          }
        }
        break;

      case "max_donors":
        const num = parseInt(value);
        if (!value || isNaN(num) || num < 1) {
          newErrors[name] = "Debe ser un número mayor a 0";
        } else {
          delete newErrors[name];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const requiredFields = [
      "name",
      "location",
      "address",
      "campaign_date",
      "start_time",
      "end_time",
      "max_donors",
    ];
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    if (!isValid || Object.keys(errors).length > 0) {
      setApiError("Por favor completa todos los campos correctamente");
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        location: formData.location.trim(),
        address: formData.address.trim(),
        campaign_date: formData.campaign_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        max_donors: parseInt(formData.max_donors),
      };

      console.log("Enviando payload:", payload);

      const result = await createCampaign(payload).unwrap();
      console.log("Campaña creada:", result);

      navigate("/organizer");
    } catch (error) {
      console.error("Error al crear campaña:", error);

      if (error.data?.message) {
        if (Array.isArray(error.data.message)) {
          setApiError(error.data.message.join(", "));
        } else {
          setApiError(error.data.message);
        }
      } else {
        setApiError("Error al crear la campaña. Por favor intenta nuevamente.");
      }
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Crear Nueva Campaña
      </Typography>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setApiError("")}>
          {apiError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          required
          label="Nombre de la campaña"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          label="Lugar / Centro de donación"
          name="location"
          value={formData.location}
          onChange={handleChange}
          error={!!errors.location}
          helperText={errors.location}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          type="date"
          label="Fecha de campaña"
          name="campaign_date"
          value={formData.campaign_date}
          onChange={handleChange}
          error={!!errors.campaign_date}
          helperText={errors.campaign_date}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            required
            type="time"
            label="Hora de inicio"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            error={!!errors.start_time}
            helperText={errors.start_time}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
          />

          <TextField
            fullWidth
            required
            type="time"
            label="Hora de fin"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            error={!!errors.end_time}
            helperText={errors.end_time}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
          />
        </Box>

        <TextField
          fullWidth
          required
          type="number"
          label="Cupo máximo de donantes"
          name="max_donors"
          value={formData.max_donors}
          onChange={handleChange}
          error={!!errors.max_donors}
          helperText={errors.max_donors}
          margin="normal"
          inputProps={{ min: 1 }}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate("/organizer")}
            fullWidth
            disabled={isLoading}
          >
            Atrás
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading || Object.keys(errors).length > 0}
          >
            {isLoading ? "Creando..." : "Crear campaña"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
