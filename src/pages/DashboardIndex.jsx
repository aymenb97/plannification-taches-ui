import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../Layouts/Dashboard/DashboardLayout";
import { AsideMenuItem } from "../Components/aside/AsideElement";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import AddUser from "./Admin/sections/AddUser";
import EditUser from "./Admin/sections/EditUser";
import Profile from "./Common/Profile";
import Chat from "./Common/Messages/Chat";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Switch,
} from "react-router-dom";
import ManageUsers from "./Admin/sections/ManageUsers";
import ManageProjectMonitoring from "./Admin/sections/ManageProjectMonitoring";

export default function DashboardIndex(props) {
  const roles = useSelector((state) => state.auth.roles);
  console.log(roles);
  let { path, url } = useRouteMatch();
  const [hasRoleAdmin, setHasRoleAdmin] = useState(
    roles.includes("ROLE_ADMIN")
  );
  const [hasRoleManager, setHasRoleManager] = useState(
    roles.includes("ROLE_MANAGER")
  );
  const [hasRoleMember, setHasRoleMember] = useState(
    roles.includes("ROLE_MEMBER")
  );
  return (
    <DashboardLayout
      aside={
        <>
          {hasRoleAdmin ? (
            <>
              <AsideMenuItem
                title="Gérer Utilisateurs"
                icon={faUserCog}
                link="gerer-utilisateurs"
              ></AsideMenuItem>
              <AsideMenuItem
                title="Gérer Projets"
                icon={faUserCog}
                link="gerer-suivi-projet"
              ></AsideMenuItem>
            </>
          ) : null}
          {hasRoleManager ? (
            <>
              <AsideMenuItem
                title="Gérer Suivi Projets"
                icon={faUserCog}
                link="gerer-suivi-projet"
              ></AsideMenuItem>
            </>
          ) : null}
          {hasRoleMember ? (
            <>
              <AsideMenuItem
                title="Member Tab 1"
                icon={faUserCog}
                link="member-tab-1"
              ></AsideMenuItem>
              <AsideMenuItem
                title="Member Tab 2"
                icon={faUserCog}
                link="member-tab-1"
              ></AsideMenuItem>
            </>
          ) : null}
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
          <Route
            exact
            path="/gerer-utilisateurs/modifier-utilisateur/:id"
            component={EditUser}
          />

          <Route
            exact
            path="/gerer-utilisateurs/ajouter-utilisateur"
            component={AddUser}
          />
          <Route exact path="/mon-profil" component={Profile} />
          <Route path="/chat" component={Chat} />
        </Switch>
      }
    ></DashboardLayout>
  );
}
