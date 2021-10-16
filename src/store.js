import { createStore, applyMiddleware, compose } from "redux";
import authReducer from "./redux/reducers/auth";
import createSagaMiddleware from "redux-saga";
import { watchAuth } from "./redux/sagas";
import { composeWithDevTools } from "redux-devtools-extension";
const sagaMiddleware = createSagaMiddleware();
const tokenId = localStorage.getItem("tokenId");
const roleId = localStorage.getItem("roleId");
const composedEnhancer = compose(
  applyMiddleware(sagaMiddleware),
  composeWithDevTools()
);
let preLoadedState =
  tokenId && roleId
    ? {
        tokenId: tokenId,
        roleId: roleId,
      }
    : undefined;

const store = createStore(authReducer, composedEnhancer);
sagaMiddleware.run(watchAuth);
export default store;
