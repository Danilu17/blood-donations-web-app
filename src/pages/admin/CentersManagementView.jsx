// src/pages/admin/CentersManagementView.jsx
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete, ToggleOn, ToggleOff } from "@mui/icons-material";
import {
  useGetCentersQuery,
  useCreateCenterMutation,
  useUpdateCenterMutation,
  useToggleCenterMutation,
  useDeleteCenterMutation,
} from "../../apis/centers.api";
import { useState } from "react";

const emptyCenter = {
  name: "",
  address: "",
  address_details: "",
  city: "",
  province: "",
  phone: "",
  email: "",
};

const CentersManagementView = () => {
  const { data, isLoading, isError } = useGetCentersQuery({
    limit: 100,
    page: 0,
  });

  const [createCenter, { isLoading: creating }] = useCreateCenterMutation();
  const [updateCenter, { isLoading: updating }] = useUpdateCenterMutation();
  const [toggleCenter, { isLoading: toggling }] = useToggleCenterMutation();
  const [deleteCenter, { isLoading: deleting }] = useDeleteCenterMutation();

  const centers = data?.data || data || [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null); // center o null
  const [formValues, setFormValues] = useState(emptyCenter);

  const openCreateDialog = () => {
    setEditing(null);
    setFormValues(emptyCenter);
    setDialogOpen(true);
  };

  const openEditDialog = (center) => {
    setEditing(center);
    setFormValues({
      name: center.name || "",
      address: center.address || "",
      address_details: center.address_details || "",
      city: center.city || "",
      province: center.province || "",
      phone: center.phone || "",
      email: center.email || "",
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await updateCenter({ id: editing.id, ...formValues }).unwrap();
        alert("Centro actualizado.");
      } else {
        await createCenter(formValues).unwrap();
        alert("Centro creado.");
      }
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar el centro.");
    }
  };

  const handleToggle = async (center) => {
    try {
      await toggleCenter(center.id).unwrap();
      alert("Estado del centro actualizado.");
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar el estado del centro.");
    }
  };

  const handleDelete = async (center) => {
    if (!window.confirm(`¿Eliminar el centro "${center.name}"?`)) return;
    try {
      await deleteCenter(center.id).unwrap();
      alert("Centro eliminado.");
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el centro.");
    }
  };

  const renderActiveChip = (active) => {
    return (
      <Chip
        size="small"
        label={active ? "Activo" : "Inactivo"}
        color={active ? "success" : "default"}
      />
    );
  };

  const loadingAny = isLoading || creating || updating || toggling || deleting;

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
            Centros de donación
          </Typography>
          <Typography color="text.secondary">
            Gestioná los centros donde se realizan las campañas.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={openCreateDialog}
        >
          Nuevo centro
        </Button>
      </Stack>

      {isLoading && (
        <Stack alignItems="center" my={4}>
          <CircularProgress />
        </Stack>
      )}

      {isError && (
        <Alert severity="error">
          No se pudieron cargar los centros de donación.
        </Alert>
      )}

      {!isLoading && centers.length === 0 && (
        <Alert severity="info">No hay centros registrados todavía.</Alert>
      )}

      {centers.length > 0 && (
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>Provincia</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {centers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>
                    {c.address}
                    {c.address_details ? `, ${c.address_details}` : ""}
                  </TableCell>
                  <TableCell>{c.city}</TableCell>
                  <TableCell>{c.province}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.email || "-"}</TableCell>
                  <TableCell>{renderActiveChip(c.is_active ?? true)}</TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <IconButton
                        size="small"
                        onClick={() => openEditDialog(c)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color={c.is_active ? "success" : "default"}
                        disabled={toggling}
                        onClick={() => handleToggle(c)}
                      >
                        {c.is_active ? (
                          <ToggleOn fontSize="small" />
                        ) : (
                          <ToggleOff fontSize="small" />
                        )}
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        disabled={deleting}
                        onClick={() => handleDelete(c)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {editing ? "Editar centro de donación" : "Nuevo centro de donación"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField
              label="Nombre"
              fullWidth
              value={formValues.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <TextField
              label="Dirección"
              fullWidth
              value={formValues.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <TextField
              label="Detalles de dirección"
              fullWidth
              value={formValues.address_details}
              onChange={(e) => handleChange("address_details", e.target.value)}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Ciudad"
                fullWidth
                value={formValues.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
              <TextField
                label="Provincia"
                fullWidth
                value={formValues.province}
                onChange={(e) => handleChange("province", e.target.value)}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Teléfono"
                fullWidth
                value={formValues.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <TextField
                label="Email"
                fullWidth
                value={formValues.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancelar</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loadingAny}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CentersManagementView;
