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
import AvailableCampaignsViewDon from "../pages/donor/AvailableCampaignssViewDon.jsx";
import MyDonationsView from "../pages/donor/MyDonationsView.jsx";
import HealthQuestionnairePage from "../pages/donor/HealthQuestionnairePage.jsx";
import RoleChangeRequestPage from "../pages/donor/RoleChangeRequestPage.jsx";
import MyEnrollmentsView from "../pages/donor/MyEnrollmentsView.jsx";

// Organizer pages
import CreateCampaignView from "../pages/organizer/CreateCampaignView.jsx";
import MyCampaignsView from "../pages/organizer/MyCampaignsView.jsx";
import BloodRequestsView from "../pages/organizer/BloodRequestsView.jsx";
import CampaignEnrollmentsView from "../pages/organizer/CampaignEnrollmentsView.jsx";
import CampaignDonationsView from "../pages/organizer/CampaignDonationsView.jsx";

// Volunteer pages
import AvailableCampaignsViewVol from "../pages/volunteer/AvailableCampaignsViewVol.jsx";
import MyRegistrationsView from "../pages/volunteer/MyRegistrationsView.jsx";

// Beneficiary pages
import CreateBloodRequestView from "../pages/beneficiary/CreateBloodRequestView.jsx";
import MyBloodRequestsView from "../pages/beneficiary/MyBloodRequestsView.jsx";

// Admin pages
import UsersManagementView from "../pages/admin/UsersManagementView.jsx";
import RoleChangeRequestsView from "../pages/admin/RoleChangeRequestsView.jsx";
import CentersManagementView from "../pages/admin/CentersManagementView.jsx";

// Profile & Common
import ProfileView from "../pages/profile/ProfileView.jsx";
import CentersView from "../pages/common/CentersView.jsx";

const ProtectedLayout = () => {
  const userRole = useSelector((state) => state.user.role);

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};

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
    case "beneficiary":
      return <Navigate to="/beneficiary" replace />;
    case "admin":
      return <Navigate to="/admin" replace />;
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
      // Public routes
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "centers", element: <CentersView /> },

      // Protected routes
      {
        element: <ProtectedLayout />,
        children: [
          { index: true, element: <DashboardRedirect /> },

          // DONOR
          {
            path: "donor",
            children: [
              { index: true, element: <AvailableCampaignsViewDon /> },
              { path: "my-donations", element: <MyDonationsView /> },
              { path: "my-enrollments", element: <MyEnrollmentsView /> },
              {
                path: "health-questionnaire",
                element: <HealthQuestionnairePage />,
              },
              { path: "role-change", element: <RoleChangeRequestPage /> },
              { path: "profile", element: <ProfileView /> },
            ],
          },

          // ORGANIZER
          {
            path: "organizer",
            children: [
              { index: true, element: <MyCampaignsView /> },
              { path: "campaigns/new", element: <CreateCampaignView /> },
              { path: "campaigns/:id/edit", element: <CreateCampaignView /> },
              {
                path: "campaigns/:id/enrollments",
                element: <CampaignEnrollmentsView />,
              },
              {
                path: "campaigns/:id/donations",
                element: <CampaignDonationsView />,
              },
              { path: "blood-requests", element: <BloodRequestsView /> },
              { path: "profile", element: <ProfileView /> },
            ],
          },

          // VOLUNTEER
          {
            path: "volunteer",
            children: [
              { index: true, element: <AvailableCampaignsViewVol /> },
              { path: "my-registrations", element: <MyRegistrationsView /> },
              { path: "profile", element: <ProfileView /> },
            ],
          },

          // BENEFICIARY
          {
            path: "beneficiary",
            children: [
              { index: true, element: <MyBloodRequestsView /> },
              {
                path: "blood-requests/new",
                element: <CreateBloodRequestView />,
              },
              { path: "profile", element: <ProfileView /> },
            ],
          },

          // ADMIN
          {
            path: "admin",
            children: [
              { index: true, element: <UsersManagementView /> },
              { path: "role-requests", element: <RoleChangeRequestsView /> },
              { path: "centers", element: <CentersManagementView /> },
              { path: "profile", element: <ProfileView /> },
            ],
          },
        ],
      },
    ],
  },
];
