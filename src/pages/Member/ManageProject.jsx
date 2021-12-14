import React from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../redux/navActions";
export function ManageProject(props) {
  const dispatch = useDispatch();
  dispatch(setPageTitle("Gérer Projets"));
  return (
    <>
      <div className="row g-5 g-xl-8">
        <div className="col-xl-4">
          <div className="card card-xl-stretch mb-xl-8">
            <div className="card-header border-0">
              <h3 className="card-title fw-bolder text-dark">Mange Projects</h3>
            </div>
            <div className="card-body pt-2">Mange Projects</div>
          </div>
        </div>
      </div>
    </>
  );
}
