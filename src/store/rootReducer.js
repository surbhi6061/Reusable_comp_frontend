import { combineReducers } from "@reduxjs/toolkit";
import signupReducer from "../Redux/Signup/signup.slice";
import signinReducer from "../Redux/Signin/signin.slice";

const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer
});

export default rootReducer;
