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
import { register as registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    dni: "",
    birth_date: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    accepts_terms: false,
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

    // Validaciones del frontend
    if (!form.accepts_terms) {
      return setErrorMsg(
        "Debés aceptar el consentimiento informado para registrarte.",
      );
    }

    if (form.password !== form.confirmPassword) {
      return setErrorMsg("Las contraseñas no coinciden.");
    }

    setLoading(true);

    try {
      const res = await registerUser({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        dni: form.dni.trim(),
        birth_date: form.birth_date,
        gender: form.gender,
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        password: form.password,
        accepts_terms: form.accepts_terms,
      });

      setInfoMsg(res.data.message || "Registro exitoso.");

      setTimeout(() => navigate("/login"), 1500);
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
        p: 3,
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
              required
            />
            <TextField
              fullWidth
              label="Apellido"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
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
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              select
              fullWidth
              label="Género"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <MenuItem value="female">Femenino</MenuItem>
              <MenuItem value="male">Masculino</MenuItem>
              <MenuItem value="other">Otro / No binario</MenuItem>
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

          <Box
            sx={{
              backgroundColor: "#fff7e6",
              border: "1px solid #ffe0b2",
              borderRadius: 1,
              p: 2,
              mt: 2,
              fontSize: "0.85rem",
            }}
          >
            <strong>Consentimiento informado:</strong>
            <p>
              Autorizo el uso de mis datos personales para la creación y gestión
              de mi cuenta, de acuerdo con la Ley de Protección de Datos
              Personales. Comprendo que mi información será utilizada para
              validar mi identidad, registrar donaciones y comunicarme sobre
              campañas relevantes.
            </p>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                name="accepts_terms"
                checked={form.accepts_terms}
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
