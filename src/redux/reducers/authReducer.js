import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  CHECK_AUTH_TIMEOUT,
  AUTH_USER,
} from "../actionTypes";
const initialState = {
  id: null,
  isAuth: false,
  tokenId: null,
  roles: null,
  error: null,
  expiration: null,
  loading: false,
  email: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START: {
      return {
        ...state,
        error: null,
        loading: false,
      };
    }
    case CHECK_AUTH_TIMEOUT: {
      return {
        ...state,
        id: action.id,
        isAuth: action.idToken && action.roles.length !== 0,
        tokenId: action.idToken,
        roles: action.roles,
        surname: action.surname,
        name: action.name,
        expiration: action.expiration,
        loading: false,
        email: action.email,
        error: null,
      };
    }
    case AUTH_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case AUTH_FAIL: {
      return {
        ...state,
        tokenId: null,
        roles: null,
        error: action.error,
        loading: false,
      };
    }
    case AUTH_LOGOUT: {
      return {
        ...state,
        isAuth: false,
        id: null,
        tokenId: null,
        roles: null,
        email: null,
        surname: null,
        name: null,
        expiration: null,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
};
export default authReducer;
