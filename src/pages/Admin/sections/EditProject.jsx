import { Formik, Form, Field, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Moment from "moment";
import Swal from "sweetalert2";
import { instanceToken as axios } from "../../../common/axiosWithAuth";
export default function EditProject(props) {
  const [result, setResult] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [projets, setProjets] = useState([]);
  const [error, setError] = useState();

  const onSubmit = (values) => setResult(values);
  const validationSchema = Yup.lazy((values) => {
    return Yup.object().shape({
      titre: Yup.string().required("Ajouter un titre"),
      description: Yup.string().required("Ajouter une description"),
      dateDebutProjet: Yup.string().required("Ajouter la date début"),
      dateFinProjet: Yup.string().required("Ajouter la date fin"),
      chefDeProjet: Yup.string().required("champ obligatoire"),
    });
  });
  const [validation, setValidation] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => onSubmit(values),
    validateOnBlur: true,
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    validateForm,
    handleBlur,
  } = formik;

  useEffect(() => {
    validateForm();
    axios
      .get(`/projets/${props.match.params.id}`)
      .then((res) => {
        setInitialValues({
          titre: res.data.titre,
          description: res.data.description,
          dateDebutProjet: Moment(res.data.dateDebutProjet).format(
            "YYYY-MM-DD"
          ),
          dateFinProjet: Moment(res.data.dateFinProjet).format("YYYY-MM-DD"),
          etat: res.data.etat,
          chefDeProjet: "/api/users/" + res.data.chefDeProjet.id,
        });
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
    axios
      .get("/users")
      .then((res) => {
        setUsers(res.data["hydra:member"]);
      })
      .catch((err) => {
        setError(err);
      });
  }, [validation]);

  return (
    <div className="card mb-5 mb-xl-10 ">
      {loading ? (
        <div class="spinner-border  text-primary m-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <div className="card-header border-0 cursor-pointer fadein">
            <div className="card-title m-0">
              <h3 className="fw-bolder m-0">{`Modifier information pour "${initialValues.titre}"`}</h3>
            </div>
          </div>
          <div id="kt_account_profile_details" className="collapse show fadein">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                axios
                  .put(`/projets/${props.match.params.id}`, values)
                  .then((res) => {
                    console.log(res.data);
                    setSubmitting(false);
                    props.history.push("/gerer-projets");
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Modification effectué avec succes",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  })
                  .catch((err) => {
                    setSubmitting(false);
                  });
              }}
            >
              {({
                values,
                errors,
                touched,
                setFieldValue,
                isSubmitting,
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
                          <div className="col-lg-6 fv-row">
                            <Field
                              type="text"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              name="titre"
                              value={values.titre}
                              placeholder="Titre Projet"
                            />
                            {errors.titre && touched.titre ? (
                              <div className="text-danger">{errors.titre}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Description
                      </label>
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-6 fv-row">
                            <div class="form-floating mb-7">
                              <Field
                                as="textarea"
                                name="description"
                                value={values.description}
                                class="form-control"
                                placeholder="Descripion"
                                id="floatingTextarea"
                              ></Field>

                              {errors.description && touched.description ? (
                                <div className="text-danger">
                                  {errors.description}
                                </div>
                              ) : null}
                            </div>
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
                          <div className="col-lg-6 fv-row">
                            <Field
                              type="date"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              placeholder=""
                              name="dateDebutProjet"
                              value={values.dateDebutProjet}
                            />
                            {errors.dateDebutProjet &&
                            touched.dateDebutProjet ? (
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
                          <div className="col-lg-6 fv-row">
                            <Field
                              type="date"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              placeholder=""
                              name="dateFinProjet"
                              value={values.dateFinProjet}
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
                        État
                      </label>
                      <div className="col-lg-4">
                        <Field
                          as="select"
                          value={values.etat}
                          name="etat"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        >
                          <option value="0">Non-entamé</option>
                          <option value="1">En cours</option>
                          <option value="2">Fini</option>
                        </Field>
                        {errors.etat && touched.etat ? (
                          <div className="text-danger">{errors.etat}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Chef de projet
                      </label>
                      <div className="col-lg-4">
                        <Field
                          as="select"
                          name="chefDeProjet"
                          value={values.chefDeProjet}
                          className="form-select form-select-solid"
                          aria-label="Select example"
                        >
                          <option></option>
                          {users.map((user) => (
                            <option value={`/api/users/${user.id}`}>
                              {user.name.toUpperCase() +
                                " " +
                                user.surname.toUpperCase()}
                            </option>
                          ))}
                        </Field>
                        {errors.chefDeProjet && touched.chefDeProjet ? (
                          <div className="text-danger">
                            {errors.chefDeProjet}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </div>
  );
}
