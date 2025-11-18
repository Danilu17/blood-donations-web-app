import { useSelector } from "react-redux";
import DONOR_NAVIGATION from "../routes/navigation/donor.js";
import ORGANIZER_NAVIGATION from "../routes/navigation/organizer.js";
import VOLUNTEER_NAVIGATION from "../routes/navigation/volunteer.js";

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
      default:
        return [];
    }
  }

  const NAVIGATION = getNavigationByRole(userRole);

  return { userRole, NAVIGATION };
}

export default useApp;
