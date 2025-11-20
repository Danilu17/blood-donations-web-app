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

  // Navegación según rol - CORREGIDO
  const navigationMap = {
    donor: [
      {
        kind: "header",
        title: "Donante",
      },
      {
        segment: "",
        title: "Campañas disponibles",
        pattern: "donor",
      },
      {
        segment: "my-donations",
        title: "Mis donaciones",
      },
      {
        segment: "health-questionnaire",
        title: "Cuestionario de salud",
      },
      {
        segment: "role-change",
        title: "Cambio de rol",
      },
      {
        segment: "profile",
        title: "Mi perfil",
      },
    ],
    organizer: [
      {
        kind: "header",
        title: "Organizador",
      },
      {
        segment: "",
        title: "Mis campañas",
        pattern: "organizer",
      },
      {
        segment: "campaigns/new",
        title: "Crear campaña",
      },
      {
        segment: "blood-requests",
        title: "Solicitudes de sangre",
      },
      {
        segment: "profile",
        title: "Mi perfil",
      },
    ],
    volunteer: [
      {
        kind: "header",
        title: "Voluntario",
      },
      {
        segment: "",
        title: "Campañas disponibles",
        pattern: "volunteer",
      },
      {
        segment: "my-registrations",
        title: "Mis inscripciones",
      },
      {
        segment: "profile",
        title: "Mi perfil",
      },
    ],
    beneficiary: [
      {
        kind: "header",
        title: "Beneficiario",
      },
      {
        segment: "",
        title: "Mis solicitudes",
        pattern: "beneficiary",
      },
      {
        segment: "blood-requests/new",
        title: "Nueva solicitud",
      },
      {
        segment: "profile",
        title: "Mi perfil",
      },
    ],
    admin: [
      {
        kind: "header",
        title: "Administrador",
      },
      {
        segment: "",
        title: "Usuarios",
        pattern: "admin",
      },
      {
        segment: "role-requests",
        title: "Solicitudes de rol",
      },
      {
        segment: "centers",
        title: "Centros de donación",
      },
      {
        segment: "profile",
        title: "Mi perfil",
      },
    ],
  };

  const navItems = navigationMap[user.role] || [];

  return (
    <DashboardLayout
      slots={{
        toolbarActions: TopbarContent,
      }}
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
