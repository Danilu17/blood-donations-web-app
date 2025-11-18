import { useState } from "react";
import {
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormProvider } from "react-hook-form";

import FormTextField from "../../components/forms/FormTextField";
import useLogin from "./hooks/useLogin";
import styles from "./Login.module.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { methods, onSubmit, isSubmitting } = useLogin();

  return (
    <div className={styles.loginContainer}>
      <Paper className={styles.loginCard} elevation={3}>
        {/* Header */}
        <div className={styles.loginHeader}>
          <Typography variant="h4" className={styles.loginTitle}>
            🩸 DonaHoy
          </Typography>
          <Typography variant="body1" className={styles.loginSubtitle}>
            Sistema de Gestión de Donación de Sangre
          </Typography>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form
            className={styles.loginForm}
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
          >
            <FormTextField
              name="email"
              label="Correo electrónico"
              variant="outlined"
              type="email"
              rules={{ required: "El correo electrónico es requerido" }}
            />

            <FormTextField
              name="password"
              label="Contraseña"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              rules={{ required: "La contraseña es requerida" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#dc2626",
                "&:hover": { backgroundColor: "#b91c1c" },
                mt: 1,
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>
        </FormProvider>

        {/* Credenciales mock */}
        <Box className={styles.loginFooter}>
          <Typography variant="body2">Credenciales de prueba:</Typography>
          <Typography variant="caption">
            donor@example.com / password
          </Typography>
          <Typography variant="caption">
            organizer@example.com / password
          </Typography>
          <Typography variant="caption">
            volunteer@example.com / password
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}

export default Login;
