import {
  AUTH_CHECK,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_INITIATE_LOGOUT,
  AUTH_TIMEOUT,
  AUTH_USER,
  CHECK_AUTH_TIMEOUT,
  AUTH_LOGOUT,
} from "./actionTypes";
export const authStart = () => {
  return {
    type: AUTH_CHECK,
  };
};
export const authCheck = (
  token,
  roles,
  surname,
  name,
  expiration,
  email,
  id
) => {
  console.log(expiration);
  if (token && roles.length !== 0) {
    if (new Date() < new Date(expiration)) {
      return {
        type: CHECK_AUTH_TIMEOUT,
        idToken: token,
        roles: roles,
        name: name,
        surname: surname,
        expiration: new Date(expiration),
        email: email,
        id: id,
      };
    } else {
      return {
        type: AUTH_INITIATE_LOGOUT,
        loading: false,
      };
    }
  } else {
    return {
      type: AUTH_INITIATE_LOGOUT,
      loading: false,
    };
  }
};
export const authSuccess = (
  idTokenP,
  rolesP,
  surnameP,
  nameP,
  expirationP,
  email,
  id
) => {
  return {
    type: CHECK_AUTH_TIMEOUT,
    idToken: idTokenP,
    roles: rolesP,
    name: nameP,
    surname: surnameP,
    expiration: expirationP,
    email: email,
    id: id,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
    loading: false,
  };
};

export const auth = (email, password) => {
  return {
    type: AUTH_USER,
    email: email,
    password: password,
  };
};
export const authLogout = () => {
  return {
    type: AUTH_INITIATE_LOGOUT,
  };
};
// export const checkAuthTimeout = (expiration) => {
//   return {
//     expiration: expiration,
//     type: AUTH_TIMEOUT,
//   };
// };
