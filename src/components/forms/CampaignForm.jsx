// src/pages/organizer/CampaignForm.jsx
import { FormProvider, Controller } from "react-hook-form";
import { Box, Paper, Typography, TextField, Button, Grid } from "@mui/material";

function CampaignForm({ form, onSubmit, isSubmitting }) {
  const { handleSubmit, control } = form;

  return (
    <FormProvider {...form}>
      <Paper
        sx={{
          maxWidth: 900,
          mx: "auto",
          mt: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" mb={2}>
          Crear campaña de donación
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            {/* Título */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "El título es obligatorio" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Título de la campaña"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            {/* Descripción */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: "La descripción es obligatoria" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Descripción"
                    fullWidth
                    multiline
                    minRows={3}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            {/* Fecha inicio */}
            <Grid item xs={12} md={6}>
              <Controller
                name="start_date"
                control={control}
                rules={{ required: "La fecha de inicio es obligatoria" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Fecha de inicio"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            {/* Fecha fin */}
            <Grid item xs={12} md={6}>
              <Controller
                name="end_date"
                control={control}
                rules={{ required: "La fecha de fin es obligatoria" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Fecha de fin"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            {/* Ubicación */}
            <Grid item xs={12}>
              <Controller
                name="location"
                control={control}
                rules={{ required: "La ubicación es obligatoria" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Lugar / dirección"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            {/* Cupo máximo de donantes */}
            <Grid item xs={12} md={6}>
              <Controller
                name="max_donors"
                control={control}
                rules={{ required: "El cupo es obligatorio" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Cupo máximo de donantes"
                    type="number"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Crear campaña"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </FormProvider>
  );
}

export default CampaignForm;
