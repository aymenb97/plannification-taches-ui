import "./assets/sass/style.scss";
import "./assets/sass/style.react.scss";

import Login from "./pages/Auth/Login";
import DashboardIndex from "./pages/DashboardIndex";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStart } from "./redux/actions";
import * as actionTypes from "./redux/actionTypes";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Spinner from "./Components/Spinner";
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    dispatch(authStart());
    setPageLoading(false);
  }, []);

  return pageLoading ? (
    <Spinner />
  ) : (
    <Router>
      {!isAuth ? (
        <Route to="/login" exact component={Login} />
      ) : (
        <Route to="/" exact component={DashboardIndex} />
      )}
    </Router>
  );
}

export default App;
