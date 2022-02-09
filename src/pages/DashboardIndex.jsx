import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../Layouts/Dashboard/DashboardLayout";
import { AsideMenuItem } from "../Components/aside/AsideElement";
import {
  faUserCog,
  faThList,
  faListOl,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";
import AddUser from "./Admin/sections/AddUser";
import EditUser from "./Admin/sections/EditUser";
import AddTache from "./Manager/AddTache";
import EditTache from "./Manager/EditTache";
import AddModule from "./Manager/AddModule";
import EditModule from "./Manager/EditModule";
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
import ManageTaches from "./Manager/ManageTaches";

import ManageModules from "./Manager/ManageModules";
import ManageProjectMonitoring from "./Admin/sections/ManageProjectMonitoring";

export default function DashboardIndex(props) {
  const roles = useSelector((state) => state.auth.roles);
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
                icon={faCubes}
                link="gerer-suivi-projet"
              ></AsideMenuItem>
            </>
          ) : null}
          {hasRoleManager ? (
            <>
              <AsideMenuItem
                title="Gérer Suivi Projets"
                icon={faListOl}
                link="gerer-suivi-projet"
              ></AsideMenuItem>
              <AsideMenuItem
                title="Gérer Taches"
                icon={faThList}
                link="gerer-taches"
              ></AsideMenuItem>
              <AsideMenuItem
                title="Gérer Modules"
                icon={faThList}
                link="gerer-modules"
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
          <Route exact path="/gerer-taches" component={ManageTaches} />
          <Route exact path="/gerer-modules" component={ManageModules} />

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

          <Route
            exact
            path="/gerer-taches/ajouter-tache"
            component={AddTache}
          />
          <Route
            exact
            path="/gerer-taches/modifier-tache/:id"
            component={EditTache}
          />

          <Route
            exact
            path="/gerer-modules/ajouter-module"
            component={AddModule}
          />
          <Route
            exact
            path="/gerer-modules/modifier-module/:id"
            component={EditModule}
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
