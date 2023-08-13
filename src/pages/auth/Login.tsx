import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import appActions from "../../config/actions/actions";
import { useNavigate } from "react-router-dom";
import { storeUserDetailsInLocalStorage } from "../../services/storage.service";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
    // change label color
    "& label.Mui-focused": {
      color: "#ffffff",
    },
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const openResetPasswordModal = () => {
    dispatch(appActions.toggleResetPasswordModal());
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: any) => {
    setLoading(true);
    event.preventDefault();
    signInWithEmailAndPassword(auth, formState.email, formState.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setFormState({
          email: "",
          password: "",
        });
        setSuccess(true);
        setError(false);
        setSuccessMessage("Logged in successfully!");
        setLoading(false);
        navigate("/");
        dispatch(
          appActions.setUserData({
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
            emailVerified: user.emailVerified,
          })
        );
        storeUserDetailsInLocalStorage(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(true);
        setSuccess(false);
        setErrorMessage(errorMessage.split(":")[1]);
        setLoading(false);
      });
  };

  return (
    <StyledPaper
      sx={{
        backgroundColor: "#303840",
        color: "#ffffff",
        marginTop: "1rem",
      }}
      className="form-container"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          style={{
            margin: "1rem",
            backgroundColor: "#101C26",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
          }}
        >
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
            {error ? (
              <Alert severity="error" sx={{ width: "90%" }}>
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
              </Alert>
            ) : null}
            {success ? (
              <Alert
                severity="success"
                sx={{ width: "90%", textAlign: "center" }}
              >
                <AlertTitle>Success</AlertTitle>
                {successMessage}
              </Alert>
            ) : null}
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
            Email
          </Typography>
          <CustomTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            type="email"
            autoFocus
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              margin: "0",
            }}
            onChange={handleInputChange}
            value={formState.email}
          />
          <div
            style={{
              marginTop: "1rem",
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                color: "#ffffff",
                fontWeight: "bold",
                textAlign: "start",
                margin: "0",
              }}
            >
              Password
            </Typography>
            <CustomTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                margin: "0",
              }}
              onChange={handleInputChange}
              value={formState.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      style={{
                        color: "#ffffff",
                      }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {loading ? (
            <LoadingButton
              loading
              variant="contained"
              color="primary"
              sx={{
                margin: "1rem 0 1rem 0",
                width: "100%",
                backgroundColor: "#ffffff",
                color: "#ffffff",
              }}
            >
              <span>Loading</span>
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{
                margin: "1rem 0 1rem 0",
              }}
            >
              Login
            </Button>
          )}
          <Grid container>
            <Grid item xs>
              <Button variant="text" onClick={openResetPasswordModal}>
                Forgot password?
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </StyledPaper>
  );
};

export default Login;
