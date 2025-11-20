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
        p: 3,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* Header con avatar + nombre */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 56,
            height: 56,
            fontWeight: 600,
            fontSize: 24,
          }}
        >
          {initials}
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {fullName || "Usuario"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email || "Sin email registrado"}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Información principal */}
      <Stack spacing={1.5}>
        <InfoRow label="Rol" value={user.role?.toUpperCase() || "SIN ROL"} />

        <InfoRow
          label="Grupo sanguíneo"
          value={user.bloodType || "Sin registrar"}
        />

        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500, mb: 0.5 }}
          >
            Elegibilidad
          </Typography>
          <Chip
            size="small"
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
      sx={{ fontWeight: 500, mb: 0.2 }}
    >
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

export default ProfileCard;
