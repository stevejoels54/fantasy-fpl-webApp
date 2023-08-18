import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import appActions from "../../../config/actions/actions";
import UploadProfilePicture from "./UploadProfilePicture";
import { useSelector } from "react-redux";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { isEmpty } from "lodash";
import AddUserName from "./AddUserName";
import TeamDetails from "../team/TeamDetails";
import UploadTeamPicture from "../team/UploadTeamPicture";
import ContentLoading from "../../../components/ContentLoading";
import ErrorCard from "../../../components/ErrorCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Profile = () => {
  const dispatch = useDispatch();
  const uploadProfilePicture = () => {
    dispatch(appActions.toggleUploadProfilePictureModal());
  };
  const usernameModal = () => {
    dispatch(appActions.toggleUsernameModal());
  };

  const [userProfile, setUserProfile] = useState<any>({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const {
    leagueDataSuccess: league,
    leagueDataLoading: loading,
    leagueDataError: Error,
  } = useSelector((state: any) => state.rootReducer);

  const profilePictureChanged = useSelector(
    (state: any) => state.rootReducer.fireBaseActions.isProfilePictureSet
  );
  const userNameChanged = useSelector(
    (state: any) => state.rootReducer.fireBaseActions.isUserNameSet
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
        setUserProfile(user);
      } else {
        setUserLoggedIn(false);
      }
    });
    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [profilePictureChanged, userNameChanged]);

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
          <AddUserName />
          <UploadProfilePicture />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {loading ? (
                <>
                  <ContentLoading />
                </>
              ) : (
                <>
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
                    {userLoggedIn ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <h1>Profile</h1>
                        {!isEmpty(league) && (
                          <>
                            <Avatar
                              alt={userProfile.displayName || userProfile.email}
                              src={userProfile.photoURL}
                              sx={{
                                width: 150,
                                height: 150,
                                marginBottom: "10px",
                              }}
                            />
                            <Button
                              onClick={uploadProfilePicture}
                              variant="outlined"
                              style={{
                                marginTop: "1rem",
                              }}
                            >
                              {isEmpty(userProfile.photoURL)
                                ? "Upload Profile Picture"
                                : "Change Profile Picture"}
                            </Button>
                            {isEmpty(userProfile.displayName) ? (
                              <div>
                                <Typography
                                  variant="h5"
                                  component="div"
                                  sx={{ marginTop: "0.2rem" }}
                                >
                                  {userProfile.email}
                                </Typography>
                                <Button
                                  onClick={usernameModal}
                                  variant="outlined"
                                  style={{
                                    marginTop: "1rem",
                                  }}
                                >
                                  {isEmpty(userProfile.displayName)
                                    ? "Add UserName"
                                    : "Change UserName"}
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <Typography
                                  variant="h5"
                                  component="div"
                                  sx={{ marginTop: "1rem" }}
                                >
                                  {userProfile.displayName}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  component="div"
                                  sx={{ marginTop: "0.2rem" }}
                                >
                                  {userProfile.email}
                                </Typography>
                                <Button
                                  onClick={usernameModal}
                                  variant="outlined"
                                  style={{
                                    marginTop: "1rem",
                                  }}
                                >
                                  {isEmpty(userProfile.displayName)
                                    ? "Add UserName"
                                    : "Change UserName"}
                                </Button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ) : null}
                  </Item>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
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
                <h1>Team Details</h1>
                {!isEmpty(league) && (
                  <>
                    <TeamDetails />
                    <UploadTeamPicture />
                  </>
                )}
              </Item>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <ErrorCard />
        </>
      )}
    </div>
  );
};

export default Profile;
