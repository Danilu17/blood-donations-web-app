// src/routes/routes.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import App from "../App.jsx";
import Layout from "../layout/Layout.jsx";

import Login from "../pages/auth/Login.jsx";
import ErrorPage from "../pages/errorPage.jsx";

// Donor pages
import MyDonationsView from "../pages/donor/MyDonationsView.jsx";
import HealthQuestionnairePage from "../pages/donor/HealthQuestionnairePage.jsx";

// Shared
import AvailableCampaignsView from "../pages/volunteer/AvailableCampaignsView.jsx";
import ProfileView from "../pages/profile/ProfileView.jsx";

// Organizer pages
import CreateCampaignView from "../pages/organizer/CreateCampaignView.jsx";
import DonationsManagementView from "../pages/organizer/DonationsManagementView.jsx";
import RegistrationsView from "../pages/organizer/RegistrationsView.jsx";

// Volunteer pages
import MyRegistrationsView from "../pages/volunteer/MyRegistrationsView.jsx";
import Register from "../pages/auth/Register.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";

/**
 * Layout protegido:
 */
const ProtectedLayout = () => {
  const userRole = useSelector((state) => state.user.role);

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};

/**
 * Redirección según rol:
 */
const DashboardRedirect = () => {
  const userRole = useSelector((state) => state.user.role);

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  switch (userRole) {
    case "donor":
      return <Navigate to="/donor" replace />;
    case "organizer":
      return <Navigate to="/organizer" replace />;
    case "volunteer":
      return <Navigate to="/volunteer" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // 🔐 LOGIN PUBLICO
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },

      // 🔐 RUTAS PROTEGIDAS
      {
        path: "/",
        element: <ProtectedLayout />,
        children: [
          // / → redirección según el rol
          { index: true, element: <DashboardRedirect /> },

          // ============================
          //        DONOR ROUTES
          // ============================
          {
            path: "donor",
            children: [
              // Home del donor = campañas disponibles
              { index: true, element: <AvailableCampaignsView /> },

              // Lista de campañas
              { path: "campaigns", element: <AvailableCampaignsView /> },

              // Mis donaciones
              { path: "my-donations", element: <MyDonationsView /> },

              // Cuestionario de salud
              {
                path: "health-questionnaire",
                element: <HealthQuestionnairePage />,
              },

              // Perfil
              { path: "profile", element: <ProfileView /> },
            ],
          },

          // ============================
          //      ORGANIZER ROUTES
          // ============================
          {
            path: "organizer",
            children: [
              // Home del organizer = campañas activas
              { index: true, element: <AvailableCampaignsView /> },

              // Crear campaña
              { path: "create-campaign", element: <CreateCampaignView /> },

              // Manejo de donaciones
              { path: "donations", element: <DonationsManagementView /> },
              {
                path: "donations/:campaignId",
                element: <DonationsManagementView />,
              },

              // Lista de inscriptos
              {
                path: "registrations/:campaignId",
                element: <RegistrationsView />,
              },

              // Perfil
              { path: "profile", element: <ProfileView /> },
            ],
          },

          // ============================
          //     VOLUNTEER ROUTES
          // ============================
          {
            path: "volunteer",
            children: [
              { index: true, element: <AvailableCampaignsView /> },
              { path: "my-registrations", element: <MyRegistrationsView /> },
              { path: "profile", element: <ProfileView /> },
            ],
          },
        ],
      },
    ],
  },
];
