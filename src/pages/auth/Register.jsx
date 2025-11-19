// src/pages/auth/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { register } from "../../services/authService";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    dni: "",
    birth_date: "",
    sex: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    acceptedConsent: false,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    if (!form.acceptedConsent) {
      setErrorMsg(
        "Debés aceptar el consentimiento informado para registrarte.",
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await register({
        first_name: form.first_name,
        last_name: form.last_name,
        dni: form.dni,
        birth_date: form.birth_date,
        sex: form.sex,
        email: form.email,
        phone: form.phone,
        address: form.address,
        password: form.password,
      });
      setInfoMsg(
        "Registro exitoso. Revisá tu correo para verificar la cuenta antes de iniciar sesión.",
      );
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Error al registrarse. Verificá los datos.";
      setErrorMsg(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setLoading(false);
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
      <Paper sx={{ width: 500, p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Registrarse
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Nombre"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Apellido"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Box>

          <TextField
            fullWidth
            label="DNI"
            name="dni"
            value={form.dni}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de nacimiento"
              name="birth_date"
              value={form.birth_date}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              select
              fullWidth
              label="Sexo"
              name="sex"
              value={form.sex}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="M">Masculino</MenuItem>
              <MenuItem value="F">Femenino</MenuItem>
              <MenuItem value="X">Otro / No binario</MenuItem>
            </TextField>
          </Box>

          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Dirección"
            name="address"
            value={form.address}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirmar contraseña"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                name="acceptedConsent"
                checked={form.acceptedConsent}
                onChange={handleChange}
              />
            }
            label="Acepto el consentimiento informado"
          />

          {errorMsg && (
            <Typography color="error" variant="body2" mt={1}>
              {errorMsg}
            </Typography>
          )}

          {infoMsg && (
            <Typography color="primary" variant="body2" mt={1}>
              {infoMsg}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Crear cuenta"}
          </Button>
        </form>

        <Box mt={2}>
          <Typography variant="body2">
            ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Register;
