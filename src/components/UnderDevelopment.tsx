import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { FaTools } from "react-icons/fa";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UnderDevelopment = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Item
        sx={{
          backgroundColor: "#303840",
          color: "#ffffff",
          borderRadius: "10px",
          width: "100%",
        }}
      >
        <h1>Under Development</h1>
        <FaTools size={200} />
        <Typography variant="subtitle1">
          This page is currently under development. You will be notified when it
          is ready.
        </Typography>
      </Item>
    </div>
  );
};

export default UnderDevelopment;
