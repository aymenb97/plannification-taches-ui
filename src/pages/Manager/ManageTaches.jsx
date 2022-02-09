import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { instanceToken as axios } from "../../common/axiosWithAuth";
import { setPageTitle } from "./../../redux";
import { tacheCircle } from "./TacheCircle";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import EditTache from "./EditTache";
import AddTache from "./AddTache";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash, faEdit ,faOutdent} from "@fortawesome/free-solid-svg-icons";

export default function ManageTaches(props) {
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
  const [taches, setTaches] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    dispatch(setPageTitle("Gérer Tâches"));
    axios
      .get("/taches")
      .then((res) => {
        console.log("******");
        console.log(res);
        setTaches(res.data["hydra:member"])
        setLoading(false);
      })
      .catch((err) => {
	      alert(err);
        setError(err);
        setLoading(false);
      });
  }, []);



  function deleteTache(id, titre_tache) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Supprimer ce tâche",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/taches/${id}`)
          .then((res) => {
            const tachetemp = [...taches];

            tachetemp.splice(
                tachetemp.findIndex((el) => {
                return el.id === id;
              }),
              1
            );
            setTaches(tachetemp);
            Swal.fire(
              'Supprimé!',
              'Votre tache a été supprimé.',
              'success'
            )
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
          <span className="card-label fw-bolder fs-3 mb-1">Tâches</span>
          <span className="text-muted mt-1 fw-bold fs-7">
            {taches.length} Tâches
          </span>
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add  tache"
        >
          <Link
            exact
            to="/gerer-taches/ajouter-tache"

            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <button className="btn btn-sm btn-light-primary">
              <span FontAwesomeIcon={faPlus} className="svg-icon-3" />
              Ajouter tâche
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
                  <th className="min-w-150px">Tâche</th>
                  <th className="min-w-140px">Priorite</th>
                  <th className="min-w-120px">Etat tâche</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {taches.map((tache) => {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-45px"></div>
                          <div className="d-flex justify-content-start flex-column">
                            <span className="ext-dark fw-bolder fs-6">
                              {" "}
                              {tache.titreTache}
                            </span>
                          </div>
                        </div>
                      </td>
                      
                      <td>
                        <span className="text-muted fw-bold text-muted d-block fs-7">
                          {tache.priorite}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-flex flex-column w-100 me-2">
                          <div className="d-flex flex-stack mb-2">
                            <span className="text-muted me-2 fs-7 fw-bold">
                              {tache.etatTache}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                          <Link
                            to={`/gerer-taches/modifier-tache/${tache.id}`}
                          >
                            <div className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                              <FontAwesomeIcon icon={faEdit} />
                            </div>
                          </Link>
                          <div
                            onClick={(e, id) =>
                              deleteTache(tache.id, tache.titreTache)
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
