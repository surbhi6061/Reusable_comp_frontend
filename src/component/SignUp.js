import React, { useState } from "react";
import {
  getUserSignupFetch,
  getUserOtpFetch,
  getUserSSOFetch,
  getUserGoogleFetch,
} from "../Redux/Signup/signup.slice";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import MicrosoftLogin from "react-microsoft-login";

import InputText from "./Common/InputText";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

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
    padding: "30px",
    borderRadius: "2px",
    transition: "all 0.1s ease-in-out",
    float: "left",
    overflowY: "auto",
    display: "table-cell",
  },
  cardHeader: {
    // marginBottom: "10%",
    alignItems: "center",
    padding: "20px",
  },
  logo: {
    // marginTop: "-60px",
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
    marginBottom: "10px !important",
    padding: "12px",
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
    marginBottom: "30px",
    marginTop: "25px",
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

  fSignIn: {
    textAlign: "center",
    marginTop: "20px",
  },
  socialIcon: {
    display: "flex",
    // gap: "18px",
    justifyContent:'space-between'
  },
  google: {
    width: "40%",
    border:"1px solid grey !important",
    // margin: "5px",
    // padding:'3px'
  },
  otpInput: {
    width: "100%",
    marginBottom: "10px",
    padding: "12px",
    background: "#f8f8f8",
    border: "1px solid #E4E4E4",
    outline: "none",
    fontSize: "16px",
  },
  microsoft: {
    // width: "40%"
  },
}));

const SignUpPage = () => {
  const classes = useStyles();
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [storeSessionId, setStoreSessionId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otp: otpValue } = useSelector((state) => state.signup);
  // console.log(otpValue)

  const onSuccess = (res) => {
    dispatch(getUserSSOFetch(res.profileObj));
    navigate("/UserDetails");
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
    emailOrPhone: Yup.string()
      .required("Email or Phone Number is required")
      .test(
        "emailOrPhone",
        "Please enter a valid Email or Phone Number",
        (value) => {
          // Validate if the value is either a valid email or a 10-digit phone number
          const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          const phoneRegex = /^[0-9]{10}$/;
          return emailRegex.test(value) || phoneRegex.test(value);
        }
      ),
    // otp: Yup.string().matches(/^[0-9]{6}$/, "OTP must be of 6 characters"),
  });

  const handleSubmit = (values) => {
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isPhone = /^[0-9]{10}$/;
    console.log(otpValue);
    setOTP(values.otp);
    if (values.otp == otpValue && values.otp != "") {
      // console.log(values.otp, otpValue);
      navigate("/UserDetails");
    }
    if (values.otp == "") {
      // getOtp();
    }
    if (values.otp != "") {
      let otp = values.otp;

      // if(otp){
      //   console.log(values);
      //   dispatch(getUserOtpFetch(values));
      // }

      const API_KEY = "426d208b-14d8-11ee-addf-0200cd936042";
      if (storeSessionId != "" && otp != undefined) {
        console.log(storeSessionId, otp);
        let url = `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${storeSessionId}/${otp}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data["Details"] == "OTP Matched") {
              alert("otp matched successfully");
              navigate("/UserDetails");
            }
            console.log(data);
          })
          .catch((err) => {
            console.log("error", err);
          });
      }
    }
    if (isEmail.test(values.emailOrPhone)) {
      if (!showOTP) {
        setShowOTP(true);
        console.log(values);
        dispatch(getUserSignupFetch(values));
        dispatch(getUserOtpFetch());
      }
    } else if (isPhone.test(values.emailOrPhone)) {
      setShowOTP(true);
    }
  };

  const getOtp = () => {
    const API_KEY = "426d208b-14d8-11ee-addf-0200cd936042";
    let url = `https://2factor.in/API/V1/${API_KEY}/SMS/+916380602741/AUTOGEN`;
    let session_id;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        session_id = data["Details"];
        setStoreSessionId(session_id);
        console.log(session_id);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const formik = useFormik({
    initialValues: {
      emailOrPhone: "",
      otp: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId:
  //         "609174511617-rvva10ngjdbgob3gbq4hvjfofrjkkl0q.apps.googleusercontent.com",
  //       scope: "",
  //     });
  //   }
  //   gapi.load("client:auth2", start);
  // },[]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.cardHeader}>
          <img
            src="../assets/Images/satori_logo.png"
            alt="Logo"
            className={classes.logo}
          />
          <h2>Sign up</h2>
        </div>
        <div className={classes.cardBody}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <InputText
              placeholder="Email address or phone number"
              id="emailOrPhone"
              name="emailOrPhone"
              className={classes.input}
              onChange={formik.handleChange}
              value={formik.values.emailOrPhone}
              helperText={
                formik.touched.emailOrPhone && formik.errors.emailOrPhone
              }
              error={
                formik.touched.emailOrPhone && !!formik.errors.emailOrPhone
              }
              onBlur={formik.handleBlur}
              // required
            />
            {showOTP && (
              <InputText
                placeholder="Enter OTP"
                id="otp"
                name="otp"
                className={classes.input}
                onChange={formik.handleChange}
                value={formik.values.otp}
                helperText={formik.touched.otp && formik.errors.otp}
                error={formik.touched.otp && !!formik.errors.otp}
                onBlur={formik.handleBlur}
              />
            )}
            <button
              type="submit"
              className={classes.button}
              onClick={handleSubmit}
            >
              {showOTP ? "Sign up" : "Next"}
            </button>
          </form>
          <div className={classes.divider}>
            <div className={classes.dividerLine}></div>
            <div className={classes.dividerText}>OR</div>
            <div className={classes.dividerLine}></div>
          </div>
          <div className={classes.fSignIn}>
            <div className={classes.socialIcon}>
              {/* <Tooltip title="Sign in with Facebook">
                <FacebookLoginButton
                  onClick={() => alert("Facebook sign in clicked")}
                >
                  <span style={{ display: "none" }}>Sign in with Facebook</span>
                </FacebookLoginButton>
              </Tooltip> */}
              {/* <Tooltip title="Sign in with Twitter">
                <TwitterLoginButton
                  onClick={() => alert("Twitter sign in clicked")}
                >
                  <span style={{ display: "none" }}>Sign in with Twitter</span>
                </TwitterLoginButton>
              </Tooltip> */}
             
              <Tooltip
                title="Microsoft"
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
                  accessType="offline"
                >
                  Google
                </GoogleLogin>
              </Tooltip>
              {/* <Tooltip title="Sign in with Apple">
                <AppleLoginButton
                  onClick={() => alert("Apple sign in clicked")}
                >
                  <span style={{ display: "none" }}>Sign in with Apple</span>
                </AppleLoginButton>
              </Tooltip> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
