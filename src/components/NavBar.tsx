import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { SiPremierleague } from "react-icons/si";
import { GiSoccerBall } from "react-icons/gi";
import { TbShirtSport, TbSoccerField } from "react-icons/tb";
import { Avatar, Hidden } from "@mui/material";
import logo from "../assets/logo.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Menu as MenuIcon } from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../config/actions/actions";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface Page {
  name: string;
  icon: JSX.Element;
}

const HomeAvatar = () => {
  return <Avatar alt="Logo" src={logo} sx={{ width: 70, height: 70 }} />;
};

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pages: Page[] = [
    { name: "Home", icon: <HomeAvatar /> },
    { name: "Leagues", icon: <SiPremierleague /> },
    { name: "Fixtures", icon: <GiSoccerBall /> },
    { name: "Players", icon: <TbShirtSport /> },
    { name: "Teams", icon: <TbSoccerField /> },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleNavigation = (page: string) => {
    dispatch(appActions.setActiveComponent(page));
    setDrawerOpen(false);
  };

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<any>({});

  const profilePictureChanged = useSelector(
    (state: any) => state.rootReducer.fireBaseActions.isProfilePictureSet
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
  }, [profilePictureChanged]);

  const LogOut = () => {
    dispatch(appActions.toggleLogoutModal());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Hidden mdUp>
        <Toolbar>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, color: "#ffffff" }}
              onClick={handleMenuClick}
            >
              <MenuIcon
                sx={{
                  color: "#ffffff",
                }}
              />
            </IconButton>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              {userLoggedIn ? (
                <div>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      alt={userProfile.email}
                      src={userProfile.photoURL}
                      sx={{ width: 50, height: 50 }}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "#303840",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    sx={{
                      mt: "1px",
                      "& .MuiMenu-paper": {
                        backgroundColor: "#303840",
                        color: "#ffffff",
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={() => handleNavigation("Profile")}>
                      <Avatar /> Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon
                        sx={{
                          color: "#ffffff",
                        }}
                      >
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={LogOut}>
                      <ListItemIcon
                        sx={{
                          color: "#ffffff",
                        }}
                      >
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button variant="outlined" onClick={() => navigate("/auth")}>
                  login
                </Button>
              )}
            </div>
          </div>
        </Toolbar>
        <Drawer
          anchor="top"
          open={isDrawerOpen} // Use the state to control the open state of the drawer
          onClose={handleDrawerClose} // Close the drawer on click outside
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#303840",
              color: "#ffffff",
            },
          }}
        >
          <div>
            <div>
              {pages.map((page) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                  key={page.name}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "0 20px",
                    }}
                  >
                    <IconButton
                      size="medium"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={() => handleNavigation(page.name)}
                    >
                      {page.icon}
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, marginLeft: "10px" }}
                      >
                        {page.name === "Home" ? "Fantasy Supreme" : page.name}
                      </Typography>
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#303840",
            color: "#ffffff",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={() => handleNavigation("Home")}
              >
                <img src={logo} alt="Logo" style={{ height: "75px" }} />
              </IconButton>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {pages.map((page) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                    key={page.name}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "0 20px",
                      }}
                    >
                      {page.name !== "Home" ? (
                        <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="menu"
                          onClick={() => handleNavigation(page.name)}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {page.icon}
                            <Typography
                              variant="h6"
                              component="div"
                              sx={{ flexGrow: 1, marginLeft: "10px" }}
                            >
                              {page.name}
                            </Typography>
                          </div>
                        </IconButton>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {userLoggedIn ? (
              <div>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    alt={userProfile.email}
                    src={userProfile.photoURL}
                    sx={{ width: 50, height: 50 }}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "#303840",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  sx={{
                    mt: "1px",
                    "& .MuiMenu-paper": {
                      backgroundColor: "#303840",
                      color: "#ffffff",
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => handleNavigation("Profile")}>
                    <Avatar /> Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon
                      sx={{
                        color: "#ffffff",
                      }}
                    >
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={LogOut}>
                    <ListItemIcon
                      sx={{
                        color: "#ffffff",
                      }}
                    >
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button variant="outlined" onClick={() => navigate("/auth")}>
                login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Hidden>
    </Box>
  );
}
export default ResponsiveAppBar;
