import { Formik, Form, Field, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Moment from 'moment';
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
        tauxAvancement: Yup
        .number()
        .integer().positive("Doit être supérieur à 0").required("champ obligatoire"),
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
      .get(`/taches/${props.match.params.id}`)
      .then((res) => {
        setInitialValues({
          Description: res.data.Description,
          titreTache: res.data.titreTache,
          dateDebutTache: Moment(res.data.dateDebutTache).format('YYYY-MM-DD'),
          dateFinTache: Moment(res.data.dateFinTache).format('YYYY-MM-DD'),
          priorite: res.data.priorite,
          tauxAvancement: res.data.tauxAvancement,
          etatTache: res.data.etatTache,
          membreEquipe: parseInt(res.data.membreEquipe,10),
          module: parseInt(res.data.module,10),
          projet: parseInt(res.data.projet,10),
        });
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  }, [validation]);
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
                    console.log(res.data);
                    setSubmitting(false);
                    props.history.push("/gerer-taches");
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Modification effectué avec succes',
                      showConfirmButton: false,
                      timer: 1500
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
                  Taux d'avancement
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 fv-row">
                        <Field
                          type="number"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder="Priorité"
                          name="tauxAvancement"
                          value={values.tauxAvancement}
                        />
                        {errors.tauxAvancement && touched.tauxAvancement ? (
                          <div className="text-danger">{errors.tauxAvancement}</div>
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
                  Date début tache
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 fv-row">
                        <Field
                          type="date"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder=""
                          name="dateFinTache"
                          value={values.dateFinTache}
                        />
                        {errors.dateFinTache && touched.dateFinTache ? (
                          <div className="text-danger">{errors.dateFinTache}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Etat tache
                  </label>
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-lg-6 fv-row"></div>
                <select 
                        value={values.etatTache} 
                        onChange={(e, selected) =>
                          setFieldValue("etatTache", e.target.value)
                        }
                        class="form-select form-select-transparent" 
                        name="etatTache"
                        aria-label="Select example">

                    <option value="à faire">à faire</option>
                    <option value="en cours">en cours</option>
                    <option value="fini">fini</option>
                </select>
                {errors.etatTache && touched.etatTache ? (
                          <div className="text-danger">{errors.etatTache}</div>
                        ) : null}
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
                        value={parseInt(values.module)}
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
