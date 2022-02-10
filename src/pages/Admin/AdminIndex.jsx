import React from "react";
import { DashboardLayout } from "../../Layouts/Dashboard/DashboardLayout";
import { AsideMenuItem } from "../../Components/aside/AsideElement";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Switch,
} from "react-router-dom";
import ManageUsers from "./Components/ManageUsers";
import ManageProjectMonitoring from "./Components/ManageProjectMonitoring";
export function AdminIndex(props) {
  let { path, url } = useRouteMatch();
  return (
    <DashboardLayout
      aside={
        <>
          <AsideMenuItem
            title="Gérer Utilisateurs"
            icon={faUserCog}
            link="gerer-utilisateurs"
          ></AsideMenuItem>
          <AsideMenuItem
            title="Gérer Suivi Projets"
            icon={faUserCog}
            link="gerer-suivi-projet"
          ></AsideMenuItem>
          <AsideMenuItem
            title="Gérer Taches"
            icon={faUserCog}
            link="gerer-taches"
          ></AsideMenuItem>
        </>
      }
      content={
        <Switch>
          <Route exact path="/gerer-utilisateurs" component={ManageUsers} />
          <Route
            exact
            path="/gerer-suivi-projet"
            component={ManageProjectMonitoring}
          />
        </Switch>
      }
    ></DashboardLayout>
  );
}
