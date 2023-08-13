import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

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

const SignUp = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

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
    createUserWithEmailAndPassword(auth, formState.email, formState.password)
      .then(() => {
        setFormState({
          email: "",
          password: "",
        });
        setSuccess(true);
        setError(false);
        setSuccessMessage("Account created successfully!");
        setLoading(false);
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
          Sign Up
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
              Sign Up
            </Button>
          )}
        </form>
      </div>
    </StyledPaper>
  );
};

export default SignUp;
