import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router-dom";
import theme from "./styles/theme.js";
import useApp from "./hooks/useApp.jsx";
import DonaHoy from "./assets/DonaHoy.png";

export default function App() {
  const { NAVIGATION } = useApp();
  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      theme={theme}
      branding={{
        logo: <img src={DonaHoy} alt="Logo DonaHoy" style={{ height: 60 }} />,
        title: "",
        homeUrl: "/",
      }}
    >
      <Outlet />
    </ReactRouterAppProvider>
  );
}
