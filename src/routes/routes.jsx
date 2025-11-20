// src/routes/routes.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import App from "../App.jsx";
import Layout from "../layout/Layout.jsx";

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";

import ErrorPage from "../pages/errorPage.jsx";

// Donor pages
import MyDonationsView from "../pages/donor/MyDonationsView.jsx";
import HealthQuestionnairePage from "../pages/donor/HealthQuestionnairePage.jsx";

// Shared pages
import AvailableCampaignsView from "../pages/volunteer/AvailableCampaignsView.jsx";
import ProfileView from "../pages/profile/ProfileView.jsx";

// Organizer pages
import CreateCampaignView from "../pages/organizer/CreateCampaignView.jsx";
import DonationsManagementView from "../pages/organizer/DonationsManagementView.jsx";
import RegistrationsView from "../pages/organizer/RegistrationsView.jsx";

// Volunteer pages
import MyRegistrationsView from "../pages/volunteer/MyRegistrationsView.jsx";

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
      // PUBLIC AUTH ROUTES
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },

      // NUEVO → RESET PASSWORD CON TOKEN EN LA URL
      { path: "reset-password/:token", element: <ResetPassword /> },

      // RUTAS PROTEGIDAS
      {
        path: "/",
        element: <ProtectedLayout />,
        children: [
          { index: true, element: <DashboardRedirect /> },

          // ============================
          //       DONOR ROUTES
          // ============================
          {
            path: "donor",
            children: [
              { index: true, element: <AvailableCampaignsView /> },
              { path: "campaigns", element: <AvailableCampaignsView /> },
              { path: "my-donations", element: <MyDonationsView /> },
              {
                path: "health-questionnaire",
                element: <HealthQuestionnairePage />,
              },
              { path: "profile", element: <ProfileView /> },
            ],
          },

          // ============================
          //     ORGANIZER ROUTES
          // ============================
          {
            path: "organizer",
            children: [
              { index: true, element: <AvailableCampaignsView /> },
              { path: "create-campaign", element: <CreateCampaignView /> },
              { path: "donations", element: <DonationsManagementView /> },
              {
                path: "donations/:campaignId",
                element: <DonationsManagementView />,
              },
              {
                path: "registrations/:campaignId",
                element: <RegistrationsView />,
              },
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
