// src/pages/organizer/CampaignDonationsView.jsx
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
  Stack,
  Button,
  Alert,
  IconButton,
  TextField,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCampaignEnrollmentsQuery } from "../../apis/enrollments.api";
import { useGetCampaignByIdQuery } from "../../apis/campaigns.api";
import {
  useCreateDonationMutation,
  useGenerateCertificateMutation,
} from "../../apis/donations.api";
import { useState } from "react";

const CampaignDonationsView = () => {
  const { id: campaignId } = useParams();
  const navigate = useNavigate();

  const {
    data: campaign,
    isLoading: loadingCampaign,
    isError: errorCampaign,
  } = useGetCampaignByIdQuery(campaignId, { skip: !campaignId });

  const { data, isLoading, isError } = useGetCampaignEnrollmentsQuery(
    campaignId,
    { skip: !campaignId },
  );

  const [createDonation, { isLoading: creating }] = useCreateDonationMutation();
  const [generateCertificate, { isLoading: generating }] =
    useGenerateCertificateMutation();

  const [quantityByEnrollment, setQuantityByEnrollment] = useState({});

  const enrollmentsRaw = data?.data || data || [];
  const enrollments = enrollmentsRaw.filter(
    (en) => (en.status || "").toLowerCase() === "confirmed",
  );

  const handleQuantityChange = (id, value) => {
    setQuantityByEnrollment((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRegisterDonation = async (en) => {
    const donor = en.donor;
    if (!donor || !campaign) return;

    const quantity = Number(quantityByEnrollment[en.id] || 450);

    try {
      // 1. Crear donación ya completada
      const donation = await createDonation({
        donorId: donor.id,
        campaignId: campaign.id,
        scheduled_date: campaign.campaign_date,
        scheduled_time: en.preferred_time || campaign.start_time || "09:00",
        status: "COMPLETED",
        quantity_ml: quantity,
        notes: "Donación registrada por el organizador.",
      }).unwrap();

      const donationId = donation.id || donation.data?.id;

      // 2. Generar certificado
      if (donationId) {
        await generateCertificate(donationId).unwrap();
      }

      alert("Donación registrada y certificado generado.");
    } catch (err) {
      console.error(err);
      alert("No se pudo registrar la donación.");
    }
  };

  const renderStatusChip = (status) => {
    if (!status) return null;
    return <Chip size="small" label="Confirmada" color="success" />;
  };

  const loading = isLoading || loadingCampaign || creating || generating;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack direction="row" alignItems="center" mb={2} spacing={1}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" fontWeight={600}>
          Donaciones de campaña
        </Typography>
      </Stack>

      {loadingCampaign && (
        <Stack alignItems="center" my={2}>
          <CircularProgress size={24} />
        </Stack>
      )}

      {campaign && (
        <Typography color="text.secondary" mb={2}>
          {campaign.name} —{" "}
          {campaign.campaign_date
            ? new Date(campaign.campaign_date).toLocaleDateString()
            : ""}
        </Typography>
      )}

      {loading && (
        <Stack alignItems="center" my={4}>
          <CircularProgress />
        </Stack>
      )}

      {isError && (
        <Alert severity="error">
          No se pudieron cargar las inscripciones confirmadas.
        </Alert>
      )}

      {!loading && enrollments.length === 0 && (
        <Alert severity="info">
          Esta campaña aún no tiene inscripciones confirmadas.
        </Alert>
      )}

      {enrollments.length > 0 && (
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Donante</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Horario asignado</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Cantidad (ml)</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.map((en) => {
                const donor = en.donor || {};

                return (
                  <TableRow key={en.id}>
                    <TableCell>
                      {donor.first_name} {donor.last_name}
                    </TableCell>
                    <TableCell>{donor.email}</TableCell>
                    <TableCell>
                      {en.preferred_time || campaign?.start_time || "-"}
                    </TableCell>
                    <TableCell>{renderStatusChip(en.status)}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        inputProps={{ min: 100, step: 50 }}
                        value={quantityByEnrollment[en.id] || 450}
                        onChange={(e) =>
                          handleQuantityChange(en.id, e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleRegisterDonation(en)}
                        disabled={creating || generating}
                      >
                        Registrar donación
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default CampaignDonationsView;
