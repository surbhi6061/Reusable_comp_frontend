import { createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../common/constant";

export const initialUserSignupState = {
  user: [],
  status: "",
  otp: "",
  sso_user: [],
};

export const userSignupSlice = createSlice({
  name: "userSignup",
  initialState: initialUserSignupState,
  reducers: {
    getUserSignupFetch: (state) => {
      state.status = ApiStatus.loading;
    },
    getUserSignupSuccess: (state, action) => {
      state.user = action.payload;
      state.status = ApiStatus.success;
    },
    getUserSignupError: (state, action) => {
      state.user = action.payload;
      state.status = ApiStatus.error;
    },
    getUserOtpFetch: (state) => {
      state.status = ApiStatus.loading;
    },
    getUserOtpSuccess: (state, action) => {
      state.otp = action.payload;
      state.status = ApiStatus.success;
    },
    getUserOtpError: (state, action) => {
      state.otp = action.payload;
      state.status = ApiStatus.error;
    },
    resetOtp: (state) => {
      state.otp = "";
    },
    getUserGoogleFetch: (state, action) => {
      state.status = ApiStatus.loading;
    },
    getUserGoogleSuccess: (state, action) => {
      state.user = action.payload;
      state.status = ApiStatus.success;
    },
    getUserGoogleError: (state, action) => {
      state.user = action.payload;
      state.status = ApiStatus.error;
    },
    getUserSSOFetch: (state, action) => {
      console.log(action.payload);
      state.sso_user = action.payload;
    },
  },
});

export const {
  getUserSignupFetch,
  getUserSignupSuccess,
  getUserSignupError,
  getUserOtpFetch,
  getUserOtpSuccess,
  getUserOtpError,
  resetOtp,
  getUserGoogleFetch,
  getUserGoogleSuccess,
  getUserGoogleError,
  getUserSSOFetch,
} = userSignupSlice.actions;

export default userSignupSlice.reducer;
