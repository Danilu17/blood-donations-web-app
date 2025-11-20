// src/pages/donor/MyDonationsView.jsx
import { useState } from "react";
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
import { useGetMyDonationsQuery } from "../../apis/donations.api";
import { useLazyDownloadCertificateQuery } from "../../apis/certificates.api";

const getErrorMessage = (error, fallback) => {
  if (!error) return fallback;
  const data = error.data;
  let msg =
    data?.message ||
    (typeof error.error === "string" && error.error) ||
    fallback;
  return Array.isArray(msg) ? msg.join(", ") : msg;
};

function MyDonationsView() {
  const [downloadingId, setDownloadingId] = useState(null);

  const { data, isLoading, error } = useGetMyDonationsQuery();

  const [triggerDownload] = useLazyDownloadCertificateQuery();

  const donations = data?.results || data?.items || data?.data || data || [];

  const errorMsg = error
    ? getErrorMessage(error, "Error al cargar historial de donaciones.")
    : "";

  const handleDownload = async (id) => {
    setDownloadingId(id);
    try {
      const blob = await triggerDownload(id).unwrap();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificado-donacion-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      // opcional: podrías mostrar un error en pantalla
      console.error("Error descargando certificado", e);
    } finally {
      setDownloadingId(null);
    }
  };

  if (isLoading) {
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
