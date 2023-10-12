import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import MicrosoftLogin from "react-microsoft-login";

import InputText from "./Common/InputText";
import { GoogleLogin } from "react-google-login";
import {
  getUserSSOFetch,
  getUserGoogleFetch,
  getUserSignupFetch,
} from "../Redux/Signup/signup.slice";
import {
  getUserEmailVerifyFetch,
  getUserGenerateOtpFetch,
  getUserOtpVerifyFetch,
  getUserPasswordVerifyFetch,
} from "../Redux/Signin/signin.slice";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f1f3f4",
  },
  card: {
    width: "470px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    // minHeight: '520px',
    height: "auto",
    boxSizing: "border-box",
    padding: "37px",
    borderRadius: "2px",
    transition: "all 0.1s ease-in-out",
    float: "left",
    overflowY: "auto",
    display: "table-cell",
  },
  cardHeader: {
    // marginBottom: "5%",
    alignItems: "center",
    padding: "20px",
  },
  logo: {
    marginTop: "-60px",
    height: "45px",
    paddingLeft: "60px",
  },
  cardBody: {
    padding: "20px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    "& .MuiFormHelperText-contained": {
      backgroundColor: "white",
      width: "100%",
      marginLeft: "0px",
      marginTop: "0px",
    },

    width: "100%",
    marginTop: "19px !important",
    // padding: "10px",
    background: "#f8f8f8",
    border: "1px solid #E4E4E4",
    outline: "none",
    fontSize: "16px",
  },

  button: {
    boxShadow: "0px 2px 2px #fff",
    backgroundColor: "#159AFF",
    color: "#fff",
    cursor: "pointer",
    display: "block",
    width: "100%",
    height: "44px",
    borderRadius: "4px",
    letterSpacing: ".5px",
    fontSize: "14px",
    fontWeight: "600",
    outline: "none",
    border: "none",
    margin: "auto",
    marginBottom: "15px",
    marginTop: "14px",
    transition: "all .2s ease-in-out",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
  },
  dividerLine: {
    flex: "1",
    borderTop: "1px solid #ced4da",
  },
  dividerText: {
    margin: "0 10px",
    color: "#7e7e7e",
  },
  shareBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "red",
    fontWeight: "400",
    fontSize: "1rem",
    marginLeft: "10px",
  },

  fSignIn: {
    textAlign: "center",
    marginTop: "20px",
  },
  socialIcon: {
    display: "flex",
    // gap: "2px",
    justifyContent: "space-between",
  },
  google: {
    width: "38%",
    border: "1px solid grey !important",
    // margin: "5px",
    // padding:'3px'
  },
  otpInput: {
    width: "100%",
    marginBottom: "15px",
    padding: "12px",
    background: "#f8f8f8",
    border: "1px solid #E4E4E4",
    outline: "none",
    fontSize: "16px",
    marginTop: "15px !important",
  },
  forgotPassword: {
    marginTop: "10px",
    cursor: "pointer",
    color: "blue",
  },
  radioGroup: {
    display: "flex",
    gap: "25px",
  },
  btn: {
    backgroundColor: "#159AFF",
    color: "#fff",
    border: "1px solid black",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "400",
    transition: "all .2s ease-in-out",
    // outline: "none",
  },
  buttonGroup: {
    marginTop: "19px",
    display: "flex !important",
    // width: "50% !important",
    gap: "20px !important",
  },
}));

const SignInPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [showOTPField, setShowOTPField] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showForgotPassword, setForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const { otp: otpValue } = useSelector((state) => state.signin);
  // console.log("otpValue", otpValue);

  const { password } = useSelector((state) => state.signin);
  console.log("pwd", password);

  const onSuccess = (res) => {
    dispatch(getUserSSOFetch(res.profileObj));
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };
  const authCallback = (error, response) => {
    if (error) {
      console.error("Microsoft login error:", error);
    } else {
      console.log("Microsoft login response:", response);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please make sure to enter a valid Email")
      .required("Email is required"),
    // otp: Yup.string().matches(/^[0-9]{6}$/, "OTP must be a 6-digit number"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    if (
      showOTPField &&
      formik.values.email !== "" &&
      formik.values.otp !== "" &&
      formik.values.password === ""
    ) {
      dispatch(getUserOtpVerifyFetch(formik.values));

      // navigate("/UserDetails");
    } else if (
      showPasswordField &&
      formik.values.email !== "" &&
      formik.values.otp === "" &&
      formik.values.password !== ""
    ) {
      dispatch(getUserPasswordVerifyFetch(formik.values));
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleNextClick = (values) => {
    setShowButton(true);
    const { email } = formik.values;

    const IsEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (IsEmail.test(email) && !showOTPField) {
      console.log(formik.values);
      dispatch(getUserEmailVerifyFetch(formik.values));
    }
  };

  const handleOtpClick = () => {
    const { email } = formik.values;

    const IsEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (IsEmail.test(email) && !showOTPField) {
      console.log(formik.values);
      dispatch(getUserGenerateOtpFetch(formik.values));
    }
    setShowOTPField(true);
    setShowPasswordField(false);
  };

  const handlePasswordClick = () => {
    setForgotPassword(true);
    setShowOTPField(false);
    setShowPasswordField(true);
  };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.cardHeader}>
          <img
            src="../assets/Images/satori_logo.png"
            alt="Logo"
            className={classes.logo}
          />
          <h2>Sign In</h2>
        </div>
        <div className={classes.cardBody}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <>
              <InputText
                placeholder=" Enter your Email Address"
                id="email"
                name="email"
                className={classes.input}
                onChange={formik.handleChange}
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && !!formik.errors.email}
                onBlur={formik.handleBlur}
              />
              {showButton &&
                formik.values.email !== "" &&
                !showOTPField &&
                !showPasswordField && (
                  <>
                    <div className={classes.buttonGroup}>
                      <button
                        type="button"
                        onClick={handleOtpClick}
                        className={classes.button}
                      >
                        Get OTP
                      </button>
                      <button
                        type="button"
                        onClick={handlePasswordClick}
                        className={classes.button}
                      >
                        Enter Password
                      </button>
                    </div>
                  </>
                )}
            </>

            {showOTPField && (
              <InputText
                placeholder="Enter OTP"
                id="otp"
                name="otp"
                className={classes.otpInput}
                onChange={formik.handleChange}
                value={formik.values.otp}
                helperText={formik.touched.otp && formik.errors.otp}
                error={formik.touched.otp && !!formik.errors.otp}
                onBlur={formik.handleBlur}
              />
            )}

            {showPasswordField && (
              <>
                <InputText
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  type="password"
                  className={classes.input}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  helperText={formik.touched.password && formik.errors.password}
                  error={formik.touched.password && !!formik.errors.password}
                  onBlur={formik.handleBlur}
                />
                {showForgotPassword && (
                  <div
                    className={classes.forgotPassword}
                    onClick={() => navigate("/forgotPassword")}
                  >
                    Forgot Password ?
                  </div>
                )}
              </>
            )}

            {!showButton ? (
              <button
                type="button"
                className={classes.button}
                onClick={handleNextClick}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className={classes.button}
                onClick={handleSubmit}
              >
                Login
              </button>
            )}
          </form>

          <div className={classes.divider}>
            <div className={classes.dividerLine}></div>
            <div className={classes.dividerText}>OR</div>
            <div className={classes.dividerLine}></div>
          </div>
          <div className={classes.fSignIn}>
            <div className={classes.socialIcon}>
              <Tooltip
                title="Sign in with Microsoft"
                className={classes.microsoft}
              >
                <MicrosoftLogin
                  clientId="7eccd1c2-0626-435b-89d3-aa3c9856f43a"
                  authCallback={authCallback}
                  // redirectUri="http://localhost:3000/callback"
                  className={classes.microsoft}
                  prompt="select_account"
                />
              </Tooltip>
              <Tooltip title="Sign in with Google">
                <GoogleLogin
                  clientId="1056981537694-htkonb3e251mslal03qsevj15o6ndo8c.apps.googleusercontent.com"
                  // buttonText="Sign in with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={false}
                  className={classes.google}
                >
                  Google
                </GoogleLogin>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
