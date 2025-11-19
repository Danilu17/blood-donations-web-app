// src/pages/donor/MyDonationsView.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { getMyDonations } from "../../services/donationService";
import { downloadDonationCertificate } from "../../services/certificateService";

function MyDonationsView() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getMyDonations();
        setDonations(data.results || data.items || data.data || data || []);
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          "Error al cargar historial de donaciones.";
        setErrorMsg(Array.isArray(msg) ? msg.join(", ") : msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDownload = async (id) => {
    setDownloadingId(id);
    try {
      await downloadDonationCertificate(id);
    } catch {
      // podrías mostrar un error
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Mi historial de donaciones
      </Typography>

      {errorMsg && (
        <Typography color="error" variant="body2" mb={2}>
          {errorMsg}
        </Typography>
      )}

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Centro</TableCell>
              <TableCell>Tipo de sangre</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Certificado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.date}</TableCell>
                <TableCell>{d.center_name || d.center?.name}</TableCell>
                <TableCell>
                  {d.blood_type} {d.rh_factor}
                </TableCell>
                <TableCell>{d.units || d.amount}</TableCell>
                <TableCell>{d.status}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleDownload(d.id)}
                    disabled={downloadingId === d.id}
                  >
                    {downloadingId === d.id
                      ? "Descargando..."
                      : "Descargar PDF"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {donations.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Todavía no tenés donaciones registradas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default MyDonationsView;
