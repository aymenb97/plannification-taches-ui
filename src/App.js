import "./assets/sass/style.scss";
import "./assets/sass/style.react.scss";
import { Login } from "./Layouts/Auth/Login";
import { DashboardLayout } from "./Layouts/Dashboard/DashboardLayout";
import { AdminIndex } from "./pages/Admin/AdminIndex";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthTimeout } from "./redux/actions";
import * as actionTypes from "./redux/actionTypes";
function App() {
  const tokenId = useSelector((state) => state.tokenId);
  const roleId = useSelector((state) => state.roleId);
  const dispatch = useDispatch();

  const [isAuth, setAuth] = useState(true);
  useEffect(() => {
    localStorage.setItem("tokenId", "ezfqezfrzgtqesw");
    localStorage.setItem("roleId", "0");

    dispatch(checkAuthTimeout());
  });
  return <>{isAuth ? <Login /> : <AdminIndex />}</>;
}

export default App;
