import { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCard from "../components/TableCard";
import {
  sortManagersByRank,
  createLeaguesByRank,
} from "../config/helpers/LeagueStandings";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import appActions from "../config/actions/actions";
import { getLeagueStats } from "../config/helpers/LeagueStats";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ContentLoading from "../components/ContentLoading";
import ErrorCard from "../components/ErrorCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Leagues = () => {
  const dispatch = useDispatch();
  const {
    leagueDataSuccess: league,
    leagueDataLoading: loading,
    leagueDataError: Error,
    usersData,
  } = useSelector((state: any) => state.rootReducer);

  const { teamData: team } = useSelector(
    (state: any) => state.rootReducer.fireBaseActions
  );

  const [leaguesByRank, setLeaguesByRank] = useState({} as any);
  const [sortedByRank, setSortedByRank] = useState([] as any);
  const [leagueStats, setLeagueStats] = useState<any>({});

  useMemo(() => {
    if (league) {
      const sortedByRank = sortManagersByRank(league?.standings?.results || []);
      const leaguesByRank = createLeaguesByRank(sortedByRank);
      setLeaguesByRank(leaguesByRank);
      setSortedByRank(sortedByRank);
    }
  }, [league]);

  useEffect(() => {
    if (isEmpty(league)) {
      dispatch(appActions.getLeagueData("314509"));
    }
  }, [dispatch, league]);

  useMemo(() => {
    const stats = getLeagueStats(league?.standings?.results);
    setLeagueStats(stats);
  }, [league]);

  type User = {
    admin: boolean;
    email: string;
    team: {
      favoriteTeam: number;
      managerId: number;
      managerName: string;
      teamId: number;
      teamName: string;
      teamPhotoUrl: string;
    };
    uid: string;
    verified: boolean;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollectionRef = collection(db, "users");
        const querySnapshot = await getDocs(userCollectionRef);

        const fetchedUsers: User[] = [];
        querySnapshot.forEach((doc) => {
          const userDoc = doc.data() as User;
          fetchedUsers.push(userDoc);
        });

        dispatch(appActions.setUsersData(fetchedUsers));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "7rem",
        width: "100%",
      }}
    >
      {isEmpty(Error) ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Item
                sx={{
                  height: "75vh",
                  overflowY: "scroll",
                  overflowX: "scroll",
                  backgroundColor: "#303840",
                  color: "#ffffff",
                  borderRadius: "10px",
                }}
                className="no-scroll-bar"
              >
                <div>
                  <h1>Senior League</h1>
                </div>
                {loading ? (
                  <div>
                    {Array.from({ length: 8 }, (_, i) => (
                      <ContentLoading key={i} variant="h1" />
                    ))}
                  </div>
                ) : (
                  <>
                    {leaguesByRank?.seniorLeague?.map(
                      (manager: any, index: any) => (
                        <TableCard
                          key={manager?.id}
                          managerName={manager?.player_name}
                          teamName={manager?.entry_name}
                          position={index + 1}
                          change={
                            manager?.last_rank === 0
                              ? 0
                              : manager?.last_rank === manager?.rank
                              ? 0
                              : manager?.last_rank < manager?.rank
                              ? -1
                              : 1
                          }
                          points={manager?.total}
                          eventPoints={manager?.event_total}
                          average={leagueStats?.averageScore}
                          is_manager={
                            manager?.entry === team?.teamId ? true : false
                          }
                          avatar={
                            usersData?.find(
                              (user: any) =>
                                user?.team?.teamId === manager?.entry
                            )?.team?.teamPhotoUrl
                          }
                        />
                      )
                    )}
                  </>
                )}
              </Item>
            </Grid>
            <Grid item xs={12} md={4}>
              <Item
                sx={{
                  height: "75vh",
                  overflowY: "scroll",
                  overflowX: "scroll",
                  backgroundColor: "#303840",
                  color: "#ffffff",
                  borderRadius: "10px",
                }}
                className="no-scroll-bar"
              >
                <div>
                  <h1>Junior League</h1>
                </div>
                {loading ? (
                  <div>
                    {Array.from({ length: 8 }, (_, i) => (
                      <ContentLoading key={i} variant="h1" />
                    ))}
                  </div>
                ) : (
                  <>
                    {leaguesByRank?.juniorLeague?.map(
                      (manager: any, index: any) => (
                        <TableCard
                          key={manager?.id}
                          managerName={manager?.player_name}
                          teamName={manager?.entry_name}
                          position={index + 1}
                          change={
                            manager?.last_rank === 0
                              ? 0
                              : manager?.last_rank === manager?.rank
                              ? 0
                              : manager?.last_rank < manager?.rank
                              ? -1
                              : 1
                          }
                          points={manager?.total}
                          eventPoints={manager?.event_total}
                          average={leagueStats?.averageScore}
                          is_manager={
                            manager?.entry === team?.teamId ? true : false
                          }
                          avatar={
                            usersData?.find(
                              (user: any) =>
                                user?.team?.teamId === manager?.entry
                            )?.team?.teamPhotoUrl
                          }
                        />
                      )
                    )}
                  </>
                )}
              </Item>
            </Grid>
            <Grid item xs={12} md={4}>
              <Item
                sx={{
                  height: "75vh",
                  overflowY: "scroll",
                  overflowX: "scroll",
                  backgroundColor: "#303840",
                  color: "#ffffff",
                  borderRadius: "10px",
                }}
                className="no-scroll-bar"
              >
                <div>
                  <h1>General League</h1>
                </div>
                {loading ? (
                  <div>
                    {Array.from({ length: 8 }, (_, i) => (
                      <ContentLoading key={i} variant="h1" />
                    ))}
                  </div>
                ) : (
                  <>
                    {sortedByRank?.map((manager: any, index: any) => (
                      <TableCard
                        key={manager?.id}
                        managerName={manager?.player_name}
                        teamName={manager?.entry_name}
                        position={index + 1}
                        change={
                          manager?.last_rank === 0
                            ? 0
                            : manager?.last_rank === manager?.rank
                            ? 0
                            : manager?.last_rank < manager?.rank
                            ? -1
                            : 1
                        }
                        points={manager?.total}
                        eventPoints={manager?.event_total}
                        average={leagueStats?.averageScore}
                        is_manager={
                          manager?.entry === team?.teamId ? true : false
                        }
                        avatar={
                          usersData?.find(
                            (user: any) => user?.team?.teamId === manager?.entry
                          )?.team?.teamPhotoUrl
                        }
                      />
                    ))}
                  </>
                )}
              </Item>
            </Grid>
          </Grid>
        </>
      ) : (
        <ErrorCard />
      )}
    </div>
  );
};

export default Leagues;
