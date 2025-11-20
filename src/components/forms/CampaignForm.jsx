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

export default function CampaignForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    title: "", // Si usas ProposeCampaignDto
    description: "", // Si usas ProposeCampaignDto
    location: "",
    address: "",
    campaign_date: "",
    start_date: "", // Si usas ProposeCampaignDto
    end_date: "", // Si usas ProposeCampaignDto
    start_time: "",
    end_time: "",
    max_donors: "",
    requirements: "", // Si usas ProposeCampaignDto
    contact_info: "", // Si usas ProposeCampaignDto
  });

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
      case "title":
        if (!value || value.length < 3) {
          newErrors[name] = "Debe tener al menos 3 caracteres";
        } else if (value.length > 255) {
          newErrors[name] = "No debe exceder 255 caracteres";
        } else {
          delete newErrors[name];
        }
        break;

      case "description":
        if (value && value.length > 2000) {
          newErrors[name] = "No debe exceder 2000 caracteres";
        } else {
          delete newErrors[name];
        }
        break;

      case "location":
      case "address":
        if (!value || value.length < 3) {
          newErrors[name] = "Debe tener al menos 3 caracteres";
        } else if (value.length > 255) {
          newErrors[name] = "No debe exceder 255 caracteres";
        } else {
          delete newErrors[name];
        }
        break;

      case "campaign_date":
      case "start_date":
      case "end_date":
        if (!value) {
          newErrors[name] = "La fecha es obligatoria";
        } else {
          // Validar formato ISO 8601 (YYYY-MM-DD)
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(value)) {
            newErrors[name] = "Formato de fecha inválido (YYYY-MM-DD)";
          } else {
            delete newErrors[name];
          }
        }
        break;

      case "start_time":
      case "end_time":
        if (!value) {
          newErrors[name] = "La hora es obligatoria";
        } else {
          // Validar formato HH:MM (24 horas)
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
        if (!value || isNaN(num)) {
          newErrors[name] = "Debe ser un número";
        } else if (num < 1) {
          newErrors[name] = "Debe ser al menos 1";
        } else {
          delete newErrors[name];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    // Validar todos los campos
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        validateField(key, formData[key]);
      }
    });

    // Si hay errores, no enviar
    if (Object.keys(errors).length > 0) {
      setApiError("Por favor corrige los errores en el formulario");
      return;
    }

    try {
      // Preparar datos según el DTO que uses
      // Opción 1: CreateCampaignDto
      const createCampaignPayload = {
        name: formData.name,
        location: formData.location,
        address: formData.address,
        campaign_date: formData.campaign_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        max_donors: parseInt(formData.max_donors),
      };

      // Opción 2: ProposeCampaignDto
      const proposeCampaignPayload = {
        name: formData.title || formData.name,
        description: formData.description,
        campaign_date: formData.campaign_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        location: formData.location,
        max_donors: parseInt(formData.max_donors),
        requirements: formData.requirements || undefined,
        contact_info: formData.contact_info || undefined,
      };

      // Usa el payload apropiado según tu endpoint
      const payload = createCampaignPayload; // o proposeCampaignPayload

      // const response = await fetch("/api/campaigns", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      //   },
      //   body: JSON.stringify(payload),
      // });

      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message || "Error al crear la campaña");
      // }

      // Redirigir al listado
      navigate("/organizer");
    } catch (error) {
      console.error("Error:", error);
      setApiError(error.message);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Crear Nueva Campaña
      </Typography>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Nombre de la campaña *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name || "Mínimo 3 caracteres, máximo 255"}
          margin="normal"
          inputProps={{ minLength: 3, maxLength: 255 }}
        />

        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description || "Opcional, máximo 2000 caracteres"}
          margin="normal"
          multiline
          rows={3}
          inputProps={{ maxLength: 2000 }}
        />

        <TextField
          fullWidth
          label="Lugar / Centro de donación *"
          name="location"
          value={formData.location}
          onChange={handleChange}
          error={!!errors.location}
          helperText={errors.location || "Ej: Hospital Juan A. Fernandez"}
          margin="normal"
          inputProps={{ minLength: 3, maxLength: 255 }}
        />

        <TextField
          fullWidth
          label="Dirección *"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address || "Ej: Cerviño 3356, CABA"}
          margin="normal"
          inputProps={{ minLength: 3, maxLength: 255 }}
        />

        <TextField
          fullWidth
          type="date"
          label="Fecha de campaña *"
          name="campaign_date"
          value={formData.campaign_date}
          onChange={handleChange}
          error={!!errors.campaign_date}
          helperText={errors.campaign_date || "Formato: YYYY-MM-DD"}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            type="time"
            label="Hora de inicio *"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            error={!!errors.start_time}
            helperText={errors.start_time || "Formato 24h: HH:MM"}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }} // 5 minutos
          />

          <TextField
            fullWidth
            type="time"
            label="Hora de fin *"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            error={!!errors.end_time}
            helperText={errors.end_time || "Formato 24h: HH:MM"}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
          />
        </Box>

        <TextField
          fullWidth
          type="number"
          label="Cupo máximo de donantes *"
          name="max_donors"
          value={formData.max_donors}
          onChange={handleChange}
          error={!!errors.max_donors}
          helperText={errors.max_donors || "Mínimo 1"}
          margin="normal"
          inputProps={{ min: 1 }}
        />

        <TextField
          fullWidth
          label="Requisitos"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          helperText="Opcional"
          margin="normal"
          multiline
          rows={2}
        />

        <TextField
          fullWidth
          label="Información de contacto"
          name="contact_info"
          value={formData.contact_info}
          onChange={handleChange}
          helperText="Opcional"
          margin="normal"
        />

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate("/organizer")}
            fullWidth
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={Object.keys(errors).length > 0}
          >
            Crear Campaña
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
