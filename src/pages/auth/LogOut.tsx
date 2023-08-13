import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import appActions from "../../config/actions/actions";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const style = {
  bgcolor: "#303840",
  color: "#ffffff",
};

const LogOut = () => {
  const dispatch = useDispatch();
  const dialogState = useSelector(
    (state: any) => state.rootReducer.appUiState.logOutUserModal
  );

  const handleClose = () => {
    dispatch(appActions.toggleLogoutModal());
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(appActions.toggleLogoutModal());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Dialog
        open={dialogState}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ color: "#1" }}
      >
        <Box sx={style}>
          <DialogTitle id="responsive-dialog-title">
            {"LogOut User?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#ffffff" }}>
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              No
            </Button>
            <Button onClick={handleLogOut} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default LogOut;
