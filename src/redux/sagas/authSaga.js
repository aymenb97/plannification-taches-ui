import { put, call, delay } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import instance from "../../axios";
import { auth, authFail, authStart, authSuccess } from "../actions";

export function* authUserSaga(action) {
  yield put(authStart());
  const authData = {
    email: action.email,
    password: action.password,
  };
  try {
    const res = yield instance.post("/auth", authData);
    yield localStorage.setItem("tokenId", res.token);
    yield localStorage.setItem("roleId", res.roleId);
    yield put(authSuccess(res.token, res.roleId));
  } catch (error) {
    yield put(authFail(error));
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
