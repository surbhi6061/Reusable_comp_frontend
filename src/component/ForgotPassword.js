/** @jsx */

import { jsx } from "@emotion/react";
import React, { useEffect, useRef } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
// import { useSelector } from "react-redux";
import { makeStyles, createStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
// import {
//   sendForgotPasswordMail,
//   resetStatus,
// } from "redux/userForgotPassword/userForgot.slice";
import InputText from "./Common/InputText";

const useStyles = makeStyles((theme) => {
  return createStyles({
    mainContainer: {
      display: 'flex'
    },
    formContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    
    form: {
      width: "80%",
      maxWidth: "480px",
      display: "flex",
      padding: '30px',
      boxShadow: '0px 6px 24px rgb(0 0 0 / 20%)',
      flexDirection: "column",
     
    },
    formLabel: {
      textAlign: "left",
      width: "100%",
      marginBottom: "16px !important",
      fontWeight: "600",
      letterSpacing: 0,
      
    },
    formSubLabel: {
      fontWeight: "bold !important",
      textAlign: "left",
      width: "100%",
      marginBottom: "16px !important",
      letterSpacing: 0,
    },
    formBottom: {
      display: "flex",
      justifyContent: "space-between",
    },
    dividerContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      margin: "20px 0",
    },
    dividerLabel: {
      margin: "0 20px",
    },
    divider: {
      flex: 1,
      border: "solid thin #a5a5a5",
    },
    input: {
      "& .MuiOutlinedInput-root": {
        backgroundColor: "#ffffff",
      },
      marginBottom: "16px !important",
    },
    link: {
      textDecoration: "none",
      fontSize: "19px !important",
      fontWeight: "bold !important",
    },
    SubmitButtonColor: {
      fontWeight: "600",
      flex: 1,
      width: "100%",
    },
  });
});

const ForgotPassword = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  let keysToRemove = ["user", "token", "page"];
  const handleSendLoginLink = async (values) => {
    // dispatch(sendForgotPasswordMail(values));
    console.log(values);
  };
  const [handlesnakbar, sethandlesnakbar] = useState(false);
  // const { status } = useSelector((state) => state.userForgotPassword);
  const [message, setmessage] = useState({ text: "" });
  const [info, setInfo] = useState("success");
  

  // useEffect(() => {
  //   if (status === "success") {
  //     setmessage({ text: "email sent successfully" });
  //     sethandlesnakbar(true);
  //     setInfo("success");
  //     setTimeout(() => {
  //       // dispatch(resetStatus());
  //     }, 4000);
  //   } else if (status === "error") {
  //     setmessage({ text: "email not sent" });
  //     sethandlesnakbar(true);
  //     setInfo("error");
  //   } else {
  //     sethandlesnakbar(false);
  //   }
  // }, [status]);

  const handleClose = () => {
    sethandlesnakbar(false);
  };

  useEffect(() => {
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string().required("Please enter your email address"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    onSubmit: handleSendLoginLink,
    validationSchema,
  });

  return (
    <div className={classes.mainContainer}>
      <div className={classes.imageContainer}></div>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Typography variant="h5" className={classes.formLabel}>
            Trouble Logging In?
          </Typography>
          <Typography className={classes.formSubLabel}>
            Enter Your Email, Phone, or Username & we'll Send you a Link to Get
            Back into Your Account.
          </Typography>
          <InputText
            id="username"
            name="username"
            type="email"
            label="Email Address or Phone Number"
            className={classes.input}
            onChange={formik.handleChange}
            helperText={formik.touched.username && formik.errors.username}
            error={formik.touched.username && !!formik.errors.username}
            onBlur={formik.handleBlur}
          />

          <div className={classes.formBottom}>
            <Button
              variant="contained"
              disableElevation
              type="submit"
              className={classes.SubmitButtonColor}
            >
              Submit
            </Button>
          </div>

          <div className={classes.dividerContainer}>
            <div className={classes.divider}></div>
            <Typography className={classes.dividerLabel}>OR</Typography>
            <div className={classes.divider}></div>
          </div>

          <div>
            <Typography>
              <Link to="/signup" className={classes.link}>
                Sign Up / Create New Account
              </Link>
            </Typography>
            <Box>
              <Typography>
                Back To{" "}
                <Link to="/login" className={classes.link}>
                  <span id="disable">Login</span>
                </Link>
              </Typography>
            </Box>
          </div>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={handlesnakbar}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={info}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {message.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
