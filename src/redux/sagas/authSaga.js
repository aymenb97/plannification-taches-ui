import { put, delay } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import instance from "../../axios";
import jwt_decode from "jwt-decode";
import { auth, authFail, authStart, authSuccess } from "../actions";

export function* authUserSaga(action) {
  yield put(authStart());
  const authData = {
    email: action.email,
    password: action.password,
  };
  try {
    const res = yield instance.post("/api/login", authData);
    console.log(res.data.token);
    const decodedToken = jwt_decode(res.data.token);
    const tokenExpiration = new Date(decodedToken.exp * 1000);
    yield localStorage.setItem("tokenId", res.data.token);
    yield localStorage.setItem("roleId", decodedToken.roles[0]);
    yield localStorage.setItem("expirationTime", tokenExpiration);
    yield put(
      authSuccess(res.data.token, decodedToken.roles[0], tokenExpiration)
    );
  } catch (error) {
    console.log();
    yield put(authFail(error.response.data));
  }
}
export function* logoutSaga(action) {
  yield localStorage.removeItem("tokenId");
  yield localStorage.removeItem("roleId");
}
export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expiration * 1000);
  yield console.log(action);
  yield put({ type: actionTypes.AUTH_LOGOUT });
}
