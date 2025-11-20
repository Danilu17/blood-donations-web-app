import { useSelector } from "react-redux";
import DONOR_NAVIGATION from "../routes/navigation/donor-navigation.js";
import ORGANIZER_NAVIGATION from "../routes/navigation/organizer-navigation.js";
import VOLUNTEER_NAVIGATION from "../routes/navigation/volunteer-navigation.js";
import ADMIN_NAVIGATION from "../routes/navigation/admin.js";
import BENEFICIARY_NAVIGATION from "../routes/navigation/beneficiary.js";

function useApp() {
  const userRole = useSelector((state) => state.user.role);

  function getNavigationByRole(role) {
    switch (role) {
      case "donor":
        return DONOR_NAVIGATION;
      case "organizer":
        return ORGANIZER_NAVIGATION;
      case "volunteer":
        return VOLUNTEER_NAVIGATION;
      case "admin":
        return ADMIN_NAVIGATION;
      case "beneficiary":
        return BENEFICIARY_NAVIGATION;
      default:
        return [];
    }
  }

  const NAVIGATION = getNavigationByRole(userRole);

  return { userRole, NAVIGATION };
}

export default useApp;
