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
} from "@mui/material";
import useLogin from "./hooks/useLogin";

function Login() {
  const { methods, onSubmit, isSubmitting } = useLogin();
  const { register, handleSubmit } = methods;
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (data) => {
    setErrorMsg("");
    try {
      await onSubmit(data);
    } catch (error) {
      setErrorMsg(error?.message || "Error al iniciar sesión");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f3f4f6",
      }}
    >
      <Paper sx={{ width: 400, p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit(submit)}>
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            margin="normal"
            {...register("email", { required: "El correo es requerido" })}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
          />
          {errorMsg && (
            <Typography color="error" variant="body2">
              {errorMsg}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={22} /> : "Entrar"}
          </Button>
        </form>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="body2">
            ¿No tenés cuenta? <Link to="/register">Registrate</Link>
          </Typography>
          <Typography variant="body2">
            <Link to="/forgot-password">Olvidé mi contraseña</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
