import { Box, Typography, Button } from "@mui/material";

const DonationStatusDetails = ({ donation, updateStatus }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "#f9fafb",
        mb: 1.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography fontWeight={600}>{donation.donorName}</Typography>
        <Typography variant="caption" color="text.secondary">
          {donation.donorEmail} – Grupo {donation.bloodType}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              donation.donationStatus === "COMPLETADA" ? "#16a34a" : "#2563eb",
            "&:hover": {
              backgroundColor:
                donation.donationStatus === "COMPLETADA"
                  ? "#15803d"
                  : "#1d4ed8",
            },
          }}
          onClick={() => updateStatus(donation.id, "COMPLETADA")}
        >
          Completada
        </Button>

        <Button
          variant="outlined"
          sx={{
            borderColor:
              donation.donationStatus === "RECHAZADA" ? "#dc2626" : "#d1d5db",
            color:
              donation.donationStatus === "RECHAZADA" ? "#dc2626" : "#374151",
            "&:hover": {
              backgroundColor: "#fef2f2",
              borderColor: "#b91c1c",
              color: "#b91c1c",
            },
          }}
          onClick={() => updateStatus(donation.id, "RECHAZADA")}
        >
          Rechazada
        </Button>
      </Box>
    </Box>
  );
};

export default DonationStatusDetails;
