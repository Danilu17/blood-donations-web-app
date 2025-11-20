// src/layout/Layout.jsx
import { Button, Box, Typography } from "@mui/material";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { clearUser } from "../stores/user/slice.js";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseSession = () => {
    dispatch(clearUser());
    localStorage.removeItem("access_token");
    navigate("/login", { replace: true });
  };

  return (
    <Button color="error" variant="contained" onClick={handleCloseSession}>
      Cerrar sesión
    </Button>
  );
};

const TopbarContent = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ textAlign: "right" }}>
        <Typography fontWeight={600}>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {user.role?.toUpperCase() || "USUARIO"}
        </Typography>
      </Box>
      <LogoutButton />
    </Box>
  );
};

export default function Layout() {
  const user = useSelector((state) => state.user);

  /**
   * Navegación según rol.
   * Los `segment` son rutas completas que matchean con routes.jsx
   */
  const navigationMap = {
    donor: [
      { kind: "header", title: "Donante" },
      { segment: "donor", title: "Campañas disponibles" },
      { segment: "donor/my-enrollments", title: "Mis inscripciones" },
      { segment: "donor/my-donations", title: "Mis donaciones" },
      {
        segment: "donor/health-questionnaire",
        title: "Cuestionario de salud",
      },
      { segment: "donor/role-change", title: "Cambio de rol" },
      { segment: "donor/profile", title: "Mi perfil" },
    ],

    organizer: [
      { kind: "header", title: "Organizador" },
      { segment: "organizer", title: "Mis campañas" },
      { segment: "organizer/campaigns/new", title: "Crear campaña" },
      {
        segment: "organizer/blood-requests",
        title: "Solicitudes de sangre",
      },
      { segment: "organizer/profile", title: "Mi perfil" },
    ],

    volunteer: [
      { kind: "header", title: "Voluntario" },
      { segment: "volunteer", title: "Campañas disponibles" },
      {
        segment: "volunteer/my-registrations",
        title: "Mis inscripciones",
      },
      { segment: "volunteer/profile", title: "Mi perfil" },
    ],

    beneficiary: [
      { kind: "header", title: "Beneficiario" },
      { segment: "beneficiary", title: "Mis solicitudes de sangre" },
      {
        segment: "beneficiary/blood-requests/new",
        title: "Nueva solicitud",
      },
      { segment: "beneficiary/profile", title: "Mi perfil" },
    ],

    admin: [
      { kind: "header", title: "Administrador" },
      { segment: "admin", title: "Usuarios" },
      {
        segment: "admin/role-requests",
        title: "Solicitudes de cambio de rol",
      },
      { segment: "admin/centers", title: "Centros de donación" },
      { segment: "admin/profile", title: "Mi perfil" },
    ],
  };

  const navItems = navigationMap[user.role] || [];

  return (
    <DashboardLayout
      slots={{
        toolbarActions: TopbarContent,
      }}
      // 👇 IMPORTANTE: pasarle la navegación al layout
      navigation={navItems}
      sx={{ minHeight: "100vh" }}
    >
      <PageContainer
        sx={{
          width: "100%",
          p: 3,
        }}
      >
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
