import { combineReducers } from "redux";
import authReducer from "./authReducer";
import navReducer from "./navReducer";
export const rootReducer = combineReducers({
  auth: authReducer,
  nav: navReducer,
});
