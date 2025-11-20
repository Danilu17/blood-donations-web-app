// src/pages/organizer/CreateCampaignView.jsx
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Box } from "@mui/material";

import { useCreateCampaignMutation } from "../../apis/campaigns.api";
import FormTextField from "../../components/forms/FormTextField";
// Si después querés selects específicos, podés usar también:
// import FormSelectField from "../../components/form/FormSelectField.jsx";

function CreateCampaignView() {
  const navigate = useNavigate();
  const [createCampaign, { isLoading }] = useCreateCampaignMutation();

  // Hook del formulario (acá podés agregar validaciones más adelante)
  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      location: "",
      max_donors: "",
    },
  });

  const { handleSubmit } = methods;

  // Envío final del formulario
  const onSubmit = async (data) => {
    try {
      // Ajustá los nombres de campos si tu backend usa otros DTOs
      await createCampaign(data).unwrap();

      // Después de crear la campaña, redirigimos al organizador
      navigate("/organizer/donations", { replace: true });
    } catch (error) {
      console.error(error);
      alert(error?.data?.message || "Ocurrió un error al crear la campaña.");
    }
  };

  const handleBack = () => {
    navigate("/organizer", { replace: true });
  };

  return (
    <FormProvider {...methods}>
      <Paper
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormTextField
            name="title"
            label="Título de la campaña"
            placeholder="Ej: Colecta en Hospital Central"
            fullWidth
          />

          <Box sx={{ mb: 0 }}>
            <FormTextField
              name="description"
              label="Descripción"
              placeholder="Breve descripción de la campaña..."
              multiline
              rows={3}
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 0 }}>
            <FormTextField
              name="start_date"
              label="Fecha de inicio"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 0 }}>
            <FormTextField
              name="end_date"
              label="Fecha de fin"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 0 }}>
            <FormTextField
              name="location"
              label="Lugar / Centro de donación"
              placeholder="Ej: Hospital Italiano, Av. X 1234"
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 0 }}>
            <FormTextField
              name="max_donors"
              label="Cupo máximo de donantes"
              type="number"
              placeholder="Ej: 50"
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: "none",
              }}
              onClick={handleBack}
            >
              Atrás
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: "none",
              }}
            >
              {isLoading ? "Creando..." : "Crear campaña"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </FormProvider>
  );
}

export default CreateCampaignView;
