import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { instanceToken as axios } from "../../../common/axiosWithAuth";
import { setPageTitle } from "../../../redux";
import { userCircle } from "./UserCircle";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ManageUsers(props) {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    dispatch(setPageTitle("Gérer Utilisateurs"));
    axios
      .get("/users")
      .then((res) => {
        setUsers(res.data["hydra:member"]);
      })

      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div className={`card `}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder fs-3 mb-1">
            Members Statistics
          </span>
          <span className="text-muted mt-1 fw-bold fs-7">
            {users.length} Utilisateurs
          </span>
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <a
            href="#"
            className="btn btn-sm btn-light-primary"
            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <span FontAwesomeIcon={faPlus} className="svg-icon-3" />
            Ajouter Utilisateur
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bolder text-muted">
                <th className="w-25px">
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1"
                      data-kt-check="true"
                      data-kt-check-target=".widget-9-check"
                    />
                  </div>
                </th>
                <th className="min-w-150px">Nom</th>
                <th className="min-w-140px">Email</th>
                <th className="min-w-120px">Téléphone</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {users.map((user) => {
                return (
                  <tr>
                    <td>
                      <div className="form-check form-check-sm form-check-custom form-check-solid">
                        <input
                          className="form-check-input widget-9-check"
                          type="checkbox"
                          value="1"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-45px me-5"></div>
                        <div className="d-flex justify-content-start flex-column">
                          <a
                            href="#"
                            className="text-dark fw-bolder text-hover-primary fs-6"
                          >
                            {user.name + " " + user.surname}
                          </a>
                          <span className="text-muted fw-bold text-muted d-block fs-7">
                            {user.roles.join(" ")}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-muted fw-bold text-muted d-block fs-7">
                        {user.email}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex flex-column w-100 me-2">
                        <div className="d-flex flex-stack mb-2">
                          <span className="text-muted me-2 fs-7 fw-bold">
                            {user.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-end flex-shrink-0">
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        >
                          <span
                            path="/media/icons/duotune/general/gen019.svg"
                            className="svg-icon-3"
                          />
                        </a>
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        >
                          <span
                            path="/media/icons/duotune/art/art005.svg"
                            className="svg-icon-3"
                          />
                        </a>
                        <a
                          href="#"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        >
                          <span
                            path="/media/icons/duotune/general/gen027.svg"
                            className="svg-icon-3"
                          />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
}
