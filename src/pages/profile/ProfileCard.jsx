import { Box, Typography, Divider } from "@mui/material";

const ProfileCard = ({ user }) => {
  return (
    <Box sx={{ p: 2 }}>
      {/* Nombre */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
        {user.name}
      </Typography>

      {/* Email */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {user.email}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Rol */}
      <Typography sx={{ mb: 1 }}>
        <strong>Rol:</strong> {user.role?.toUpperCase()}
      </Typography>

      {/* Grupo sanguíneo */}
      <Typography sx={{ mb: 1 }}>
        <strong>Grupo sanguíneo:</strong> {user.bloodType}
      </Typography>

      {/* Estado de elegibilidad */}
      <Typography sx={{ mb: 1 }}>
        <strong>Elegibilidad:</strong>{" "}
        <span
          style={{
            color:
              user.eligibilityStatus === "APTO"
                ? "#16a34a"
                : user.eligibilityStatus === "NO_APTO"
                  ? "#dc2626"
                  : "#eab308",
          }}
        >
          {user.eligibilityStatus}
        </span>
      </Typography>

      {/* Nivel y Puntos */}
      <Typography sx={{ mb: 1 }}>
        <strong>Nivel:</strong> {user.level}
      </Typography>

      <Typography>
        <strong>Puntos:</strong> {user.points}
      </Typography>
    </Box>
  );
};

export default ProfileCard;
