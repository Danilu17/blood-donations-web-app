// src/pages/organizer/MyCampaignsView.jsx
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
  IconButton,
  Stack,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, Cancel, CheckCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetCampaignsQuery,
  useCancelCampaignMutation,
  useCompleteCampaignMutation,
} from "../../apis/campaigns.api";

const MyCampaignsView = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCampaignsQuery(
    {
      /* si tu back soporta filtro por organizerId, descomentalo:
      organizerId: user?.id,
    */
    },
    { skip: !user?.id },
  );

  const [cancelCampaign, { isLoading: cancelling }] =
    useCancelCampaignMutation();
  const [completeCampaign, { isLoading: completing }] =
    useCompleteCampaignMutation();

  const campaignsRaw = data?.data || data || [];
  const campaigns = campaignsRaw.filter(
    (c) => c.organizer?.id === user?.id, // filtro front por si no hay filtro back
  );

  const handleCancel = async (id) => {
    if (!window.confirm("¿Seguro que querés cancelar esta campaña?")) return;
    try {
      await cancelCampaign(id).unwrap();
      alert("Campaña cancelada.");
    } catch (err) {
      console.error(err);
      alert("No se pudo cancelar la campaña.");
    }
  };

  const handleComplete = async (id) => {
    if (!window.confirm("¿Marcar campaña como completada?")) return;
    try {
      await completeCampaign(id).unwrap();
      alert("Campaña marcada como completada.");
    } catch (err) {
      console.error(err);
      alert("No se pudo completar la campaña.");
    }
  };

  const renderStatusChip = (status) => {
    if (!status) return null;

    const map = {
      DRAFT: { label: "Borrador", color: "default" },
      ACTIVE: { label: "Activa", color: "success" },
      COMPLETED: { label: "Completada", color: "primary" },
      CANCELLED: { label: "Cancelada", color: "error" },
    };

    const config = map[status] || { label: status, color: "default" };

    return <Chip size="small" label={config.label} color={config.color} />;
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Mis campañas
          </Typography>
          <Typography color="text.secondary">
            Gestioná tus campañas, inscripciones y donaciones.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/organizer/campaigns/new")}
        >
          Crear campaña
        </Button>
      </Stack>

      {isLoading && (
        <Stack alignItems="center" my={4}>
          <CircularProgress />
        </Stack>
      )}

      {isError && (
        <Alert severity="error">No se pudieron cargar las campañas.</Alert>
      )}

      {!isLoading && campaigns.length === 0 && (
        <Alert severity="info">
          Todavía no creaste campañas. Empezá creando la primera.
        </Alert>
      )}

      {campaigns.length > 0 && (
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Lugar</TableCell>
                <TableCell>Horario</TableCell>
                <TableCell>Cupos</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>
                    {c.campaign_date
                      ? new Date(c.campaign_date).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>{c.location}</TableCell>
                  <TableCell>
                    {c.start_time} - {c.end_time}
                  </TableCell>
                  <TableCell>
                    {c.current_donors ?? 0}/{c.max_donors ?? "?"}
                  </TableCell>
                  <TableCell>{renderStatusChip(c.status)}</TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigate(`/organizer/campaigns/${c.id}/edit`)
                        }
                      >
                        <Edit fontSize="small" />
                      </IconButton>

                      <Button
                        size="small"
                        onClick={() =>
                          navigate(`/organizer/campaigns/${c.id}/enrollments`)
                        }
                      >
                        Inscripciones
                      </Button>

                      <Button
                        size="small"
                        onClick={() =>
                          navigate(`/organizer/campaigns/${c.id}/donations`)
                        }
                      >
                        Donaciones
                      </Button>

                      <IconButton
                        size="small"
                        color="success"
                        disabled={completing}
                        onClick={() => handleComplete(c.id)}
                      >
                        <CheckCircle fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        disabled={cancelling}
                        onClick={() => handleCancel(c.id)}
                      >
                        <Cancel fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default MyCampaignsView;
