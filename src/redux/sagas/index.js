import { takeEvery } from "redux-saga/effects";
import {
  authUserSaga,
  checkAuthTimeoutSaga,
  logoutSaga,
  authCheckSaga,
} from "./authSaga";
import * as actionTypes from "../actionTypes";
export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK, authCheckSaga);
  yield takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}
