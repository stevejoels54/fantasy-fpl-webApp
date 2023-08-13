import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#101C26" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 600,
  color: theme.palette.text.primary,
}));

export interface TableCardProps {
  managerName: string;
  teamName: string;
  position: number;
  change: number;
  is_entry?: boolean;
  points?: number;
  average?: number;
  is_manager?: boolean;
  avatar?: string;
  entry?: number;
}

const TableCard = ({
  managerName,
  teamName,
  position,
  change,
  is_entry,
  points,
  average,
  is_manager,
  avatar,
}: // entry,
TableCardProps) => {
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
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const getColor = (points: number, average: number) => {
    if (points && average) {
      if (points > average) {
        return "green";
      } else if (points < average) {
        return "red";
      } else if (points === average) {
        return "blue";
      }
    } else {
      return "inherit";
    }
  };

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
          borderRadius: "10px",
          boxShadow: is_manager ? "0 0 0 2px #FFD700" : "0 0 0 2px white",
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
              flexDirection: "column",
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
              {managerName}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                textAlign: "left",
              }}
            >
              {teamName}
            </Typography>
          </Grid>
          <Grid
            item
            xs
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!is_entry && (
              <Grid item>
                <Typography
                  variant="subtitle1"
                  color={getColor(points!, average!)}
                >
                  {points?.toLocaleString()} {"pts"}
                </Typography>
              </Grid>
            )}
          </Grid>
          {!is_entry && (
            <Grid item>
              <Typography variant="subtitle1">{`${position}${getOrdinalSuffix({
                number: position,
              })}`}</Typography>
              {change > 0 ? (
                <ArrowUpwardIcon style={{ color: "green" }} />
              ) : change < 0 ? (
                <ArrowDownwardIcon style={{ color: "red" }} />
              ) : null}
            </Grid>
          )}
        </Grid>
      </StyledPaper>
    </div>
  );
};

export interface getOrdinalSuffixProps {
  number: number;
}

// Helper function to get the ordinal suffix (e.g., 1st, 2nd, 3rd, etc.)
const getOrdinalSuffix = ({ number }: getOrdinalSuffixProps) => {
  if (number >= 11 && number <= 13) {
    return "th";
  }
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export default TableCard;
