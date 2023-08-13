import { useSelector } from "react-redux";
import ResponsiveAppBar from "../components/NavBar";
import routes from "../config/routes/routes";
import { createElement } from "react";

const AppLayout = () => {
  const activeComponent = useSelector(
    (state: any) => state.rootReducer.appUiState.activeComponent
  );
  const activeRoute = routes.find((route) => route.name === activeComponent);

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#101C26",
          overflow: "hidden",
          position: "fixed",
        }}
      >
        <ResponsiveAppBar />
        <div
          style={{
            height: "calc(100vh)",
            overflowY: "scroll",
            overflowX: "scroll",
            padding: "20px",
          }}
        >
          {activeRoute &&
            activeRoute.component &&
            createElement(activeRoute.component)}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
