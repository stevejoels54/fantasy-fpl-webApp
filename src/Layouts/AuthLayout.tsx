import * as React from "react";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import logo from "../assets/logo.png";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPasswordForm from "../pages/auth/ResetPassword";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const [value, setValue] = React.useState(0);
  const [resetPassword, setResetPassword] = React.useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isPasswordReset = useSelector(
    (state: any) => state.rootReducer.fireBaseActions.isPasswordReset
  );

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("mode") === "resetPassword") {
      setResetPassword(true);
    }
  }, [location]);

  useEffect(() => {
    if (isPasswordReset) {
      setResetPassword(false);
    }
  }, [isPasswordReset]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#101C26",
        overflow: "hidden",
        position: "fixed",
      }}
    >
      <ForgotPassword />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          margin: "0.5rem",
          overflowY: "scroll",
          overflowX: "scroll",
        }}
      >
        <Avatar
          alt="Fantasy Supreme Logo"
          src={logo}
          sx={{
            width: 100,
            height: 100,
            margin: "1rem",
            marginTop: "1rem",
          }}
        />
        <Typography
          variant="h4"
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Fantasy Supreme
        </Typography>
        {resetPassword && (
          <div>
            <Typography
              variant="h6"
              style={{
                color: "#ffffff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Reset Password
            </Typography>
            <ResetPasswordForm />
          </div>
        )}
        {!resetPassword && (
          <div
            style={{
              width: "100%",
              margin: "1rem 0 1rem 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              sx={{
                backgroundColor: "#101C26",
                color: "#ffffff",
              }}
            >
              <Tab
                label="Login"
                sx={{
                  backgroundColor: "#101C26",
                  color: "#ffffff",
                }}
              />
              <Tab
                label="Sign Up"
                sx={{
                  backgroundColor: "#101C26",
                  color: "#ffffff",
                }}
              />
            </Tabs>
            {value === 0 ? <Login /> : <SignUp />}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
