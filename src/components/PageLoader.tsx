import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const PageLoader = () => {
  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#101C26",
        overflow: "hidden",
        position: "fixed",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
        <Typography
          variant="h6"
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Fantasy Supreme Loading...
        </Typography>
      </div>
    </Box>
  );
};

export default PageLoader;
