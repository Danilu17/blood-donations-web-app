import { Box, Typography, Divider, Button } from "@mui/material";
import { useSelector } from "react-redux";

const DonationCertificate = ({ donation }) => {
  const user = useSelector((state) => state.user);

  const handleDownload = () => {
    alert("Descargar certificado (mock)");
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={1}>
        Certificado de Donación
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Donante:</strong> {user.name}
      </Typography>
      <Typography>
        <strong>Email:</strong> {user.email}
      </Typography>
      <Typography>
        <strong>Grupo sanguíneo:</strong> {user.bloodType}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Fecha de donación:</strong> {donation.date}
      </Typography>
      <Typography>
        <strong>Centro:</strong> {donation.centerName}
      </Typography>
      <Typography>
        <strong>Dirección:</strong> {donation.address}
      </Typography>
      <Typography>
        <strong>Tipo de donación:</strong> {donation.type}
      </Typography>
      <Typography>
        <strong>Volumen:</strong> {donation.volume}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#dc2626",
          "&:hover": { backgroundColor: "#b91c1c" },
        }}
        onClick={handleDownload}
      >
        Descargar certificado
      </Button>
    </Box>
  );
};

export default DonationCertificate;
