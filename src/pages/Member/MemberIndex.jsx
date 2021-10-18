import React from "react";
import { DashboardLayout } from "../../Layouts/Dashboard/DashboardLayout";
import { AsideMenuItem } from "../../Components/aside/AsideElement";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { ManageProject } from "./ManageProject";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export function MemberIndex(props) {
  return (
    <DashboardLayout
      aside={
        <>
          <AsideMenuItem
            link="gerer-projet"
            title="Gérer Projets"
            icon={faUserCog}
          ></AsideMenuItem>
        </>
      }
      content={
        <Switch>
          <Route path="/gerer-projet" component={ManageProject} />
        </Switch>
      }
    ></DashboardLayout>
  );
}
