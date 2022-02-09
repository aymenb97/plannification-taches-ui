import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import { propTypes } from "react-bootstrap-v5/lib/esm/Image";
import * as Yup from "yup";
import { instanceToken as axios } from "./../../common/axiosWithAuth";
export default function AddTache(props) {
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
  const [users, setUsers] = useState([]);
  const [projets, setProjets] = useState([]);
  const [modules, setModules] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
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
  useEffect(() => {
    axios
    .get("/modules")
      .then((res) => {
        setModules(res.data["hydra:member"]);
        setLoading(false);
      })

      .catch((err) => 
      {
        console.error(err.response.data);     // NOTE - use "error.response.data` (not "error")
      
      });
  }, []);
  useEffect(() => {
    axios
    .get("/projets")
      .then((res) => {
        setProjets(res.data["hydra:member"]);
        setLoading(false);
      })

      .catch((err) => 
      {
        console.error(err.response.data);     // NOTE - use "error.response.data` (not "error")
      
      });
  }, []);
  const digitsRegex = (value) => /^\+?(\d| )+$/.test(value);
  const addMangerSchema = Yup.object().shape({
    titreTache: Yup.string().required("champ obligatoire"),
    dateDebutTache: Yup.string().required("champ obligatoire"),
    membreEquipe: Yup.number()
    .typeError('champ obligatoire')
    .required("champ obligatoire"),
    module: Yup.number()
    .typeError('champ obligatoire')
    .required("champ obligatoire"),
    projet: Yup.number()
    .typeError('champ obligatoire')
    .required("champ obligatoire"),
    priorite: Yup
    .number()
    .integer().positive("Doit être supérieur à 0").required("champ obligatoire"),
  });
  const [value, setValue] = useState(0);

  return (
    <div className="card mb-5 mb-xl-10 fadein">
      <div className="card-header border-0 cursor-pointer">
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Ajouter Tache</h3>
        </div>
      </div>
      <div id="kt_account_profile_details" className="collapse show">
        <Formik
          initialValues={{
            titreTache: "",
            dateDebutTache:"",
            priorite:"",
            tauxAvancement:0,
            etatTache:"à faire",
            membreEquipe:"",
            module:"",
            projet:"",
            
          }}
          
          validationSchema={addMangerSchema}
          

          onSubmit={(values, { setSubmitting }) => { 
            setSubmitting(true);
            axios
              .post("/taches", values)
              .then((res) => {
                setSubmitting(false);
                props.history.push("/gerer-taches");
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Ajout effectué avec succes',
                  showConfirmButton: false,
                  timer: 1500
                });
              })
              .catch((err) => {
                console.error(err.response.data); 
                setSubmitting(false);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            /* and other goodies */
          }) => (
            <Form className="form">
              <div className="card-body border-top p-9">
                <div className="row mb-4">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Titre tache
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 fv-row">
                        <Field
                          type="text"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          name="titreTache"
                          value={values.titreTache}
                          placeholder="Titre tache"
                        />
                        {errors.titreTache && touched.titreTache ? (
                          <div className="text-danger">{errors.titreTache}</div>
                        ) : null}
                      </div>

                    </div>

                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Descripion
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 fv-row">
                      <div class="form-floating mb-7">
                      <textarea  
                          name="Description"
                          value={values.Description}
                          class="form-control" 
                          placeholder="Descripion" 
                          id="floatingTextarea"></textarea>
                         {errors.Description && touched.Description ? (
                          <div className="text-danger">{errors.Description}</div>
                        ) : null}
                      </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Date début tache
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 fv-row">
                        <Field
                          type="date"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder=""
                          name="dateDebutTache"
                          value={values.dateDebutTache}
                        />
                        {errors.dateDebutTache && touched.dateDebutTache ? (
                          <div className="text-danger">{errors.dateDebutTache}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Priorité
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 fv-row">
                        <Field
                          type="number"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder="Priorité"
                          name="priorite"
                          value={values.priorite}
                        />
                        {errors.priorite && touched.priorite ? (
                          <div className="text-danger">{errors.priorite}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>



                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Membre Equipe
                  </label>
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-lg-6 fv-row"></div>
                      <select
                        name="values.membreEquipe"
                        value={values.membreEquipe}
                        onChange={(e, selected) =>
                          setFieldValue("membreEquipe",  parseInt(e.target.value))
                        }
                        class="form-select form-select-transparent"
                        aria-label="Select example">
                          <option></option> 
                        {users.map((user) => (
                          <option value={user.id} >
                            {user.name.toUpperCase() + " " + user.surname.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      {errors.membreEquipe && touched.membreEquipe ? (
                          <div className="text-danger">{errors.membreEquipe}</div>
                        ) : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Module
                  </label>
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-lg-6 fv-row"></div>
                      <select
                        name="module"
                        value={values.module}
                        onChange={(e, selected) =>
                          setFieldValue("module",  parseInt(e.target.value))
                        }
                        class="form-select form-select-transparent"
                        aria-label="Select example">
                           <option></option> 
                        {modules.map((module) => (
                          
                          <option value={module.id}>
                            {module.titreModule}
                          </option>
                        ))}
                      </select>
                      {errors.module && touched.module ? (
                          <div className="text-danger">{errors.module}</div>
                        ) : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Projet
                  </label>
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-lg-6 fv-row"></div>
                      <select
                        name="projet"
                        value={values.projet}
                        onChange={(e, selected) =>
                          setFieldValue("projet",  parseInt(e.target.value))
                        }
                        class="form-select form-select-transparent"
                        aria-label="Select example">
                           <option></option> 
                        {projets.map((projet) => (
                          
                          <option value={projet.id}>
                            {projet.titre}
                          </option>
                        ))}
                      </select>
                      {errors.projet && touched.projet ? (
                          <div className="text-danger">{errors.projet}</div>
                        ) : null}
                    </div>
                  </div>
                </div>

                <div className="card-footer d-flex justify-content-end py-6 px-9">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
