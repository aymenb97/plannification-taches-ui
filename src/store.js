import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./redux/reducers";
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
const store = createStore(rootReducer, composedEnhancer);
sagaMiddleware.run(watchAuth);
export default store;
