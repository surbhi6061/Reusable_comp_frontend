import { takeEvery, put } from "@redux-saga/core/effects";
import AuthenticationService from "../../service/authentication.service";
import {
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
} from "./signin.slice";

export const fetchUserEmailVerifySaga = function* (action) {
  try {
    const res = yield AuthenticationService.emailVerify(action.payload);
    // localStorage.setItem('token', res.token);
    yield put({
      type: getUserEmailVerifySuccess.type,
      payload: res,
    });
  } catch (e) {
    yield put({
      type: getUserEmailVerifyError.type,
      payload: e,
    });
  }
};

export const fetchUserEmailVerifyWatch = function* () {
  yield takeEvery(getUserEmailVerifyFetch, fetchUserEmailVerifySaga);
};

export const fetchUserGenerateOtpSaga = function* (action) {
  try {
    const res = yield AuthenticationService.generateOtp(action.payload);
    // localStorage.setItem('token', res.token);
    yield put({
      type: getUserGenerateOtpSuccess.type,
      payload: res,
    });
  } catch (e) {
    yield put({
      type: getUserGenerateOtpError.type,
      payload: e,
    });
  }
};

export const fetchUserGenerateOtpWatch = function* () {
  yield takeEvery(getUserGenerateOtpFetch, fetchUserGenerateOtpSaga);
};


export const fetchUserOtpVerifySaga = function* (action) {
  try {
    const res = yield AuthenticationService.otpVerify(action.payload);
    // localStorage.setItem('token', res.token);
    yield put({
      type: getUserOtpVerifySuccess.type,
      payload: res,
    });
  } catch (e) {
    yield put({
      type: getUserOtpVerifyError.type,
      payload: e,
    });
  }
};

export const fetchUserVerifyOtpWatch = function* () {
  yield takeEvery(getUserOtpVerifyFetch, fetchUserOtpVerifySaga);
};

export const fetchUserPasswordVerifySaga = function* (action) {
  try {
    const res = yield AuthenticationService.PasswordVerify(action.payload);
    // localStorage.setItem('token', res.token);
    yield put({
      type: getUserPasswordVerifySuccess.type,
      payload: res,
    });
  } catch (e) {
    yield put({
      type: getUserPasswordVerifyError.type,
      payload: e,
    });
  }
};

export const fetchUserPasswordVerifyWatch = function* () {
  yield takeEvery(getUserPasswordVerifyFetch, fetchUserPasswordVerifySaga);
};


