import { Formik, Form, Field, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../redux/navActions";
import Moment from "moment";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { instanceToken as axios } from "../../../common/axiosWithAuth";
export default function ManageProjectMonitoring(props) {
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
        console.log("******");
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
        ></div>
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
                          <div className="d-flex justify-content-start flex-column">
                            <Link to={`/suivi-projet/${projet.id}`}>
                              <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                                {projet.titre}
                              </span>
                            </Link>
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
                                "DD MMMM YY"
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
                                "DD MMMM YY"
                              )}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="d-flex flex-column w-100 me-2">
                          <div className="d-flex flex-stack mb-2">
                            <span className="text-muted me-2 fs-7 fw-bold">
                              {projet.etat}
                            </span>
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
