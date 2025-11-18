import { Box, Paper, Typography } from "@mui/material";
import GenericTable from "../../components/GenericTable";
import { useMockDonations } from "../../hooks/useMockDonations";
import DonationCertificate from "./DonationCertificate";

const MyDonationsView = () => {
  const { donations, selectedDonation, handleSelect } = useMockDonations();

  const columns = [
    { id: "date", label: "Fecha" },
    { id: "centerName", label: "Centro" },
    { id: "address", label: "Dirección" },
    { id: "type", label: "Tipo" },
    { id: "status", label: "Estado" },
  ];

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Mis Donaciones
      </Typography>

      <GenericTable
        title="Historial de donaciones"
        subtitle="Registro de tus últimas donaciones realizadas"
        columns={columns}
        data={donations}
        isLoading={false}
        isError={false}
        onRowClick={handleSelect}
      />

      {/* CERTIFICADO */}
      {selectedDonation && (
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ mt: 3, p: 2, borderRadius: 2 }}
        >
          <DonationCertificate donation={selectedDonation} />
        </Paper>
      )}
    </Box>
  );
};

export default MyDonationsView;
