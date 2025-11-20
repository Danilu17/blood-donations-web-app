import { Box, Typography, Paper, Button, Stack } from "@mui/material";
import GenericTable from "../../components/tables/GenericTable";
import { useParams } from "react-router-dom";
import { useDonationsManagement } from "../../hooks/useDonationsManagement";
import DonationStatusDetails from "./DonationStatusDetails";

const DonationsManagementView = () => {
  const { campaignId } = useParams();
  const { donations, updateStatus } = useDonationsManagement(campaignId);

  const columns = [
    { id: "donorName", label: "Donante" },
    { id: "donorEmail", label: "Correo" },
    { id: "bloodType", label: "Grupo" },
    { id: "eligibilityStatus", label: "Elegibilidad" },
    { id: "registrationDate", label: "Fecha registro" },
    { id: "donationStatus", label: "Estado" },
  ];

  const handleExport = () => {
    alert("Exportar reporte (mock)");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Gestionar Donaciones
      </Typography>

      <GenericTable
        title="Inscriptos a gestionar"
        subtitle="Marca qué donantes completaron o no su donación"
        columns={columns}
        data={donations}
        isLoading={false}
        isError={false}
      />

      <Stack direction="row" mt={2} mb={2} gap={2}>
        <Button
          variant="outlined"
          onClick={handleExport}
          sx={{
            borderColor: "#2563eb",
            color: "#2563eb",
            "&:hover": {
              backgroundColor: "#eff6ff",
              borderColor: "#1d4ed8",
              color: "#1d4ed8",
            },
          }}
        >
          Exportar reporte
        </Button>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Estado de cada donante
        </Typography>

        {donations.map((don) => (
          <DonationStatusDetails
            key={don.id}
            donation={don}
            updateStatus={updateStatus}
          />
        ))}
      </Paper>
    </Box>
  );
};

export default DonationsManagementView;
