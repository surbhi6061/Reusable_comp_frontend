import { takeEvery, put } from '@redux-saga/core/effects';
import AuthenticationService from '../../service/authentication.service';
import { getUserSignupFetch,getUserSignupSuccess,getUserSignupError,getUserOtpFetch,getUserOtpSuccess,getUserOtpError,getUserGoogleFetch,getUserGoogleSuccess,getUserGoogleError } from './signup.slice';

export const fetchUserSignupSaga = function* (action) {
    try {
        const res = yield AuthenticationService.signup(action.payload);
        // localStorage.setItem('token', res.token);
        yield put({
            type: getUserSignupSuccess.type,
            payload: res
        });
    } catch (e) {
        yield put({
            type: getUserSignupError.type,
            payload: e
        });
    }
}

export const fetchUserSignupWatch = function* () {
    yield takeEvery(getUserSignupFetch, fetchUserSignupSaga);
}

export const fetchUserOtpSaga = function* () {
    try {
        const res = yield AuthenticationService.otp();
        // localStorage.setItem('token', res.token);
        yield put({
            type: getUserOtpSuccess.type,
            payload: res
        });
    } catch (e) {
        yield put({
            type: getUserOtpError.type,
            payload: e
        });
    }
}

export const fetchUserOtpWatch = function* () {
    yield takeEvery(getUserOtpFetch, fetchUserOtpSaga);
}

export const fetchUserGoogleSaga = function* (action) {
    try {
        const res = yield AuthenticationService.google(action.payload);
        // localStorage.setItem('token', res.token);
        yield put({
            type: getUserGoogleSuccess.type,
            payload: res
        });
    } catch (e) {
        yield put({
            type: getUserGoogleError.type,
            payload: e
        });
    }
}

export const fetchUserGoogleWatch = function* () {
    yield takeEvery(getUserGoogleFetch, fetchUserGoogleSaga);
}