import { Box, Grid, Button, Paper, Typography, Alert } from "@mui/material";
import { FormProvider } from "react-hook-form";
import FormTextField from "../forms/FormTextField";
import FormSelectField from "../forms/FormSelectField";
import { CAMPAIGN_STATUS_OPTIONS } from "../../constants/blood-donation.constants";

function CampaignForm({ form, onSubmit, isLoading, error, organizerId }) {
  return (
    <FormProvider {...form}>
      <Paper
        sx={{
          maxWidth: 800,
          mx: "auto",
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Nueva Campaña de Donación
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message || "Error al crear campaña"}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={form.handleSubmit((data) =>
            onSubmit({ ...data, organizerId }),
          )}
          sx={{ "& > *": { mb: 0 } }}
        >
          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid size={{ xs: 12 }}>
              <FormTextField
                name="name"
                label="Nombre de la Campaña"
                required
                fullWidth
                rules={{
                  required: "El nombre es obligatorio",
                }}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid size={{ xs: 12 }}>
              <FormTextField
                name="description"
                label="Descripción"
                required
                fullWidth
                multiline
                rows={3}
                rules={{
                  required: "La descripción es obligatoria",
                }}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="location"
                label="Lugar"
                required
                fullWidth
                rules={{
                  required: "El lugar es obligatorio",
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="address"
                label="Dirección"
                required
                fullWidth
                rules={{
                  required: "La dirección es obligatoria",
                }}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="start_date"
                label="Fecha de Inicio"
                required
                type="date"
                fullWidth
                rules={{
                  required: "La fecha de inicio es obligatoria",
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="end_date"
                label="Fecha de Fin"
                required
                type="date"
                fullWidth
                rules={{
                  required: "La fecha de fin es obligatoria",
                }}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="start_time"
                label="Hora de Inicio"
                required
                type="time"
                fullWidth
                rules={{
                  required: "La hora de inicio es obligatoria",
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="end_time"
                label="Hora de Fin"
                required
                type="time"
                fullWidth
                rules={{
                  required: "La hora de fin es obligatoria",
                }}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid size={{ xs: 12 }}>
              <FormTextField
                name="requirements"
                label="Requisitos"
                required
                fullWidth
                multiline
                rows={2}
                rules={{
                  required: "Los requisitos son obligatorios",
                }}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="max_donors"
                label="Máximo de Donantes"
                required
                type="number"
                fullWidth
                defaultValue="50"
                rules={{
                  required: "El máximo de donantes es obligatorio",
                  min: { value: 1, message: "Mínimo 1 donante" },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormSelectField
                name="status"
                label="Estado"
                options={CAMPAIGN_STATUS_OPTIONS}
                fullWidth
                defaultValue="scheduled"
              />
            </Grid>
          </Grid>

          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: "#dc2626",
                "&:hover": { backgroundColor: "#b91c1c" },
                borderRadius: 2,
                px: 4,
                py: 1.5,
              }}
            >
              {isLoading ? "Creando..." : "Crear Campaña"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </FormProvider>
  );
}

export default CampaignForm;
