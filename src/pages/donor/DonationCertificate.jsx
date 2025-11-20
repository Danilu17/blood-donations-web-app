// src/pages/donor/DonationCertificate.jsx
// Componente que muestra un certificado de donación y permite
// descargarlo (simulado) utilizando el backend en memoria. Cuando el
// usuario hace clic en "Descargar certificado" se genera un
// certificado con datos básicos y se muestra un mensaje.

import { Box, Typography, Divider, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { generateCertificate } from "../../mocks/mockBackend";

const DonationCertificate = ({ donation }) => {
  const user = useSelector((state) => state.user) || {};

  const handleDownload = () => {
    // Generamos un certificado utilizando la donación. Si no se ha
    // completado la donación, generateCertificate devolverá null.
    const cert = generateCertificate(donation?.id);
    if (!cert) {
      alert(
        "No se puede generar el certificado. Asegúrate de que la donación esté marcada como completada.",
      );
      return;
    }
    alert(
      `Certificado generado (mock). ID: ${cert.certificateId}\nFecha: ${cert.donationDetails.date}`,
    );
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={1}>
        Certificado de Donación
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Donante:</strong> {user.name || "Sin nombre"}
      </Typography>
      <Typography>
        <strong>Email:</strong> {user.email || "Sin correo"}
      </Typography>
      <Typography>
        <strong>Grupo sanguíneo:</strong> {user.bloodType || "-"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Fecha de donación:</strong> {donation?.date || "-"}
      </Typography>
      <Typography>
        <strong>Centro:</strong> {donation?.centerName || "-"}
      </Typography>
      <Typography>
        <strong>Dirección:</strong> {donation?.address || "-"}
      </Typography>
      <Typography>
        <strong>Tipo de donación:</strong> {donation?.type || "-"}
      </Typography>
      <Typography>
        <strong>Volumen:</strong> {donation?.volume || "-"}
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
