import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../Layouts/Dashboard/DashboardLayout";
import { AsideMenuItem } from "../Components/aside/AsideElement";
import {
  faUserCog,
  faThList,
  faListOl,
  faCubes,
  faChartArea,
} from "@fortawesome/free-solid-svg-icons";
import ManageProjects from "./Admin/sections/ManageProjects";
import EditProject from "./Admin/sections/EditProject";
import ViewProjectMonitoring from "./Admin/sections/ViewProjectMonitoring";
import Stats from "./Admin/sections/Stats";
import AddUser from "./Admin/sections/AddUser";
import EditUser from "./Admin/sections/EditUser";
import AddTache from "./Manager/AddTache";
import EditTache from "./Manager/EditTache";
import AddModule from "./Manager/AddModule";
import EditModule from "./Manager/EditModule";
import ViewProjects from "./Manager/ViewProjects";
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
import AddProject from "./Admin/sections/AddProject";

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
          {hasRoleAdmin && !hasRoleMember ? (
            <>
              <AsideMenuItem
                title="Gérer Utilisateurs"
                icon={faUserCog}
                link="gerer-utilisateurs"
              ></AsideMenuItem>
              <AsideMenuItem
                title="Gérer Suivi Projets"
                icon={faListOl}
                link="suivi-projet"
              ></AsideMenuItem>
              <AsideMenuItem
                title="Statistiques"
                icon={faChartArea}
                link="statistiques"
              ></AsideMenuItem>
            </>
          ) : null}
          {hasRoleManager && !hasRoleAdmin ? (
            <>
              <AsideMenuItem
                title="Gérer Suivi Projets"
                icon={faListOl}
                link="suivi-projet"
              ></AsideMenuItem>
              <AsideMenuItem
                title="Gérer Projets"
                icon={faCubes}
                link="gerer-projets"
              ></AsideMenuItem>
              <AsideMenuItem
                title="Gérer Tâches"
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
          {hasRoleMember ? <></> : null}
        </>
      }
      content={
        <Switch>
          <Route exact path="/mon-profil" component={Profile} />
          <Route path="/chat" component={Chat} />
          {hasRoleAdmin ? (
            <>
              <Route exact path="/gerer-utilisateurs" component={ManageUsers} />

              <Route
                exact
                path="/gerer-utilisateurs/ajouter-utilisateur"
                component={AddUser}
              />
              <Route exact path="/statistiques" component={Stats} />

              <Route
                exact
                path="/gerer-utilisateurs/modifier-utilisateur/:id"
                component={EditUser}
              />

              <Route
                exact
                path="/suivi-projet"
                component={ManageProjectMonitoring}
              />
              <Route
                exact
                path="/suivi-projet/:id"
                component={ViewProjectMonitoring}
              />
            </>
          ) : null}
          {hasRoleManager ? (
            <>
              <Route
                exact
                path="/suivi-projet"
                component={ManageProjectMonitoring}
              />
              <Route
                exact
                path="/suivi-projet/:id"
                component={ViewProjectMonitoring}
              />
              <Route
                exact
                path="/gerer-suivi-projet"
                component={ManageProjectMonitoring}
              />
              <Route exact path="/gerer-projets" component={ManageProjects} />
              <Route
                exact
                path="/gerer-projets/ajouter-projet"
                component={AddProject}
              />
              <Route
                exact
                path="/gerer-projets/modifier-projet/:id"
                component={EditProject}
              />
              <Route exact path="/gerer-taches" component={ManageTaches} />
              <Route exact path="/gerer-modules" component={ManageModules} />
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
            </>
          ) : null}
        </Switch>
      }
    ></DashboardLayout>
  );
}
