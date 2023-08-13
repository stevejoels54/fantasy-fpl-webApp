import { useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { Typography, Avatar, Grid, Hidden } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { getLeagueStats } from "../config/helpers/LeagueStats";
import { isEmpty } from "lodash";
import ContentLoading from "./ContentLoading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#101C26" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const HomeRibbon = () => {
  const { leagueDataSuccess: league, leagueDataLoading: loading } = useSelector(
    (state: any) => state.rootReducer
  );

  const { teamData: teamData } = useSelector(
    (state: any) => state.rootReducer.fireBaseActions
  );

  const [userTeam, setUserTeam] = useState<any>({}); // current user's team data
  const [leagueStats, setLeagueStats] = useState({} as any);
  const [weekManager, setWeekManager] = useState<any>({}); // current week's manager of the week

  // useMemo function to get current user's team data
  useMemo(() => {
    const userTeam = league?.standings?.results?.find(
      (team: any) => team.entry === teamData?.teamId
    );
    if (userTeam) {
      setUserTeam(userTeam);
    }
    const leagueStats = getLeagueStats(league?.standings?.results || []);
    setLeagueStats(leagueStats);

    // get current week's manager of the week (manager with first rank points in league)
    const weekManager = league?.standings?.results?.find(
      (manager: any) => manager.rank === 1
    );
    setWeekManager(weekManager);
  }, [league, teamData]);

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
    <Grid container spacing={2} sx={{ margin: "0 0 0 0" }}>
      <Hidden mdDown>
        <Grid item xs={12} md={3}>
          <Item
            sx={{
              height: "15vh",
              backgroundColor: "#303840",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ContentLoading variant="h3" />
                <ContentLoading variant="h3" />
              </div>
            ) : (
              <div>
                <Typography variant="h4">Points</Typography>
                <Typography
                  variant="h4"
                  color={getColor(
                    userTeam?.event_total,
                    leagueStats?.averageScore
                  )}
                >
                  {userTeam?.event_total || ""}
                </Typography>
              </div>
            )}
          </Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item
            sx={{
              height: "15vh",
              backgroundColor: "#303840",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ContentLoading variant="h3" />
                <ContentLoading variant="h3" />
              </div>
            ) : (
              <div>
                <Typography variant="h4">Rank</Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">
                    {" "}
                    {userTeam?.rank}
                    {getOrdinalSuffix({
                      number: userTeam?.rank,
                    })}
                  </Typography>
                </div>
              </div>
            )}
          </Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item
            sx={{
              height: "15vh",
              backgroundColor: "#303840",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ContentLoading variant="h6" />
                <ContentLoading variant="h4" />
                <ContentLoading variant="h3" />
              </div>
            ) : (
              <div>
                <Typography variant="subtitle1">Manager of the Week</Typography>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {weekManager?.player_name || ""}
                </Typography>
                {!isEmpty(weekManager) && (
                  <Rating name="read-only" value={5} readOnly />
                )}
              </div>
            )}
          </Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item
            sx={{
              height: "15vh",
              backgroundColor: "#303840",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ContentLoading variant="h6" />
                <ContentLoading variant="h1" />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Favorite Team</Typography>
                <Avatar
                  alt="Team Logo"
                  src={`https://resources.premierleague.com/premierleague/badges/rb/t${teamData?.favoriteTeam}.svg`}
                  sx={{
                    width: 80,
                    height: 80,
                  }}
                />
              </div>
            )}
          </Item>
        </Grid>
      </Hidden>

      <Hidden mdUp>
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
            }}
          >
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
                }}
              >
                <Grid container alignItems="center" spacing={2}>
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
                    {loading ? (
                      <>
                        <ContentLoading variant="h3" />
                        <Box m={2} />
                        <ContentLoading variant="h3" />
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="h4"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          Points
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            textAlign: "center",
                          }}
                          color={getColor(
                            userTeam?.event_total,
                            leagueStats?.averageScore
                          )}
                        >
                          {userTeam?.event_total || ""}
                        </Typography>
                      </>
                    )}
                  </Grid>
                </Grid>
              </StyledPaper>

              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 1,
                  backgroundColor: "#101C26",
                  color: "#ffffff",
                  borderRadius: "10px",
                }}
              >
                <Grid container alignItems="center" spacing={2}>
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
                    {loading ? (
                      <>
                        <ContentLoading variant="h3" />
                        <Box m={2} />
                        <ContentLoading variant="h3" />
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="h4"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          Rank
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          {userTeam?.rank}
                          {getOrdinalSuffix({
                            number: userTeam?.rank,
                          })}
                        </Typography>
                      </>
                    )}
                  </Grid>
                </Grid>
              </StyledPaper>

              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 1,
                  backgroundColor: "#101C26",
                  color: "#ffffff",
                  borderRadius: "10px",
                }}
              >
                <Grid container alignItems="center" spacing={2}>
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
                    {loading ? (
                      <>
                        <ContentLoading variant="h6" />
                        <ContentLoading variant="h6" />
                        <ContentLoading variant="h4" />
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          Manager of the Week
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{ fontWeight: "bold" }}
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          {weekManager?.player_name || ""}
                        </Typography>
                        {!isEmpty(weekManager) && (
                          <Rating name="read-only" value={5} readOnly />
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
              </StyledPaper>
            </div>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ContentLoading variant="h6" />
                <ContentLoading variant="h1" />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Favorite Team</Typography>
                <Avatar
                  alt="Team Logo"
                  src={`https://resources.premierleague.com/premierleague/badges/rb/t${teamData?.favoriteTeam}.svg`}
                  sx={{
                    width: 80,
                    height: 80,
                  }}
                />
              </div>
            )}
          </Item>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default HomeRibbon;

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
