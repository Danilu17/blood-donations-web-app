import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { FormProvider } from "react-hook-form";
import FormTextField from "../../components/forms/FormTextField";
import FormSelectField from "../../components/forms/FormSelectField";
import {
  BLOOD_GROUP_OPTIONS,
  RH_FACTOR_OPTIONS,
  CHRONIC_DISEASES_OPTIONS,
  MEDICATIONS_OPTIONS,
} from "../../constants/questionnaire.constants";

function HealthQuestionnaireForm({ form, onSubmit, isLoading }) {
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
          Cuestionario de Salud
        </Typography>

        <Box
          component="form"
          onSubmit={form.handleSubmit(onSubmit)}
          sx={{ "& > *": { mb: 0.01 } }}
        >
          {/* PESO */}
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid xs={12} md={6}>
              <FormTextField
                name="weight"
                label="Peso (kg)"
                required
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>

          {/* ENFERMEDADES */}
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid xs={12} md={6}>
              <FormSelectField
                name="diseases"
                label="Enfermedades crónicas"
                required
                options={CHRONIC_DISEASES_OPTIONS}
                fullWidth
                multiple
              />
            </Grid>

            <Grid xs={12} md={6}>
              <FormSelectField
                name="medications"
                label="Medicaciones actuales"
                required
                options={MEDICATIONS_OPTIONS}
                fullWidth
                multiple
              />
            </Grid>
          </Grid>

          {/* FECHA ÚLTIMA DONACIÓN */}
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid xs={12} md={6}>
              <FormTextField
                name="lastDonation"
                label="Fecha de última donación"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
            </Grid>
          </Grid>

          {/* GRUPO Y FACTOR */}
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid xs={12} md={6}>
              <FormSelectField
                name="bloodGroup"
                label="Grupo sanguíneo"
                required
                options={BLOOD_GROUP_OPTIONS}
                fullWidth
              />
            </Grid>

            <Grid xs={12} md={6}>
              <FormSelectField
                name="rhFactor"
                label="Factor"
                required
                options={RH_FACTOR_OPTIONS}
                fullWidth
              />
            </Grid>
          </Grid>

          {/* BOTONES */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              pt: 2,
            }}
          >
            <Button
              type="button"
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
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </FormProvider>
  );
}

export default HealthQuestionnaireForm;
