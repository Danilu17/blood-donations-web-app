import { Box, Grid, Button, Paper, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form";

import FormTextField from "../../components/forms/FormTextField";
import FormSelectField from "../../components/forms/FormSelectField";

const BLOOD_TYPES_OPTIONS = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

function CreateCampaignForm({ form, onSubmit, centers, isLoading }) {
  return (
    <FormProvider {...form}>
      <Paper
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          Crear Nueva Campaña
        </Typography>

        <Box
          component="form"
          onSubmit={form.handleSubmit(onSubmit)}
          sx={{ "& > *": { mb: 0.01 } }}
        >
          {/* NOMBRE Y CENTRO */}
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid xs={12} md={6}>
              <FormTextField
                name="name"
                label="Nombre de la campaña"
                required
                fullWidth
              />
            </Grid>

            <Grid xs={12} md={6}>
              <FormSelectField
                name="centerId"
                label="Centro de Donación"
                required
                options={centers}
                fullWidth
              />
            </Grid>
          </Grid>

          {/* DESCRIPCIÓN */}
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid xs={12}>
              <FormTextField
                name="description"
                label="Descripción"
                required
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
          </Grid>

          {/* FECHA Y HORARIOS */}
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid xs={12} md={4}>
              <FormTextField
                name="date"
                label="Fecha"
                required
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={4}>
              <FormTextField
                name="startTime"
                label="Hora de inicio"
                required
                type="time"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid xs={12} md={4}>
              <FormTextField
                name="endTime"
                label="Hora de fin"
                required
                type="time"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>

          {/* REQUISITOS */}
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid xs={12} md={4}>
              <FormTextField
                name="minAge"
                label="Edad mínima"
                required
                type="number"
                fullWidth
              />
            </Grid>

            <Grid xs={12} md={4}>
              <FormTextField
                name="maxAge"
                label="Edad máxima"
                required
                type="number"
                fullWidth
              />
            </Grid>

            <Grid xs={12} md={4}>
              <FormTextField
                name="minWeight"
                label="Peso mínimo"
                required
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>

          {/* GRUPOS SANGUÍNEOS */}
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid xs={12}>
              <FormSelectField
                name="requiredBloodTypes"
                label="Grupos sanguíneos solicitados"
                required
                multiple
                options={BLOOD_TYPES_OPTIONS}
                fullWidth
              />
            </Grid>
          </Grid>

          {/* CUPOS */}
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid xs={12} md={6}>
              <FormTextField
                name="slotsTotal"
                label="Cupos totales"
                required
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>

          {/* BOTONES */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 2 }}
          >
            <Button
              variant="outlined"
              sx={{
                color: "#374151",
                borderColor: "#d1d5db",
                "&:hover": {
                  borderColor: "#9ca3af",
                  backgroundColor: "#f9fafb",
                },
                borderRadius: 2,
                px: 4,
              }}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: "#2563eb",
                "&:hover": {
                  backgroundColor: "#1d4ed8",
                },
                borderRadius: 2,
                px: 4,
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

export default CreateCampaignForm;
