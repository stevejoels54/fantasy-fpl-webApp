import { Typography } from "@mui/material";

const NotFound = () => {
  return (
    <div
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
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <Typography
          variant="h4"
          style={{
            color: "#ffffff",
          }}
        >
          404 Page Not Found
        </Typography>
      </div>
    </div>
  );
};

export default NotFound;
