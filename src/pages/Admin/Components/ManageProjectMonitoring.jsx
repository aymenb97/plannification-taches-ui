import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../redux";
export default function ManageProjectMonitoring(props) {
  const dispatch = useDispatch();
  dispatch(setPageTitle("Gérer Suivi De Projets"));
  return (
    <>
      <div className="row g-5 g-xl-8">
        <div className="col-xl-4">
          <div className="card card-xl-stretch mb-xl-8">
            <div className="card-header border-0">
              <h3 class="card-title fw-bolder text-dark">
                Manage Project Members
              </h3>
            </div>
            <div class="card-body pt-2">Manage Users</div>
          </div>
        </div>
      </div>
    </>
  );
}
