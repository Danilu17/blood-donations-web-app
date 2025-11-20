// src/pages/auth/ResetPassword.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useResetPasswordMutation } from "../../apis/auth.api";

export default function ResetPassword() {
  const { token } = useParams();
  const [resetPassword] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      const res = await resetPassword({
        token,
        newPassword: password,
      }).unwrap();
      setMessage(res.message || "Contraseña actualizada correctamente.");
    } catch (err) {
      const msg = err?.data?.message || "Error al restablecer la contraseña.";
      setError(msg);
    }
  };

  if (!token) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography>Token inválido o faltante.</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Restablecer contraseña
        </Typography>
        {message ? (
          <>
            <Typography gutterBottom>{message}</Typography>
            <Button variant="contained" component={Link} to="/login">
              Ir a iniciar sesión
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nueva contraseña"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Confirmar contraseña"
              type="password"
              margin="normal"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
              Guardar
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
}
