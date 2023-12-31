import React, { useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import appActions from "../../../config/actions/actions";
import { storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from "../../../firebase";
import { updateProfile } from "firebase/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#303840",
  color: "#ffffff",
  boxShadow: 24,
  p: 4,
  width: "75%",
  "@media (min-width: 600px)": {
    width: "50%",
  },
  "@media (min-width: 960px)": {
    width: "35%",
  },
};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="#ffffff
        "
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const UploadProfilePicture = () => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No selected File");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setFile(files ? files[0] : null);
    if (files && files[0]) {
      setFileName(files[0].name);
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const handleDelete = () => {
    setFileName("No selected File");
    setImage(null);
  };

  const dispatch = useDispatch();
  const modalState = useSelector(
    (state: any) => state.rootReducer.appUiState.uploadProfilePictureModal
  );
  const handleClose = () => {
    dispatch(appActions.toggleUploadProfilePictureModal());
  };

  const handleProfilePictureSuccess = () => {
    dispatch(appActions.toggleUploadProfilePictureSet());
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // before uploading the file check if the file is selected
    if (!file) {
      return;
    }
    const storageRef = ref(storage, `profile/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file as Blob);
    setLoading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
        }
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Update profile picture
          updateProfile(auth.currentUser as any, {
            photoURL: downloadURL,
          })
            .then(() => {
              console.log("Profile updated!");
              handleDelete();
              handleClose();
              handleProfilePictureSuccess();
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        });
      }
    );
  };

  return (
    <Modal
      open={modalState}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <form
            onClick={() => {
              const inputField = document.querySelector(
                ".input-field"
              ) as HTMLInputElement;
              inputField.click();
            }}
            className="upload-form"
          >
            <input
              type="file"
              accept="image/*"
              className="input-field"
              hidden
              onChange={handleFileChange}
            />

            {image ? (
              <img src={image} width={150} height={150} alt={fileName} />
            ) : (
              <>
                <MdCloudUpload color="#1475cf" size={60} />
                <Typography
                  variant="h6"
                  style={{
                    color: "#ffffff",
                  }}
                >
                  Click To Upload Image
                </Typography>
              </>
            )}
          </form>
          {fileName !== "No selected File" && (
            <section
              className="uploaded-row"
              style={{
                color: "#ffffff",
                backgroundColor: "#1A2027",
              }}
            >
              <AiFillFileImage color="#1475cf" />
              <span
                className="upload-content"
                style={{
                  color: "#ffffff",
                }}
              >
                <Typography
                  variant="subtitle2"
                  style={{
                    color: "#ffffff",
                  }}
                >
                  {fileName}
                </Typography>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={handleDelete}
                  style={{
                    color: "#ffffff",
                  }}
                >
                  <MdDelete />
                </IconButton>
              </span>
            </section>
          )}
          {progress > 0 && <LinearProgressWithLabel value={progress} />}
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "10px",
              width: "100%",
            }}
            disabled={loading}
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default UploadProfilePicture;
