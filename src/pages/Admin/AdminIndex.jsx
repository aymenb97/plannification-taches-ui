import React from "react";
import { DashboardLayout } from "../../Layouts/Dashboard/DashboardLayout";
import { AsideMenuItem } from "../../Components/aside/AsideElement";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
export function AdminIndex(props) {
  return (
    <DashboardLayout
      aside={
        <>
          <AsideMenuItem
            title="Gérer Utilisateurs"
            icon={faUserCog}
          ></AsideMenuItem>
          <AsideMenuItem
            title="Gérer Membres Projets"
            icon={faUserCog}
          ></AsideMenuItem>
        </>
      }
      title="Demo Admin Title"
      content={
        <>
          <div className="row g-5 g-xl-8">
            <div className="col-xl-4">
              <div className="card card-xl-stretch mb-xl-8">
                <div className="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">
                    Demo Admin Card
                  </h3>
                </div>
                <div class="card-body pt-2">Demo Admin page card body</div>
              </div>
            </div>
          </div>
        </>
      }
    ></DashboardLayout>
  );
}
