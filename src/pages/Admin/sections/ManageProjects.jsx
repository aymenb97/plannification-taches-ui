import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../redux/navActions";
import { instanceToken as axios } from "../../../common/axiosWithAuth";
import Moment from "moment";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export default function ManageProjets(props) {
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
  const [projets, setprojets] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    dispatch(setPageTitle("Gérer Projets"));
    axios
      .get("/projets")
      .then((res) => {
        console.log(res);
        setprojets(res.data["hydra:member"]);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setError(err);
        setLoading(false);
      });
  }, []);
  const etatProjet = (projet) => {
    switch (projet) {
      case "0":
        return <span className="badge badge-light-danger">Non Entamé</span>;
      case "1":
        return <span className="badge badge-light-warning">En cours</span>;
      case "2":
        return <span className="badge badge-light-primary">Fini</span>;
      default:
        return <div></div>;
    }
  };

  function deleteProjet(id, titre_projet) {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Supprimer ce projet",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/projets/${id}`)
          .then((res) => {
            const projettemp = [...projets];

            projettemp.splice(
              projettemp.findIndex((el) => {
                return el.id === id;
              }),
              1
            );
            setprojets(projettemp);
            Swal.fire("Supprimé!", "Votre projet a été supprimé.", "success");
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
          <span className="card-label fw-bolder fs-3 mb-1">Projets</span>
          <span className="text-muted mt-1 fw-bold fs-7">
            {projets.length} Projets
          </span>
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add  project"
        >
          <Link
            exact
            to="/gerer-projets/ajouter-projet"

            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <button className="btn btn-sm btn-light-primary">
              <span FontAwesomeIcon={faPlus} className="svg-icon-3" />
              Ajouter projet
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
                  <th className="min-w-150px">Titre</th>
                  <th className="min-w-140px">Description du projet</th>
                  <th className="min-w-120px">Date début</th>
                  <th className="min-w-120px">Date fin</th>
                  <th className="min-w-120px">Statut</th>
                  <th className="min-w-120px">Chef de projet</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {projets.map((projet) => {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-45px"></div>
                          <div className="d-flex justify-content-start flex-column">
                            <span className="ext-dark fw-bolder fs-6">
                              {projet.titre}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="text-muted fw-bold text-muted d-block fs-7">
                          {projet.description}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-flex flex-column w-100 me-2">
                          <div className="d-flex flex-stack mb-2">
                            <span className="text-muted me-2 fs-7 fw-bold">
                              {Moment(projet.dateDebutProjet).format(
                                "DD MMMM YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="d-flex flex-column w-100 me-2">
                          <div className="d-flex flex-stack mb-2">
                            <span className="text-muted me-2 fs-7 fw-bold">
                              {Moment(projet.dateFinProjet).format(
                                "DD MMMM YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="d-flex flex-column w-100 me-2">
                          <div className="d-flex flex-stack mb-2">
                            <span className="text-muted me-2 fs-7 fw-bold">
                              {etatProjet(projet.etat)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="d-flex flex-column w-100 me-2">
                          <div className="d-flex flex-stack mb-2">
                            <span className="text-muted me-2 fs-7 fw-bold">
                              {projet.chefDeProjet.name +
                                " " +
                                projet.chefDeProjet.surname}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                          <Link
                            to={`/gerer-projets/modifier-projet/${projet.id}`}
                          >
                            <div className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                              <FontAwesomeIcon icon={faEdit} />
                            </div>
                          </Link>
                          <div
                            onClick={(e, id) =>
                              deleteProjet(projet.id, projet.titreprojet)
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
