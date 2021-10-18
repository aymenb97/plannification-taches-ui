import "./assets/sass/style.scss";
import "./assets/sass/style.react.scss";
import { Login } from "./Layouts/Auth/Login";
import { DashboardLayout } from "./Layouts/Dashboard/DashboardLayout";
import { AdminIndex } from "./pages/Admin/AdminIndex";
import { ManagerIndex } from "./pages/Manager/ManagerIndex";
import { MemberIndex } from "./pages/Member/MemberIndex";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "./redux/actions";
import * as actionTypes from "./redux/actionTypes";
import * as roles from "./Helpers/Roles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Spinner from "./Components/Spinner";
function App() {
  const tokenId = useSelector((state) => state.auth.tokenId);
  const roleId = useSelector((state) => state.auth.roleId);
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  const [isAuth, setAuth] = useState(false);
  dispatch(authCheck());
  useEffect(() => {
    setAuth(tokenId !== null && roleId != null);
    setLoading(false);
  });
  return loading ? (
    <Spinner />
  ) : (
    <Router>
      {!isAuth ? <Route to="/login" exact component={Login} /> : null}
      <Switch>
        {roleId === roles.ROLE_ADMIN && isAuth ? (
          <Route to="/" exact component={!isAuth ? Login : AdminIndex} />
        ) : null}
        {roleId === roles.ROLE_PROJECT_MEMBER && isAuth ? (
          <Route to="/" exact component={!isAuth ? Login : MemberIndex} />
        ) : null}
        {roleId === roles.ROLE_PROJECT_MANAGER && isAuth ? (
          <Route to="/" exact component={!isAuth ? Login : ManagerIndex} />
        ) : null}
      </Switch>
    </Router>
  );
}

export default App;
