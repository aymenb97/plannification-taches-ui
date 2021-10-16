import { takeEvery } from "redux-saga/effects";
import { authUserSaga, checkAuthTimeoutSaga, logoutSaga } from "./authSaga";
import * as actionTypes from "../actionTypes";
export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}
