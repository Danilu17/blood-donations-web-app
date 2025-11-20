// src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import { forgotPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async ({ email }) => {
    setError("");

    try {
      const res = await forgotPassword(email);

      const token = res.data.token;

      if (token && token.length > 0) {
        navigate(`/reset-password/${token}`);
      } else {
        navigate(`/reset-password/invalid`);
      }
    } catch {
      setError("Error al solicitar restablecimiento de contraseña.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Recuperar contraseña
        </Typography>

        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Correo electrónico"
            margin="normal"
            {...register("email", { required: true })}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Continuar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
