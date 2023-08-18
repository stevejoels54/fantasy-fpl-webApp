import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import moment from "moment";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#101C26" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

export default function LeagueStatusTable() {
  const { eventDataSuccess: eventData } = useSelector(
    (state: any) => state.rootReducer
  );

  return (
    <StyledPaper
      sx={{
        my: 1,
        mx: "auto",
        p: 1,
        backgroundColor: "#101C26",
        color: "#ffffff",
        borderRadius: "10px",
        // boxShadow: "0 0 0 2px green",
        boxShadow: "0 0 0 2px white",
        width: "95%",
      }}
    >
      <h4>
        {eventData?.leagues === "Updated" ? (
          <Chip label="Leagues Updated" color="success" />
        ) : eventData?.leagues === "Updating" ? (
          <Chip label="Updating Leagues..." color="warning" />
        ) : (
          <Chip label="Leagues Not Updated" color="error" />
        )}
      </h4>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "2px solid #ddd",
          textAlign: "center",
          fontSize: "13px",
          padding: "5px",
        }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Bonus Added</th>
            <th>Match Points</th>
          </tr>
          <tr>
            <td colSpan={3}>
              <Divider
                style={{
                  // margin: "10px 0px",
                  color: "#ddd",
                  backgroundColor: "#ddd",
                }}
              />
            </td>
          </tr>
        </thead>
        <tbody
          style={{
            textAlign: "center",
            margin: "20px 0px",
          }}
        >
          {eventData?.status?.map((event: any, index: any) => (
            <React.Fragment key={event.date}>
              <>
                <tr key={index}>
                  <td>{moment(event.date).format("ddd  DD MMM")}</td>
                  <td>
                    {event.bonus_added ? (
                      <Chip label="Yes" color="success" />
                    ) : (
                      <Chip label="No" color="error" />
                    )}
                  </td>
                  <td>
                    {event.points === "l" ? (
                      <Chip label="Live" color="warning" />
                    ) : event.points === "r" ? (
                      <Chip label="Confirmed" color="success" />
                    ) : event.points === "p" ? (
                      <Chip label="Provisional" color="primary" />
                    ) : (
                      <Chip label="Not Played" color="error" />
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <Divider />
                  </td>
                </tr>
              </>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </StyledPaper>
  );
}
