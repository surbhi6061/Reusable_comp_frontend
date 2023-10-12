import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import InputText from "./Common/InputText";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  resetOtp,
  getUserSSOFetch,
  getUserGoogleFetch,
  getUserSignupFetch,
} from "../Redux/Signup/signup.slice";

import {
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f1f3f4",
  },
  form: {
    width: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "9px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#159AFF",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
  },

  input: {
    width: "90%",
    borderRadius: "4px",
    marginBottom: "10px !important",
    padding: "10px",
    background: "#f8f8f8",
    border: "1px solid #E4E4E4",
    outline: "none",
    fontSize: "16px",
    "&:focus": {
      borderColor: "#159AFF",
    },
    "& .MuiFormHelperText-contained": {
      backgroundColor: "white",
      width: "100%",
      marginLeft: "0px",
      marginTop: "0px",
    },
  },
  submitButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#159AFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#1282e6",
    },
  },
}));

const SignUpForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const { sso_user } = useSelector((state) => state.signup);
  // console.log("test", sso_user);
  const regexMatch =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .matches(
        regexMatch,
        "Your password should contain at least one uppercase, lowercase, number and a special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Please make sure your passwords match"
      )
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values) => {
    console.log(formik.values);
    

    dispatch(getUserSignupFetch(formik.values));
    dispatch(getUserGoogleFetch(values));
  };

  
  
  const formik = useFormik({
    initialValues: {
      firstName: sso_user ? sso_user.givenName : "",
      lastName: sso_user ? sso_user.familyName : "",
      phoneNumber: "",
      email: sso_user ? sso_user.email : "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  useEffect(() => {
    dispatch(resetOtp());
    dispatch(getUserSSOFetch());
  }, []);

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <h2 className={classes.title}>Sign Up</h2>
        <div className={classes.formGroup}>
          <InputText
            placeholder="First Name"
            id="firstName"
            name="firstName"
            className={classes.input}
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && !!formik.errors.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </div>
        <div className={classes.formGroup}>
          <InputText
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            className={classes.input}
            onChange={formik.handleChange}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && !!formik.errors.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </div>
        <div className={classes.formGroup}>
          <InputText
            placeholder="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            className={classes.input}
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </div>
        <div className={classes.formGroup}>
          <InputText
            placeholder="Email"
            id="email"
            name="email"
            className={classes.input}
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        {/* <div className={classes.formGroup}>
          <textarea
            className={classes.input}
            placeholder="Address"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && !!formik.errors.address}
            helperText={formik.touched.address && formik.errors.address}
          ></textarea>
        </div> */}

        <div className={classes.formGroup}>
          <InputText
            label="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className={classes.input}
            onChange={formik.handleChange}
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && !!formik.errors.password}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.formGroup}>
          <InputText
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className={classes.input}
            onChange={formik.handleChange}
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            error={
              formik.touched.confirmPassword && !!formik.errors.confirmPassword
            }
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <button
            type="submit"
            className={classes.submitButton}
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
