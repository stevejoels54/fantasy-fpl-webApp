import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#101C26" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 600,
  color: theme.palette.text.primary,
}));

export interface NumbersCardProps {
  title: string;
  value: number;
}

const NumbersCard = ({ title, value }: NumbersCardProps) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <StyledPaper
        sx={{
          my: 1,
          mx: "auto",
          p: 1,
          backgroundColor: "#101C26",
          color: "#ffffff",
          borderRadius: "5px",
          boxShadow: "0 0 0 2px blue",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item></Grid>
          <Grid
            item
            xs
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                textAlign: "left",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                textAlign: "center",
              }}
            >
              {value}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </div>
  );
};

export default NumbersCard;
