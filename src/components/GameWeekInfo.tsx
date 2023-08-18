import { useMemo, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import getCurrentGameweek from "../config/helpers/GameWeeks";
import { isEmpty } from "lodash";
import appActions from "../config/actions/actions";
import LeagueStatusTable from "./LeagueStatusTable";
import ContentLoading from "./ContentLoading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const GameWeekInfo = () => {
  const dispatch = useDispatch();
  const {
    // leagueDataSuccess: league,
    // usersData,
    leagueDataLoading: loading,
    generalDataSuccess: generalData,
    generalDataLoading: dataLoading,
    eventDataSuccess: eventData,
  } = useSelector((state: any) => state.rootReducer);

  useEffect(() => {
    if (isEmpty(eventData)) {
      dispatch(appActions.getEventData());
    }
  }, [dispatch, eventData]);

  // useMemo to get the current gameweek
  const currentGameweek = useMemo(() => {
    if (generalData) {
      return getCurrentGameweek(generalData);
    }
  }, [generalData]);

  return (
    <Grid container spacing={2} sx={{ margin: "0 0 0 0" }}>
      <Grid item xs={12} md={12}>
        <Item
          sx={{
            backgroundColor: "#303840",
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 0 0 0",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {loading || dataLoading ? (
            <ContentLoading />
          ) : (
            <>
              <h2>
                <strong>{currentGameweek?.name || "Gameweek"}</strong>
              </h2>
              <LeagueStatusTable />
            </>
          )}
        </Item>
      </Grid>
    </Grid>
  );
};

export default GameWeekInfo;
