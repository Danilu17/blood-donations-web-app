import { Box, Typography, Divider, Chip, Avatar, Stack } from "@mui/material";

const ProfileCard = ({ user }) => {
  if (!user) return null;

  const fullName =
    user.name || `${user.first_name || ""} ${user.last_name || ""}`.trim();

  const initials = fullName
    ? fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase())
        .join("")
    : "?";

  const eligibilityStatus = user.eligibilityStatus || "PENDIENTE";

  const getEligibilityChipProps = () => {
    switch (eligibilityStatus) {
      case "APTO":
        return { label: "Apto para donar", color: "success" };
      case "NO_APTO":
        return { label: "No apto actualmente", color: "error" };
      default:
        return { label: "En evaluación", color: "warning" };
    }
  };

  const { label: eligibilityLabel, color: eligibilityColor } =
    getEligibilityChipProps();

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* Header con avatar + nombre */}
      <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 72,
            height: 72,
            fontWeight: 700,
            fontSize: 30,
          }}
        >
          {initials}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {fullName || "Usuario"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user.email || "Sin email registrado"}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 2.5 }} />

      {/* Información principal */}
      <Stack spacing={2}>
        <InfoRow label="Rol" value={user.role?.toUpperCase() || "SIN ROL"} />

        <InfoRow
          label="Grupo sanguíneo"
          value={user.bloodType || "Sin registrar"}
        />

        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 600, mb: 0.5 }}
          >
            Elegibilidad
          </Typography>
          <Chip
            size="medium"
            label={eligibilityLabel}
            color={eligibilityColor}
          />
        </Box>

        <InfoRow label="Nivel" value={user.level ?? 1} />
        <InfoRow label="Puntos" value={user.points ?? 0} />
      </Stack>
    </Box>
  );
};

// Componente interno para evitar repetir código
const InfoRow = ({ label, value }) => (
  <Box>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ fontWeight: 600, mb: 0.3 }}
    >
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

export default ProfileCard;
