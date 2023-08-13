import { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { auth } from "../../firebase";
import { confirmPasswordReset } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import appActions from "../../config/actions/actions";

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
    "& label.Mui-focused": {
      color: "#ffffff",
    },
  },
});

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const oobCode = params.get("oobCode") || "";

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (formState.newPassword !== formState.confirmNewPassword) {
      setError(true);
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(false);
    setErrorMessage("");
    setSuccess(false);
    setSuccessMessage("");

    // Call Firebase function to reset the password with the oobCode and the new password
    confirmPasswordReset(auth, oobCode, formState.newPassword)
      .then(() => {
        setFormState({
          newPassword: "",
          confirmNewPassword: "",
        });
        setSuccess(true);
        setSuccessMessage("Password reset successful!");
        setLoading(false);
        setTimeout(() => {
          navigate("/auth");
          dispatch(appActions.setIsPasswordReset(true));
        }, 2000);
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message);
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
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
        <form onSubmit={handleSubmit}>
          <Typography
            variant="subtitle1"
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              textAlign: "start",
              margin: "0",
              marginTop: "1rem",
            }}
          >
            Password
          </Typography>
          <CustomTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            type={showPassword ? "text" : "password"}
            value={formState.newPassword}
            onChange={handleInputChange}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
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
          <Typography
            variant="subtitle1"
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              textAlign: "start",
              margin: "0",
            }}
          >
            Confirm Password
          </Typography>
          <CustomTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmNewPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formState.confirmNewPassword}
            onChange={handleInputChange}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggleConfirmPassword}
                    edge="end"
                    style={{
                      color: "#ffffff",
                    }}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            type="submit"
            loading={loading}
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Reset Password
          </LoadingButton>
        </form>
      </div>
    </StyledPaper>
  );
};

export default ResetPasswordForm;
