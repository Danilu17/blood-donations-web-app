// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../stores/user/slice.js";

const USERS_STORAGE_KEY = "mock_users";

function findUserByEmail(email) {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]");
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data) => {
    setLoginError("");
    setIsSubmitting(true);

    const { email, password } = data;

    // 1) Intentamos encontrar un usuario registrado en localStorage
    const user = findUserByEmail(email);

    if (user) {
      if (user.password !== password) {
        setIsSubmitting(false);
        setLoginError("Contraseña incorrecta.");
        return;
      }
      const loggedUser = {
        ...user,
        password: undefined,
      };
      dispatch(setUser(loggedUser));
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/");
      }, 500);
      return;
    }

    // 2) Si no existe en mock_users, usamos usuarios de DEMO por mail
    let role = "donor";
    if (email === "organizerr@example.com") role = "organizer";
    if (email === "adminn@example.com") role = "admin";
    if (email === "volunteerr@example.com") role = "volunteer";
    if (email === "beneficiaryy@example.com") role = "beneficiary";

    const demoUser = {
      id: "demo-user",
      first_name: "Demo",
      last_name: "User",
      email,
      role,
    };

    dispatch(setUser(demoUser));
    localStorage.setItem("user", JSON.stringify(demoUser));

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/");
    }, 500);
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

            {loginError && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mt: 1, mb: 1 }}
                textAlign="center"
              >
                {loginError}
              </Typography>
            )}

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
            Donante (demo): <strong>donorr@example.com</strong> /{" "}
            <strong>Cualquier contraseña</strong>
          </Typography>
          <Typography variant="caption" display="block" textAlign="center">
            Organizador (demo): <strong>organizerr@example.com</strong> /{" "}
            <strong>Cualquier contraseña</strong>
          </Typography>
          <Typography variant="caption" display="block" textAlign="center">
            Administrador (demo): <strong>adminn@example.com</strong> /{" "}
            <strong>Cualquier contraseña</strong>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
