// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormProvider } from "react-hook-form";
import useLogin from "./hooks/useLogin";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { methods, onSubmit, isSubmitting } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f3f4f6",
        p: 3,
      }}
    >
      <Paper sx={{ width: 400, p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" mb={1} textAlign="center">
          Iniciar sesión
        </Typography>
        <Typography
          variant="body2"
          mb={3}
          textAlign="center"
          color="text.secondary"
        >
          Accedé a tu cuenta para gestionar tus donaciones
        </Typography>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label="Correo electrónico"
              type="email"
              margin="normal"
              autoComplete="email"
              {...register("email", {
                required: "El correo electrónico es obligatorio",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Contraseña"
              margin="normal"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Mostrar/ocultar contraseña"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
                mb: 2,
              }}
            >
              <Typography variant="body2">
                ¿No tenés cuenta? <Link to="/register">Registrate</Link>
              </Typography>
              <Typography variant="body2">
                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
              </Typography>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>
        </FormProvider>

        {/* Bloque de credenciales de prueba */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "#f9fafb",
            borderRadius: 1,
            border: "1px dashed #cbd5e1",
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            textAlign="center"
            gutterBottom
          >
            Credenciales de prueba (modo demo)
          </Typography>
          <Typography variant="caption" display="block" textAlign="center">
            Donante: <strong>donorr@example.com</strong> /{" "}
            <strong>Password123!</strong>
          </Typography>
          <Typography variant="caption" display="block" textAlign="center">
            Organizador: <strong>organizerr@example.com</strong> /{" "}
            <strong>Password123!</strong>
          </Typography>
          <Typography variant="caption" display="block" textAlign="center">
            Administrador: <strong>adminn@example.com</strong> /{" "}
            <strong>Password123!</strong>
          </Typography>
          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            mt={1}
            color="text.secondary"
          >
            (Recordá crear estos usuarios en tu base de datos para usarlos.)
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
