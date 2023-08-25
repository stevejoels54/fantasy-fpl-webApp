import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { FaExclamationCircle } from "react-icons/fa";
import { Typography } from "@mui/material";
import { isEmpty } from "lodash";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface ErrorCardProps {
  message?: string;
}

const ErrorCard = ({ message }: ErrorCardProps) => {
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
        <h1>Oops!</h1>
        <FaExclamationCircle size={200} />
        <Typography variant="subtitle1">
          {isEmpty(message)
            ? "Something went wrong. Please try reloading the page."
            : message}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload
        </Button>
      </Item>
    </div>
  );
};

export default ErrorCard;
