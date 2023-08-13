import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import { FcApproval } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import appActions from "../../../config/actions/actions";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "white",
        },
        filled: {
          color: "white",
        },
        outlined: {
          color: "white",
        },
        nativeInput: {
          color: "white",
        },
        standard: {
          color: "white",
          backgroundColor: "#303840",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

const TeamDetails = () => {
  const dispatch = useDispatch();

  const [entry, setEntry] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [favTeam, setFavTeam] = useState("");

  const { leagueDataSuccess: league, generalDataSuccess: generalData } =
    useSelector((state: any) => state.rootReducer);

  const { teamData: team, isTeamVerified: verified } = useSelector(
    (state: any) => state.rootReducer.fireBaseActions
  );

  const handleEntryChange = (event: SelectChangeEvent) => {
    setEntry(event.target.value);
  };

  const handleFavTeamChange = (event: SelectChangeEvent) => {
    setFavTeam(event.target.value);
  };

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

  const handleSubmit = () => {
    if (
      entry &&
      league?.standings?.results?.find((e: any) => e.entry === entry) &&
      favTeam
    ) {
      const team = league?.standings?.results?.find(
        (e: any) => e.entry === entry
      );
      const teamData = {
        teamName: team?.entry_name,
        teamId: team?.entry,
        managerName: team?.player_name,
        managerId: team?.id,
        teamPhotoUrl: null,
        favoriteTeam: favTeam,
      };

      const userDocRef = doc(db, "users", auth.currentUser?.uid || ""); // Use UID as document ID directly

      const docRef = collection(db, "users");
      const check = query(docRef, where("uid", "==", auth.currentUser?.uid));

      getDocs(check).then((data) => {
        if (data.docs.length > 0) {
          data.docs.forEach((doc) => {
            if (doc.data().team.teamId === teamData.teamId) {
              setError(true);
              setErrorMessage(
                "Team Already Linked, Select A Different Team Or Contact Admin"
              );
              setSuccess(false);
              setSuccessMessage("");
            }
          });
        } else {
          setLoading(true);
          setDoc(userDocRef, {
            uid: auth.currentUser?.uid,
            email: auth.currentUser?.email,
            team: teamData,
            verified: false,
            admin: false,
          })
            .then(() => {
              setLoading(false);
              setSuccess(true);
              setSuccessMessage(
                "Team Link Request Sent Successfully, wait for admin to verify"
              );
              setErrorMessage("");
              setError(false);
            })
            .catch(() => {
              setLoading(false);
              setError(true);
              setErrorMessage("Error Linking Team");
              setSuccess(false);
              setSuccessMessage("");
            });
        }
      });
    } else {
      setError(true);
      setErrorMessage("Please Select A Team");
      setSuccess(false);
      setSuccessMessage("");
    }
  };

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
        unsubscribeVerification();
      };
    }
  }, [userLoggedIn, dispatch]);

  const uploadTeamPicture = () => {
    dispatch(appActions.toggleUploadTeamPictureModal());
  };

  return (
    <ThemeProvider theme={theme}>
      {verified ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            {team?.teamPhotoUrl ? (
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <FcApproval
                    style={{
                      borderRadius: "50%",
                      padding: "5px",
                    }}
                    size={35}
                  />
                }
              >
                <Avatar
                  alt="Team Logo"
                  src={team?.teamPhotoUrl}
                  sx={{ width: 150, height: 150, marginBottom: "10px" }}
                />
              </Badge>
            ) : (
              <Avatar
                alt="Team Logo"
                sx={{ width: 150, height: 150, marginBottom: "10px" }}
              />
            )}
          </div>
          <Button
            variant="outlined"
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            onClick={uploadTeamPicture}
          >
            {isEmpty(team?.teamPhotoUrl)
              ? "Upload Team Picture"
              : "Change Team Picture"}
          </Button>
          <Typography
            variant="h5"
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              textAlign: "start",
              margin: "0",
            }}
          >
            {team?.teamName}
          </Typography>
          <Chip label="Team Verified" color="success" />
        </div>
      ) : (
        <div>
          {isEmpty(team) ? (
            <div>
              {userLoggedIn && (
                <div>
                  {error && (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {errorMessage}
                    </Alert>
                  )}
                  {success && (
                    <Alert severity="success">
                      <AlertTitle>Success</AlertTitle>
                      {successMessage}
                    </Alert>
                  )}
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: "#ffffff",
                      fontWeight: "bold",
                      textAlign: "start",
                      margin: "0",
                    }}
                  >
                    Link Team To Account
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FormControl
                      sx={{
                        m: 1,
                        minWidth: 120,
                        color: "white",
                        backgroundColor: "#101C26",
                        width: "100%",
                      }}
                    >
                      <Select
                        value={entry || ""}
                        onChange={handleEntryChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        placeholder="Select Manager"
                      >
                        <MenuItem value="" disabled>
                          Select Manager
                        </MenuItem>
                        {league?.standings?.results &&
                          league?.standings?.results?.map((entry: any) => (
                            <MenuItem value={entry.entry} key={entry.entry}>
                              {entry.player_name} - ({entry.entry_name})
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: "#ffffff",
                      fontWeight: "bold",
                      textAlign: "start",
                      margin: "0",
                    }}
                  >
                    Select Favourite Team
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FormControl
                      sx={{
                        m: 1,
                        minWidth: 120,
                        color: "white",
                        backgroundColor: "#101C26",
                        width: "100%",
                      }}
                    >
                      <Select
                        value={favTeam || ""}
                        onChange={handleFavTeamChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        placeholder="Select Favourite Team"
                      >
                        <MenuItem value="" disabled>
                          Select Favourite Team
                        </MenuItem>
                        {generalData?.teams?.map((team: any) => (
                          <MenuItem value={team.code} key={team.id}>
                            {team.name} - ({team.short_name})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{
                        margin: "1rem 0 1rem 0",
                      }}
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  {team?.teamPhotoUrl ? (
                    <Avatar
                      alt="Team Logo"
                      src={team?.teamPhotoUrl}
                      sx={{ width: 150, height: 150, marginBottom: "10px" }}
                    />
                  ) : (
                    <Avatar
                      alt="Team Logo"
                      sx={{ width: 150, height: 150, marginBottom: "10px" }}
                    />
                  )}
                </div>
                <Typography
                  variant="h5"
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    textAlign: "start",
                    margin: "0",
                  }}
                >
                  {team?.teamName}
                </Typography>
                <Chip label="Not Verified, Wait For Admin" color="primary" />
              </div>
            </div>
          )}
        </div>
      )}
    </ThemeProvider>
  );
};

export default TeamDetails;
