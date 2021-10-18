import React from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../redux";
export default function ManageUsers(props) {
  const dispatch = useDispatch();
  dispatch(setPageTitle("Gérer Utilisateurs"));
  return (
    <>
      <div className="row g-5 g-xl-8">
        <div className="col-xl-4">
          <div className="card card-xl-stretch mb-xl-8">
            <div className="card-header border-0">
              <h3 className="card-title fw-bolder text-dark">
                Demo Admin Card
              </h3>
            </div>
            <div className="card-body pt-2">Demo Admin page card body</div>
          </div>
        </div>
      </div>
    </>
  );
}
