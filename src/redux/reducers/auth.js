import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from "../actionTypes";
const initialState = {
  tokenId: null,
  roleId: null,
  error: null,
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
    case AUTH_SUCCESS: {
      return {
        ...state,
        tokenId: action.idToken,
        roleId: action.roleId,
        loading: false,
        error: null,
      };
    }
    case AUTH_FAIL: {
      return {
        ...state,
        tokenId: null,
        roleId: null,
        error: action.error,
        loading: false,
      };
    }
    case AUTH_LOGOUT: {
      return {
        ...state,
        token: null,
        time: null,
      };
    }
    default:
      return state;
  }
};
export default authReducer;
