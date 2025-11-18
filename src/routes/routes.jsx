// src/routes/routes.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import App from "../App.jsx";
import Layout from "../layout/Layout.jsx";

import Login from "../pages/auth/Login.jsx";
import ErrorPage from "../pages/errorPage.jsx";

// Donor pages
import MyDonationsView from "../pages/donor/MyDonationsView.jsx";
import CampaignsView from "../pages/donor/CampaignsView.jsx";

// Organizer pages
import MyCampaignsView from "../pages/organizer/MyCampaignsView.jsx";
import CreateCampaignView from "../pages/organizer/CreateCampaignView.jsx";
import DonationsManagementView from "../pages/organizer/DonationsManagementView.jsx";

// Volunteer pages
import AvailableCampaignsView from "../pages/volunteer/AvailableCampaignsView.jsx";
import MyRegistrationsView from "../pages/volunteer/MyRegistrationsView.jsx";
import HealthQuestionnairePage from "../pages/donor/HealthQuestionnairePage.jsx";
import RegistrationsView from "../pages/organizer/RegistrationsView.jsx";
import ProfileView from "../pages/profile/ProfileView.jsx";

/**
 * Layout protegido:
 * - Si NO hay rol → te manda a /login
 * - Si hay rol → muestra el Layout (que a su vez renderiza <Outlet /> adentro)
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
 * - donor → /donor
 * - organizer → /organizer
 * - volunteer → /volunteer
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
      // 🔐 RUTA DE LOGIN PÚBLICA
      {
        path: "login",
        element: <Login />,
      },

      // 🧭 RUTAS PROTEGIDAS (requieren rol)
      {
        path: "/",
        element: <ProtectedLayout />,
        children: [
          // / → redirige según el rol
          { index: true, element: <DashboardRedirect /> },

          // Donor routes
          {
            path: "donor",
            children: [
              { index: true, element: <CampaignsView /> },
              { path: "my-donations", element: <MyDonationsView /> },
              {
                path: "health-questionnaire",
                element: <HealthQuestionnairePage />,
              },
              { path: "profile", element: <ProfileView /> },

              // { path: "profile", element: <ProfileView /> }, // luego
            ],
          },

          // Organizer routes
          {
            path: "organizer",
            children: [
              { index: true, element: <MyCampaignsView /> },
              { path: "create-campaign", element: <CreateCampaignView /> },
              { path: "donations", element: <DonationsManagementView /> },
              {
                path: "registrations/:campaignId",
                element: <RegistrationsView />,
              },
              {
                path: "donations/:campaignId",
                element: <DonationsManagementView />,
              },
              { path: "profile", element: <ProfileView /> },
            ],
          },

          // Volunteer routes
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
