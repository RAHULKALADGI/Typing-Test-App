import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
import { useTheme } from "../context/ThemeContext";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const AccountCircle = () => {
  let [open, setOpen] = useState(false);
  let [value, setValue] = useState(0);
  let { theme } = useTheme();

  let [user] = useAuthState(auth);
  let navigate = useNavigate();

  let handleOpen = () => {
    if (user) {
      navigate("/user");
    } else {
      setOpen(true);
    }
  };

  let handleClose = () => {
    setOpen(false);
  };

  let handleValueChange = (e, v) => {
    setValue(v);
  };

  let logout = () => {
    auth
      .signOut()
      .then((res) => {
        toast.success("Logged Out", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error(errorMapping[err.code] || "Not able to Logout", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  let googleProvider = new GoogleAuthProvider();

  let handleGoogleSignUp = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success("Google Login Successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleClose();
      })
      .catch((err) => {
        toast.error(
          errorMapping[err.code] || "Not able to use Google authentication",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      });
  };

  return (
    <div>
      <AccountCircleIcon onClick={handleOpen} />
      {user && <LogoutIcon onClick={logout} />}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "40vw",
            textAlign: "center",
            border: "2px solid",
            background: theme.background,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <AppBar position="static" style={{ background: theme.background }}>
            <Tabs
              value={value}
              onChange={handleValueChange}
              variant="fullWidth"
            >
              <Tab label="Login" style={{ color: theme.textColor }} />
              <Tab label="Signup" style={{ color: theme.textColor }} />
            </Tabs>
          </AppBar>
          {value === 0 && <Login handleClose={handleClose} />}
          {value === 1 && <SignUp handleClose={handleClose} />}
          <Box>
            <span>OR</span>
            <GoogleButton
              style={{
                width: "100%",
                marginTop: "0.8rem",
              }}
              onClick={handleGoogleSignUp}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AccountCircle;
