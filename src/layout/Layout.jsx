import { Button, Box, Typography } from "@mui/material";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import DONOR_NAVIGATION from "../constants/donor-navigation.js";
import ORGANIZER_NAVIGATION from "../constants/organizer-navigation.js";
import VOLUNTEER_NAVIGATION from "../constants/volunteer-navigation.js";

import { clearUser } from "../stores/user/slice.js";

// 🔹 Botón de cerrar sesión
const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseSession = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <Button color="error" variant="contained" onClick={handleCloseSession}>
      Cerrar sesión
    </Button>
  );
};

// 🔹 Contenido de la barra superior
const TopbarContent = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ textAlign: "right" }}>
        <Typography fontWeight={600}>{user.name || "Usuario"}</Typography>
        <Typography variant="caption" color="text.secondary">
          {user.role?.toUpperCase()}
        </Typography>
      </Box>
      <LogoutButton />
    </Box>
  );
};

// 🔹 Layout principal
export default function Layout() {
  const user = useSelector((state) => state.user);

  // Navegación según rol
  let navigation = DONOR_NAVIGATION;
  if (user.role === "organizer") navigation = ORGANIZER_NAVIGATION;
  if (user.role === "volunteer") navigation = VOLUNTEER_NAVIGATION;

  // Convertir items al formato de Toolpad
  const navItems = navigation.map((item) => ({
    segment: item.segment,
    title: item.title,
  }));

  return (
    <DashboardLayout
      slots={{
        toolbarActions: TopbarContent,
      }}
      navItems={navItems}
      sx={{
        minHeight: "100vh",
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
