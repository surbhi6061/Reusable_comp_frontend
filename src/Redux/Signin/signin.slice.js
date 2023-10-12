import { createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../common/constant";

export const initialUserSigninState = {
  user: [],
  status: "",
  otp: "",
  password:""
  
};

export const userSigninSlice = createSlice({
  name: "userSignin",
  initialState: initialUserSigninState,
  reducers: {
    getUserEmailVerifyFetch: (state) => {
      state.status = ApiStatus.loading;
    },
    getUserEmailVerifySuccess: (state, action) => {
      state.user = action.payload;
      state.status = ApiStatus.success;
    },
    getUserEmailVerifyError: (state, action) => {
      state.user = action.payload;
      state.status = ApiStatus.error;
    },

    getUserGenerateOtpFetch: (state) => {
      state.status = ApiStatus.loading;
    },
    getUserGenerateOtpSuccess: (state, action) => {
      state.otp = action.payload;
      state.status = ApiStatus.success;
    },
    getUserGenerateOtpError: (state, action) => {
      state.otp = action.payload;
      state.status = ApiStatus.error;
    },

    getUserOtpVerifyFetch: (state) => {
      state.status = ApiStatus.loading;
    },
    getUserOtpVerifySuccess: (state, action) => {
      state.otp = action.payload;
      state.status = ApiStatus.success;
    },
    getUserOtpVerifyError: (state, action) => {
      state.otp = action.payload;
      state.status = ApiStatus.error;
    },
    resetOtp: (state) => {
      state.otp = "";
    },
    getUserPasswordVerifyFetch: (state) => {
      state.status = ApiStatus.loading;
    },
    getUserPasswordVerifySuccess: (state, action) => {
      state.password = action.payload;
      state.status = ApiStatus.success;
    },
    getUserPasswordVerifyError: (state, action) => {
      state.password = action.payload;
      state.status = ApiStatus.error;
    },

  },
});

export const {
  getUserEmailVerifyFetch,
  getUserEmailVerifySuccess,
  getUserEmailVerifyError,
  getUserGenerateOtpFetch,
  getUserGenerateOtpSuccess,
  getUserGenerateOtpError,
  getUserOtpVerifyFetch,
  getUserOtpVerifySuccess,
  getUserOtpVerifyError,
  getUserPasswordVerifyFetch,
  getUserPasswordVerifySuccess,
  getUserPasswordVerifyError
} = userSigninSlice.actions;

export default userSigninSlice.reducer;
