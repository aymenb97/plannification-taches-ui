import React from "react";
import { DashboardLayout } from "../../Layouts/Dashboard/DashboardLayout";
import { AsideMenuItem } from "../../Components/aside/AsideElement";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { ManageModules } from "./ManageModules";
import { ManageProjects } from "./ManageProjects";
export function ManagerIndex(props) {
  return (
    <DashboardLayout
      aside={
        <>
          <AsideMenuItem
            link="gerer-projets"
            title="Gérer Projet"
            icon={faUserCog}
          ></AsideMenuItem>
          <AsideMenuItem
            title=" Gérer Modules"
            icon={faUserCog}
            link="gerer-modules"
          ></AsideMenuItem>
        </>
      }
      content={
        <Switch>
          <Route path="/gerer-projets" exact component={ManageProjects} />
          <Route path="/gerer-modules" exact component={ManageModules} />
        </Switch>
      }
    ></DashboardLayout>
  );
}
