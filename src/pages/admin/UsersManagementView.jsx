// src/pages/admin/UsersManagementView.jsx
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
  Alert,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../apis/users.api";

const ROLE_OPTIONS = [
  { value: "donor", label: "Donante" },
  { value: "beneficiary", label: "Beneficiario" },
  { value: "organizer", label: "Organizador" },
  { value: "admin", label: "Administrador" },
];

const UsersManagementView = () => {
  const { data, isLoading, isError } = useGetUsersQuery({
    limit: 100,
    page: 0,
  });
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  const users = data?.data || data || [];

  const handleRoleChange = async (user, newRole) => {
    try {
      await updateUser({ id: user.id, role: newRole }).unwrap();
      alert("Rol actualizado.");
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar el rol.");
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`¿Eliminar (soft delete) al usuario ${user.email}?`))
      return;

    try {
      await deleteUser(user.id).unwrap();
      alert("Usuario eliminado.");
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el usuario.");
    }
  };

  const renderRoleChip = (role) => {
    if (!role) return null;

    const map = {
      donor: { label: "Donante", color: "default" },
      beneficiary: { label: "Beneficiario", color: "info" },
      organizer: { label: "Organizador", color: "success" },
      admin: { label: "Administrador", color: "primary" },
    };

    const config = map[role] || { label: role, color: "default" };
    return <Chip size="small" label={config.label} color={config.color} />;
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Gestión de usuarios
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Como administrador podés ver, cambiar los roles y eliminar usuarios.
      </Typography>

      {isLoading && (
        <Stack alignItems="center" my={4}>
          <CircularProgress />
        </Stack>
      )}

      {isError && (
        <Alert severity="error">No se pudieron cargar los usuarios.</Alert>
      )}

      {!isLoading && users.length === 0 && (
        <Alert severity="info">No hay usuarios para mostrar.</Alert>
      )}

      {users.length > 0 && (
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Cambiar rol</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    {u.first_name} {u.last_name}
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.dni}</TableCell>
                  <TableCell>{renderRoleChip(u.role)}</TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={u.role || ""}
                      onChange={(e) => handleRoleChange(u, e.target.value)}
                      disabled={updating}
                      sx={{ minWidth: 140 }}
                    >
                      {ROLE_OPTIONS.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      size="small"
                      disabled={deleting}
                      onClick={() => handleDelete(u)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
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

export default UsersManagementView;
