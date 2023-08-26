import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableCard from "../components/TableCard";
import Stats from "../components/Stats";
import { isEmpty } from "lodash";
import appActions from "../config/actions/actions";
import HomeRibbon from "../components/HomeRibbon";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getLeagueStats } from "../config/helpers/LeagueStats";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import ContentLoading from "../components/ContentLoading";
import ErrorCard from "../components/ErrorCard";
import GameWeekInfo from "../components/GameWeekInfo";
import { sortManagersByRank } from "../config/helpers/LeagueStandings";
import Fab from "@mui/material/Fab";
import ReplayIcon from "@mui/icons-material/Replay";
import { CircularProgress } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const dispatch = useDispatch();

  const {
    leagueDataSuccess: league,
    leagueDataLoading: loading,
    generalDataSuccess: generalData,
    leagueDataError: Error,
    usersData,
  } = useSelector((state: any) => state.rootReducer);

  const { teamData: team, isTeamVerified: verified } = useSelector(
    (state: any) => state.rootReducer.fireBaseActions
  );

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [leagueStats, setLeagueStats] = useState<any>({});
  const [sortedByRank, setSortedByRank] = useState([] as any);

  useEffect(() => {
    if (league) {
      const sortedByRank = sortManagersByRank(league?.standings?.results || []);
      setSortedByRank(sortedByRank);
    }
  }, [league]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isEmpty(league)) {
      dispatch(appActions.getLeagueData("314509"));
    }
  }, [dispatch, league]);

  useEffect(() => {
    if (isEmpty(generalData)) {
      dispatch(appActions.getGeneralData());
    }
  }, [dispatch, generalData]);

  useMemo(() => {
    const stats = getLeagueStats(league?.standings?.results);
    setLeagueStats(stats);
  }, [league]);

  useEffect(() => {
    if (userLoggedIn) {
      const userRef = collection(db, "users");
      const userQuery = query(
        userRef,
        where("uid", "==", auth.currentUser?.uid)
      );

      const unsubscribeVerification = onSnapshot(userQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const isVerified = doc.data().verified;
          dispatch(appActions.toggleIsTeamVerified(isVerified));
          dispatch(appActions.setTeamData(doc.data().team));
        });
      });

      return () => {
        // Unsubscribe from onSnapshot listeners when component unmounts
        unsubscribeVerification();
      };
    }
  }, [userLoggedIn, dispatch]);

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

  const handleRefresh = () => {
    dispatch(appActions.getLeagueData("314509"));
    dispatch(appActions.getEventData());
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "8rem",
      }}
    >
      {isEmpty(Error) ? (
        <>
          <Grid container spacing={2}>
            {userLoggedIn && verified && <HomeRibbon />}
            <GameWeekInfo />
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
                {loading ? (
                  <div>
                    {Array.from({ length: 8 }, (_, i) => (
                      <ContentLoading key={i} variant="h1" />
                    ))}
                  </div>
                ) : (
                  <div>
                    <div>
                      {!isEmpty(league) && (
                        <>
                          <h1>
                            {isEmpty(league?.standings?.results)
                              ? "League Entries"
                              : "League Standings"}
                          </h1>
                        </>
                      )}
                    </div>
                    {isEmpty(league?.standings?.results)
                      ? league?.entries?.results?.map(
                          (manager: any, index: number) => (
                            <TableCard
                              key={index}
                              is_entry={true}
                              managerName={`${manager?.player_first_name} ${manager?.player_last_name}`}
                              teamName={manager?.entry_name}
                              position={0}
                              change={0}
                              points={0}
                              avatar={
                                usersData?.find(
                                  (user: any) =>
                                    user?.team?.teamId === manager?.entry
                                )?.team?.teamPhotoUrl
                              }
                            />
                          )
                        )
                      : sortedByRank?.map((manager: any, index: any) => (
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
                        ))}
                  </div>
                )}
              </Item>
            </Grid>
            <Grid item xs={12} md={8}>
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
                <Stats />
              </Item>
            </Grid>
            <Fab
              sx={{
                position: "fixed",
                bottom: "2rem",
                right: "2rem",
                zIndex: 1000,
                // backgroundColor: "#303840",
                backgroundColor: "#6200ea",
              }}
              onClick={handleRefresh}
              color="primary"
            >
              {loading ? (
                <CircularProgress
                  sx={{
                    color: "#ffffff",
                  }}
                />
              ) : (
                <ReplayIcon
                  sx={{
                    color: "#ffffff",
                  }}
                />
              )}
            </Fab>
          </Grid>
        </>
      ) : (
        <>
          {Error?.response?.status === 503 ? (
            <ErrorCard
              message="The FPL game is currently being updated. Please try again later.
            "
            />
          ) : (
            <ErrorCard />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
