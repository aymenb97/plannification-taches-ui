import { Formik, Form, Field, useFormik, setIn } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Moment from "moment";
import Swal from "sweetalert2";
import { instanceToken as axios } from "./../../common/axiosWithAuth";
export default function EditTache(props) {
  const [result, setResult] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [projets, setProjets] = useState([]);
  const [modules, setModules] = useState([]);
  const [error, setError] = useState();

  const onSubmit = (values) => setResult(values);
  const validationSchema = Yup.lazy((values) => {
    return Yup.object().shape({
      titreTache: Yup.string().required("champ obligatoire"),
      dateDebutTache: Yup.string().required("champ obligatoire"),
      description: Yup.string().required("champ obligatoire"),
      membreEquipe: Yup.string()
        .typeError("champ obligatoire")
        .required("champ obligatoire"),
      module: Yup.string()
        .typeError("champ obligatoire")
        .required("champ obligatoire"),
      projet: Yup.string()
        .typeError("champ obligatoire")
        .required("champ obligatoire"),
      priorite: Yup.number()
        .integer()
        .positive("Doit être supérieur à 0")
        .required("champ obligatoire"),
      tauxAvancement: Yup.number().integer().required("champ obligatoire"),
      etatTache: Yup.string().required("champ obligatoire"),
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
      .get("/users")
      .then((res) => {
        setUsers(res.data["hydra:member"]);
        return axios({
          method: "get",
          url: "/modules",
        });
      })
      .then((res) => {
        setModules(res.data["hydra:member"]);
        return axios({
          method: "get",
          url: "/projets",
        });
      })
      .then((res) => {
        setProjets(res.data["hydra:member"]);
        return axios({
          method: "get",
          url: `/taches/${props.match.params.id}`,
        });
      })
      .then((res) => {
        setInitialValues({
          description: res.data.description,
          titreTache: res.data.titreTache,
          dateDebutTache: Moment(res.data.dateDebutTache).format("YYYY-MM-DD"),
          dateFinTache: Moment(res.data.dateFinTache).format("YYYY-MM-DD"),
          priorite: res.data.priorite,
          tauxAvancement: res.data.tauxAvancement,
          etatTache: res.data.etatTache,
          membreEquipe: res.data.membreEquipe,
          module: res.data.module,
          projet: `/api/projets/${res.data.projet.id}`,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
    axios
      .get("/modules")
      .then((res) => {
        setModules(res.data["hydra:member"]);
      })
      .catch((err) => {
        console.error(err.response.data); // NOTE - use "error.response.data` (not "error")
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
              <h3 className="fw-bolder m-0">{`Modifier information pour la tache "${initialValues.titreTache}"`}</h3>
            </div>
          </div>
          <div id="kt_account_profile_details" className="collapse show fadein">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                axios
                  .put(`/taches/${props.match.params.id}`, values)
                  .then((res) => {
                    setSubmitting(false);
                    Swal.fire({
                      position: "center-center",
                      icon: "success",
                      title: "Modification effectué avec succes",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    props.history.push("/gerer-taches");
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
                    <div className="row mb-4">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Titre tache
                      </label>
                      <div className="col-lg-8">
                        <div className="col-lg-6 fv-row">
                          <Field
                            type="text"
                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                            name="titreTache"
                            value={values.titreTache}
                            placeholder="Titre tache"
                          />
                          {errors.titreTache && touched.titreTache ? (
                            <div className="text-danger">
                              {errors.titreTache}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        description
                      </label>
                      <div className="col-lg-8">
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

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Date début tache
                      </label>
                      <div className="col-lg-8">
                        <div className="col-lg-6 fv-row">
                          <Field
                            type="date"
                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                            placeholder=""
                            name="dateDebutTache"
                            value={values.dateDebutTache}
                          />
                          {errors.dateDebutTache && touched.dateDebutTache ? (
                            <div className="text-danger">
                              {errors.dateDebutTache}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Date fin tache
                      </label>
                      <div className="col-lg-8">
                        <div className="col-lg-6 fv-row">
                          <Field
                            type="date"
                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                            placeholder=""
                            name="dateFinTache"
                            value={values.dateFinTache}
                          />
                          {errors.dateFinTache && touched.dateFinTache ? (
                            <div className="text-danger">
                              {errors.dateDebutTache}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Etat Tache
                      </label>
                      <div className="col-lg-8">
                        <div className="col-lg-6 fv-row">
                          <Field
                            as="select"
                            className="form-select form-select-solid"
                            name="etatTache"
                            value={values.etatTache}
                          >
                            <option value="0">A faire</option>
                            <option value="1">En Cours</option>
                            <option value="2">Terminée</option>
                          </Field>
                          {errors.etatTache && touched.etatTache ? (
                            <div className="text-danger">
                              {errors.etatTache}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Priorité
                      </label>

                      <div className="col-lg-1 fv-row">
                        <Field
                          min="1"
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
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Taux D'avancement
                      </label>

                      <div className="col-lg-1 fv-row">
                        <Field
                          min="0"
                          max="100"
                          type="number"
                          step="10"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder="Taux Avancement"
                          name="tauxAvancement"
                          value={values.tauxAvancement}
                        />
                        {errors.tauxAvancement && touched.tauxAvancement ? (
                          <div className="text-danger">
                            {errors.tauxAvancement}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mb-6  ">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Membre Equipe
                      </label>
                      <div className="col-lg-4">
                        <Field
                          as="select"
                          className="form-select form-select-solid"
                          name="membreEquipe"
                          value={values.membreEquipe}
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
                        {errors.membreEquipe && touched.membreEquipe ? (
                          <div className="text-danger">
                            {errors.membreEquipe}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Module
                      </label>
                      <div className="col-lg-4">
                        <select
                          name="module"
                          className="form-select form-select-solid"
                          value={values.module}
                          onChange={(e, selected) =>
                            setFieldValue("module", e.target.value)
                          }
                        >
                          <option></option>
                          {modules.map((module) => (
                            <option value={`/api/modules/${module.id}`}>
                              {module.titreModule}
                            </option>
                          ))}
                        </select>
                        {errors.module && touched.module ? (
                          <div className="text-danger">{errors.module}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Projet
                      </label>
                      <div className="col-lg-4">
                        <Field
                          as="select"
                          className="form-select form-select-solid"
                          name="projet"
                          value={values.projet}
                        >
                          <option></option>
                          {projets.map((projet) => (
                            <option value={`/api/projets/${projet.id}`}>
                              {projet.titre}
                            </option>
                          ))}
                        </Field>
                        {errors.projet && touched.projet ? (
                          <div className="text-danger">{errors.projet}</div>
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
