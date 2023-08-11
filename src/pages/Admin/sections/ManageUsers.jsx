import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { instanceToken as axios } from "../../../common/axiosWithAuth";
import { setPageTitle } from "../../../redux/navActions";
import { UserCircle } from "../../../Components/UserCircle";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
export default function ManageUsers(props) {
  const [loading, setLoading] = useState(true);
  const MySwal = withReactContent(
    Swal.mixin({
      customClass: {
        confirmButton: "btn btn-sm btn-success mx-2 mb-5",
        cancelButton: "btn btn-sm btn-danger mx-2 mb-5",
      },
      buttonsStyling: false,
      titleStyling: false,
    })
  );
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.id);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    dispatch(setPageTitle("Gérer Utilisateurs"));
    axios
      .get("/users")
      .then((res) => {
        setUsers(res.data["hydra:member"]);
        setLoading(false);
      })

      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  function deleteUser(id, name, surmane) {
    MySwal.fire({
      title: `<span class="card-label fw-bolder fs-3 mb-1">Supprimer L'utilisateur ${surmane} ${name}?</span>`,
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: `Annuler`,
      showClass: {
        popup: "modal-fadeindown",
      },
      hideClass: {
        popup: "modal-fadeoutup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/users/${id}`)
          .then((res) => {
            const usertemp = [...users];

            usertemp.splice(
              usertemp.findIndex((el) => {
                return el.id === id;
              }),
              1
            );
            setUsers(usertemp);
          })
          .catch((err) => {});
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  return (
    <div className="card fadein">
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder fs-3 mb-1">Utilisateurs</span>
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
          <Link
            exact
            to="/gerer-utilisateurs/ajouter-utilisateur"

            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <button className="btn btn-sm btn-light-primary">
              <span FontAwesomeIcon={faPlus} className="svg-icon-3" />
              Ajouter Utilisateur
            </button>
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body d-flex justify-content-center ">
        {/* begin::Table container */}

        {/* begin::Table */}
        {loading ? (
          <div class="spinner-border  text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="table-responsive m-1 w-100 fadein">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bolder text-muted">
                  <th></th>
                  <th className="min-w-150px">Utilisateur</th>
                  <th className="min-w-140px">Email</th>
                  <th className="min-w-120px">Téléphone</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {users.map((user) => {
                  return parseInt(user.id) === parseInt(id) ? null : (
                    <tr>
                      <td>
                        <div>
                          <UserCircle
                            className="d-flex align-items-center"
                            name={user.name + " " + user.surname}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-45px"></div>
                          <div className="d-flex justify-content-start flex-column">
                            <span className="ext-dark fw-bolder fs-6">
                              {" "}
                              {user.name + " " + user.surname}
                            </span>

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
                          <Link
                            to={`/gerer-utilisateurs/modifier-utilisateur/${user.id}`}
                          >
                            <div className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                              <FontAwesomeIcon icon={faEdit} />
                            </div>
                          </Link>
                          <div
                            onClick={(e, id) =>
                              deleteUser(user.id, user.name, user.surname)
                            }
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {/* end::Table body */}
            </table>
          </div>
        )}

        {/* end::Table */}
      </div>
      {/* end::Table container */}

      {/* begin::Body */}
    </div>
  );
}
