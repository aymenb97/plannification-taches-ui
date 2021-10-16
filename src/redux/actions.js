import instance from "../axios";
import {
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_INITIATE_LOGOUT,
  AUTH_TIMEOUT,
  AUTH_USER,
} from "./actionTypes";
export const authStart = () => {
  return {
    type: AUTH_START,
  };
};
export const authSuccess = (idToken, roleId) => {
  return {
    type: AUTH_SUCCESS,
    idToken: idToken,
    roleId: roleId,
  };
};
export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};
export const authLogout = () => {
  return {
    type: AUTH_INITIATE_LOGOUT,
  };
};

export const auth = (email, password) => {
  return {
    type: AUTH_USER,
    email: email,
    password: password,
  };
};
export const checkAuthTimeout = (expiration) => {
  return {
    expiration: 5,
    type: AUTH_TIMEOUT,
  };
};
