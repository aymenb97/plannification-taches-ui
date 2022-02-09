import { put, delay } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { instance } from "../../common/axios";
import jwt_decode from "jwt-decode";
import { auth, authFail, authStart, authCheck, authSuccess } from "../actions";

export function* authCheckSaga() {
  let token, roles, surname, name, expirationTime, email, id;
  yield (token = localStorage.getItem("tokenId"));
  yield (roles = JSON.parse(localStorage.getItem("roles")));
  yield (surname = localStorage.getItem("surname"));
  yield (name = localStorage.getItem("name"));
  yield (email = localStorage.getItem("email"));
  yield (id = localStorage.getItem("id"));
  yield (expirationTime = localStorage.getItem("expirationTime"));
  yield put(authCheck(token, roles, surname, name, expirationTime, email, id));
}
export function* authUserSaga(action) {
  // yield put(authStart());
  const authData = {
    email: action.email,
    password: action.password,
  };
  try {
    const res = yield instance.post("/api/login_check", authData);
    const decodedToken = jwt_decode(res.data.token);
    const tokenExpiration = new Date(decodedToken.exp * 1000);

    yield localStorage.setItem("tokenId", res.data.token);
    yield localStorage.setItem("roles", JSON.stringify(decodedToken.roles));
    yield localStorage.setItem("surname", res.data.surname);
    yield localStorage.setItem("name", res.data.name);
    yield localStorage.setItem("email", decodedToken.email);
    yield localStorage.setItem("id", res.data.id);
    yield localStorage.setItem("expirationTime", tokenExpiration);
    yield put(
      authSuccess(
        res.data.token,
        decodedToken.roles,
        res.data.surname,
        res.data.name,
        tokenExpiration,
        decodedToken.email,
        res.data.id
      )
    );
  } catch (error) {
    console.log();
    yield put(authFail(error.response.data));
  }
}
export function* logoutSaga(action) {
  yield localStorage.removeItem("tokenId");
  yield localStorage.removeItem("roles");
  yield localStorage.removeItem("surname");
  yield localStorage.removeItem("name");
  yield localStorage.removeItem("email");
  yield localStorage.removeItem("id");
  yield localStorage.removeItem("expirationTime");
  yield put({ type: actionTypes.AUTH_LOGOUT });
}
export function* checkAuthTimeoutSaga(action) {
  console.log(new Date(action.expiration) - new Date());
  yield delay(new Date(action.expiration) - new Date());
  yield localStorage.removeItem("tokenId");
  yield localStorage.removeItem("roles");
  yield localStorage.removeItem("email");
  yield localStorage.removeItem("id");
  yield localStorage.removeItem("surname");
  yield localStorage.removeItem("name");
  yield localStorage.removeItem("expirationTime");
  yield put({ type: actionTypes.AUTH_LOGOUT });
}
