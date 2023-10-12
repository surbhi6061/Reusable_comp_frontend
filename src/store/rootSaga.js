import { all } from "@redux-saga/core/effects";
import {
  fetchUserSignupWatch,
  fetchUserOtpWatch,
  fetchUserGoogleWatch,
} from "../Redux/Signup/signup.saga";

import {
  fetchUserEmailVerifyWatch,
  fetchUserGenerateOtpWatch,
  fetchUserVerifyOtpWatch,
  fetchUserPasswordVerifyWatch
} from "../Redux/Signin/signin.saga";

export default function* rootSaga() {
  yield all([
    fetchUserSignupWatch(),
    fetchUserOtpWatch(),
    fetchUserGoogleWatch(),
    fetchUserEmailVerifyWatch(),
    fetchUserGenerateOtpWatch(),
    fetchUserVerifyOtpWatch(),
    fetchUserPasswordVerifyWatch()
  ]);
}
