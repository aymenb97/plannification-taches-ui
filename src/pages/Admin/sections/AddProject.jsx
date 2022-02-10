import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { instanceToken as axios } from "../../../common/axiosWithAuth";
import React, { useEffect, useState } from "react";

export default function AddProject(props) {
  const [loading, setLoading] = useState(true);
  const addProjectSchema = Yup.object().shape({
    titre: Yup.string().required("Ajouter un titre"),
    description: Yup.string().required("Ajouter une description"),
    dateDebutProjet: Yup.string().required("Ajouter la date début"),
    dateFinProjet: Yup.string().required("Ajouter la date fin"),

    chef: Yup.number()
      .typeError("champ obligatoire")
      .required("champ obligatoire"),
  });
  const [users, setUsers] = useState([]);
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
  return (
    <div className="card mb-5 mb-xl-10 fadein">
      <div className="card-header border-0 cursor-pointer">
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Ajouter Projet</h3>
        </div>
      </div>
      <div id="kt_account_profile_details" className="collapse show">
        <Formik
          initialValues={{
            titre: "",
            description: "",
            dateDebutProjet: "",
            dateFinProjet: "",
            etat: "",
            chef: "",
          }}
          validationSchema={addProjectSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            axios
              .post("/projets", values)
              .then((res) => {
                setSubmitting(false);
                props.history.push("/gerer-projets");
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
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Titre
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-12 fv-row">
                        <Field
                          type="text"
                          name="titre"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder="Titre"
                          value={values.titre}
                        />
                        {errors.titre && touched.titre ? (
                          <div className="text-danger">{errors.titre}</div>
                        ) : null}
                      </div>
                      <div className="col-lg-6 fv-row"></div>
                    </div>
                  </div>
                </div>
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Description du projet
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-12 fv-row">
                        <Field
                          type="Textarea"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder="description du projet "
                          name="description"
                          value={values.description}
                        />
                        {errors.description && touched.description ? (
                          <div className="text-danger">
                            {errors.description}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Date début
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-12 fv-row">
                        <Field
                          type="Date"
                          name="dateDebutProjet"
                          value={values.dateDebutProjet}
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder="Nom d'utilisateur"
                        />
                        {errors.dateDebutProjet && touched.dateDebutProjet ? (
                          <div className="text-danger">
                            {errors.dateDebutProjet}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Date fin
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-12 fv-row">
                        <Field
                          type="Date"
                          name="dateFinProjet"
                          value={values.dateFinProjet}
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        />
                        {errors.dateFinProjet && touched.dateFinProjet ? (
                          <div className="text-danger">
                            {errors.dateFinProjet}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    etat
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-12 fv-row">
                        <select
                          value={values.etat}
                          name="etat"
                          onChange={(e, selected) =>
                            setFieldValue("etat", e.target.value)
                          }
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        >
                          <option value="non-entamé">non-entamé</option>
                          <option value="en cours">en cours</option>
                          <option value="fini">fini</option>
                        </select>
                        {errors.etat && touched.etat ? (
                          <div className="text-danger">{errors.etat}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Chef de projet
                  </label>
                  <div className="col-lg-4">
                    <div className="col-lg-6 fv-row"></div>
                    <select
                      name="values.chef"
                      value={values.chef}
                      onChange={(e, selected) =>
                        setFieldValue("chef", parseInt(e.target.value))
                      }
                      className="form-select form-select-solid"
                      aria-label="Select example"
                    >
                      {users.map((user) => (
                        <option value={user.id}>
                          {user.name.toUpperCase() +
                            " " +
                            user.surname.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    {errors.chef && touched.chef ? (
                      <div className="text-danger">{errors.chef}</div>
                    ) : null}
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
