import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  CHECK_AUTH_TIMEOUT,
} from "../actionTypes";
const initialState = {
  isAuth: false,
  tokenId: null,
  roles: null,
  error: null,
  expiration: null,
  loading: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case CHECK_AUTH_TIMEOUT: {
      return {
        ...state,
        isAuth: action.idToken && action.roles.length !== 0,
        tokenId: action.idToken,
        roles: action.roles,
        surname: action.surname,
        name: action.name,
        expiration: action.expiration,
        loading: false,
        error: null,
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
        tokenId: null,
        roles: null,
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
