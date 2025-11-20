// src/pages/auth/ForgotPassword.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import { useForgotPasswordMutation } from "../../apis/auth.api";
import { useState } from "react";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const [forgotPassword] = useForgotPasswordMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async ({ email }) => {
    setError("");
    try {
      const res = await forgotPassword(email).unwrap();
      const { token } = res;
      if (token) {
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
