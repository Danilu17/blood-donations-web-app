import { Box, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import {
  useGenerateCampaignReportMutation,
  useGenerateDonationsSummaryMutation,
} from "../apis/reports.api";

const ReportsView = () => {
  const [
    generateCampaignReport,
    { data: campaignData, isLoading: loadingCampaign },
  ] = useGenerateCampaignReportMutation();
  const [generateSummary, { data: summaryData, isLoading: loadingSummary }] =
    useGenerateDonationsSummaryMutation();
  const [campaignId, setCampaignId] = useState("");

  const handleCampaignReport = async () => {
    if (!campaignId) return alert("Ingresa el ID de campaña");
    try {
      await generateCampaignReport(campaignId).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSummaryReport = async () => {
    try {
      await generateSummary().unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Reportes
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <input
          type="text"
          placeholder="ID de campaña"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <Button
          variant="contained"
          onClick={handleCampaignReport}
          disabled={loadingCampaign}
        >
          Generar reporte de campaña
        </Button>
        <Button
          variant="outlined"
          onClick={handleSummaryReport}
          disabled={loadingSummary}
        >
          Generar resumen global
        </Button>
      </Stack>
      {campaignData && (
        <pre
          style={{
            background: "#f9fafb",
            padding: "1rem",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
          {JSON.stringify(campaignData.data, null, 2)}
        </pre>
      )}
      {summaryData && (
        <pre
          style={{
            background: "#f9fafb",
            padding: "1rem",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
          {JSON.stringify(summaryData.data, null, 2)}
        </pre>
      )}
    </Box>
  );
};

export default ReportsView;
