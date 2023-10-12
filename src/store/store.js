import createSagaMiddleware, { END } from "@redux-saga/core";
import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { initialUserSignupState } from "../Redux/Signup/signup.slice";
import { initialUserSigninState } from "../Redux/Signin/signin.slice";
const initialState = {
  signup: initialUserSignupState,
  signin:initialUserSigninState,
};

let store;

export default function configureAppStore() {
  const sagaMiddleware = createSagaMiddleware();

  store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: new MiddlewareArray().concat(sagaMiddleware),
    devTools: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  });

  sagaMiddleware.run(rootSaga);
  store.close = () => store.dispatch(END);
  return store;
}

export { store };
