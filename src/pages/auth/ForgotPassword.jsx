// src/pages/auth/ForgotPassword.jsx
import { useForm } from "react-hook-form";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Enviar email de recuperación:", data);
    alert("Si el correo existe, recibirás instrucciones.");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Recuperar contraseña
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Correo electrónico"
            margin="normal"
            {...register("email")}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Enviar enlace
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
