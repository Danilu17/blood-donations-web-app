import { Box, Button, Paper, Typography, Alert } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { FormProvider } from "react-hook-form";
import FormTextField from "../forms/FormTextField";
import FormSelectField from "../forms/FormSelectField";
import {
  BLOOD_TYPE_OPTIONS,
  USER_ROLE_OPTIONS,
} from "../../constants/blood-donation.constants";

function UserRegistrationForm({ form, onSubmit, isLoading, error }) {
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
          Registro de Usuario
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message || "Error al registrar usuario"}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={form.handleSubmit(onSubmit)}
          sx={{ "& > *": { mb: 0 } }}
        >
          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="name"
                label="Nombre Completo"
                required
                fullWidth
                rules={{
                  required: "El nombre es obligatorio",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="email"
                label="Correo Electrónico"
                required
                type="email"
                fullWidth
                rules={{
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email inválido",
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="password"
                label="Contraseña"
                required
                type="password"
                fullWidth
                rules={{
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="phone"
                label="Teléfono"
                required
                fullWidth
                rules={{
                  required: "El teléfono es obligatorio",
                }}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid size={{ xs: 12 }}>
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
                name="birth_date"
                label="Fecha de Nacimiento"
                required
                type="date"
                fullWidth
                rules={{
                  required: "La fecha de nacimiento es obligatoria",
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormSelectField
                name="blood_type"
                label="Tipo de Sangre"
                required
                options={BLOOD_TYPE_OPTIONS}
                fullWidth
                rules={{
                  required: "El tipo de sangre es obligatorio",
                }}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormSelectField
                name="role"
                label="Tipo de Usuario"
                required
                options={USER_ROLE_OPTIONS}
                fullWidth
                defaultValue="donor"
                rules={{
                  required: "Selecciona un tipo de usuario",
                }}
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
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </FormProvider>
  );
}

export default UserRegistrationForm;
