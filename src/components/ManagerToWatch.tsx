import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { isEmpty } from "lodash";

export interface ManagerToWatchProps {
  managerName: string;
  teamName: string;
  riseIndex: number;
  avatar?: string;
}

const ManagerToWatch = ({
  managerName,
  teamName,
  riseIndex,
  avatar,
}: ManagerToWatchProps) => {
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
        width: 65,
        height: 65,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0.5rem",
        }}
      >
        <Avatar
          {...stringAvatar(managerName || "Fantasy Supreme")}
          src={avatar}
        />
        <Typography
          variant="h5"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            textAlign: "Center",
          }}
        >
          {managerName}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            textAlign: "Center",
          }}
        >
          {teamName}
        </Typography>
        {!isEmpty(riseIndex) ? (
          <Typography
            variant="subtitle1"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              textAlign: "Center",
            }}
          >
            Raise index: {riseIndex}%{" "}
          </Typography>
        ) : null}
      </div>
    </div>
  );
};

export default ManagerToWatch;
