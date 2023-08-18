import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import appActions from "../../../config/actions/actions";
import { auth } from "../../../firebase";
import { updateProfile } from "firebase/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "#303840",
  color: "#ffffff",
  boxShadow: 24,
  p: 4,
  "@media (min-width: 600px)": {
    width: "50%",
  },
  "@media (min-width: 960px)": {
    width: "35%",
  },
};

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

const AddUserName = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(
    (state: any) => state.rootReducer.appUiState.userNameModal
  );

  const [formState, setFormState] = useState({
    userName: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleClose = () => {
    dispatch(appActions.toggleUsernameModal());
    setSuccess(false);
    setError(false);
  };

  const handleUserNameSuccess = () => {
    dispatch(appActions.toggleUsernameSet());
  };

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  const onSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);

    const user = auth.currentUser;

    if (user) {
      updateProfile(user, { displayName: formState.userName })
        .then(() => {
          setSuccess(true);
          setError(false);
          setSuccessMessage("User name updated successfully!");
          setLoading(false);
          handleUserNameSuccess();
          setFormState({
            userName: "",
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(true);
          setSuccess(false);
          setErrorMessage(errorMessage);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Modal
        open={modalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {user?.displayName ? "Update User Name" : "Add User Name"}
            </Typography>
            <Divider />
            <div>
              <form onSubmit={onSubmit}>
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
                  User Name
                </Typography>
                <CustomTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  name="userName"
                  type="text"
                  autoFocus
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    margin: "0",
                  }}
                  onChange={handleInputChange}
                  value={formState.userName}
                />
                {loading ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{
                      margin: "1rem 0 1rem 0",
                    }}
                    disabled
                  >
                    Submit
                  </Button>
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
                    Submit
                  </Button>
                )}
              </form>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AddUserName;
