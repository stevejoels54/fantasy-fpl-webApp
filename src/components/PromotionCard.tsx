import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#101C26" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 600,
  color: theme.palette.text.primary,
}));

export interface PromotionCardProps {
  managerName: string;
  teamName: string;
  avatar?: string;
}

const PromotionCard = ({
  managerName,
  teamName,
  avatar,
}: PromotionCardProps) => {
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 30,
        height: 30,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

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
          boxShadow: "0 0 0 2px green",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              {...stringAvatar(managerName)}
              // src="https://avatars.githubusercontent.com/u/25126281?v=4"
              src={avatar}
            />
          </Grid>
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
              variant="subtitle2"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                textAlign: "center",
              }}
            >
              {managerName}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                textAlign: "center",
              }}
            >
              {teamName}
            </Typography>
            <Grid item>
              <ArrowUpwardIcon style={{ color: "green" }} />
            </Grid>
          </Grid>
        </Grid>
      </StyledPaper>
    </div>
  );
};

export default PromotionCard;
