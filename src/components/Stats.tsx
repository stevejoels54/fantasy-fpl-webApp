import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import RelegationCard from "./RelegationCard";
import PromotionCard from "./PromotionCard";
import ManagerToWatch from "./ManagerToWatch";
import NumbersCard from "./NumbersCard";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  sortManagersByRank,
  sortManagersByLastRank,
  createLeaguesByRank,
  createLeaguesByLastRank,
  identifyPromotions,
  identifyRelegations,
} from "../config/helpers/LeagueStandings";
import {
  getLeagueStats,
  getManagerToWatch,
} from "../config/helpers/LeagueStats";
import ContentLoading from "./ContentLoading";
import { isEmpty } from "lodash";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Stats = () => {
  const {
    leagueDataSuccess: league,
    usersData,
    leagueDataLoading: loading,
  } = useSelector((state: any) => state.rootReducer);

  const [promotedManagers, setPromotedManagers] = useState([] as any);
  const [relegatedManagers, setRelegatedManagers] = useState([] as any);
  const [managerToWatch, setManagerToWatch] = useState({} as any);
  const [leagueStats, setLeagueStats] = useState({} as any);

  interface Manager {
    entry: number;
    entry_name: string;
    event_total: number;
    id: number;
    last_rank: number;
    player_name: string;
    rank: number;
    rank_sort: number;
    total: number;
  }

  useMemo(() => {
    if (league) {
      const sortedByRank = sortManagersByRank(league?.standings?.results || []);
      const leaguesByRank = createLeaguesByRank(sortedByRank);
      const sortedByLastRank = sortManagersByLastRank(
        league?.standings?.results || []
      );
      const leaguesByLastRank = createLeaguesByLastRank(sortedByLastRank);

      // Check if all managers have last_rank of zero (i.e. all managers are new)
      const allManagersAreNew = sortedByLastRank.every(
        (manager: Manager) => manager.last_rank === 0
      );

      let promotion, relegation;
      if (allManagersAreNew) {
        promotion = leaguesByRank.seniorLeague;
        relegation = leaguesByRank.juniorLeague;
      } else {
        promotion = identifyPromotions(
          leaguesByRank.seniorLeague,
          leaguesByLastRank.juniorLeague
        );
        relegation = identifyRelegations(
          leaguesByRank.juniorLeague,
          leaguesByLastRank.seniorLeague
        );
      }

      setPromotedManagers(promotion);
      setRelegatedManagers(relegation);

      const managerToWatch = getManagerToWatch(
        league?.standings?.results || []
      );
      setManagerToWatch(managerToWatch);

      const leagueStats = getLeagueStats(league?.standings?.results || []);
      setLeagueStats(leagueStats);
    }
  }, [league]);

  return (
    <div>
      <h1>Stats</h1>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4} md={6}>
          <Item
            sx={{
              height: "28vh",
              overflowY: "scroll",
              overflowX: "scroll",
              backgroundColor: "#101C26",
              color: "#ffffff",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
            className="no-scroll-bar"
          >
            <div>
              <Typography variant="subtitle1">Promoted Managers</Typography>
              {loading ? (
                <div>
                  {Array.from({ length: 8 }, (_, i) => (
                    <ContentLoading key={i} variant="h4" />
                  ))}
                </div>
              ) : (
                <div>
                  {promotedManagers?.map((manager: any, index: any) => (
                    <PromotionCard
                      key={index}
                      managerName={manager?.player_name}
                      teamName={manager?.entry_name}
                      avatar={
                        usersData?.find(
                          (user: any) => user?.team?.teamId === manager?.entry
                        )?.team?.teamPhotoUrl
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </Item>
        </Grid>
        <Grid item xs={4} md={6}>
          <Item
            sx={{
              height: "28vh",
              overflowY: "scroll",
              overflowX: "scroll",
              backgroundColor: "#101C26",
              color: "#ffffff",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
            className="no-scroll-bar"
          >
            <div>
              <Typography variant="subtitle1">Relegated Managers</Typography>
              {loading ? (
                <div>
                  {Array.from({ length: 8 }, (_, i) => (
                    <ContentLoading key={i} variant="h4" />
                  ))}
                </div>
              ) : (
                <div>
                  {relegatedManagers?.map((manager: any, index: any) => (
                    <RelegationCard
                      key={index}
                      managerName={manager?.player_name}
                      teamName={manager?.entry_name}
                      avatar={
                        usersData?.find(
                          (user: any) => user?.team?.teamId === manager?.entry
                        )?.team?.teamPhotoUrl
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </Item>
        </Grid>
        <Grid item xs={4} md={6}>
          <Item
            sx={{
              height: "28vh",
              overflowY: "scroll",
              overflowX: "scroll",
              backgroundColor: "#101C26",
              color: "#ffffff",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
            className="no-scroll-bar"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Manager To Watch</Typography>
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
                  <ContentLoading />
                </div>
              ) : (
                !isEmpty(league) && (
                  <>
                    <div>
                      <ManagerToWatch
                        managerName={managerToWatch?.player_name}
                        teamName={managerToWatch?.entry_name}
                        riseIndex={managerToWatch?.riseIndex}
                        avatar={
                          usersData?.find(
                            (user: any) =>
                              user?.team?.teamId === managerToWatch?.entry
                          )?.team?.teamPhotoUrl
                        }
                      />
                    </div>
                  </>
                )
              )}
            </div>
          </Item>
        </Grid>
        <Grid item xs={4} md={6}>
          <Item
            sx={{
              height: "28vh",
              overflowY: "scroll",
              overflowX: "scroll",
              backgroundColor: "#101C26",
              color: "#ffffff",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
            className="no-scroll-bar"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">General</Typography>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <ContentLoading key={i} variant="h4" />
                  ))}
                </div>
              ) : (
                !isEmpty(league) && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <NumbersCard title="Game Week" value={1} />
                      <NumbersCard
                        title="Total Points"
                        value={leagueStats?.totalSum}
                      />
                      <NumbersCard
                        title="Average Points"
                        value={leagueStats?.averageScore}
                      />
                      <NumbersCard
                        title="Highest Points"
                        value={leagueStats?.highestScore}
                      />
                      <NumbersCard
                        title="Lowest Points"
                        value={leagueStats?.lowestScore}
                      />
                    </div>
                  </>
                )
              )}
            </div>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default Stats;