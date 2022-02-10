import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { instanceToken as axios } from "../../common/axiosWithAuth";
import { setPageTitle } from "./../../redux";
import { tacheCircle } from "./TacheCircle";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import EditModule from "./EditModule";
import AddModule from "./AddModule";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { faTrash, faEdit, faOutdent } from "@fortawesome/free-solid-svg-icons";

export default function ManageModules(props) {
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
  const [modules, setModules] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    moment.locale("fr");
    dispatch(setPageTitle("Gérer Modules"));
    axios
      .get("/modules")
      .then((res) => {
        console.log("******");
        console.log(res);
        setModules(res.data["hydra:member"]);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  function deleteModule(id, titre_tache) {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Supprimer ce tâche",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/modules/${id}`)
          .then((res) => {
            const moduletemp = [...modules];

            moduletemp.splice(
              moduletemp.findIndex((el) => {
                return el.id === id;
              }),
              1
            );
            setModules(moduletemp);
            Swal.fire("Supprimé!", "Votre module a été supprimé.", "success");
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
          <span className="card-label fw-bolder fs-3 mb-1">Modules</span>
          <span className="text-muted mt-1 fw-bold fs-7">
            {modules.length} Modules
          </span>
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add  module"
        >
          <Link
            exact
            to="/gerer-modules/ajouter-module"

            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <button className="btn btn-sm btn-light-primary">
              <span FontAwesomeIcon={faPlus} className="svg-icon-3" />
              Ajouter Module
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
                  <th className="min-w-150px">Module</th>
                  <th className="min-w-140px">Date Debut Module</th>
                  <th className="min-w-120px">Date fin Module</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {modules.map((module) => {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-45px"></div>
                          <div className="d-flex justify-content-start flex-column">
                            <span className="ext-dark fw-bolder fs-6">
                              {module.titreModule}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="text-muted fw-bold text-muted d-block fs-7">
                          {moment(module.dateDebutModule).format(
                            "DD MMMM YYYY"
                          )}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-flex flex-column w-100 me-2">
                          <div className="d-flex flex-stack mb-2">
                            <span className="text-muted me-2 fs-7 fw-bold">
                              {moment(module.dateFinModule).format(
                                "DD MMMM YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                          <Link
                            to={`/gerer-modules/modifier-module/${module.id}`}
                          >
                            <div className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                              <FontAwesomeIcon icon={faEdit} />
                            </div>
                          </Link>
                          <div
                            onClick={(e, id) =>
                              deleteModule(module.id, module.titreModule)
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
