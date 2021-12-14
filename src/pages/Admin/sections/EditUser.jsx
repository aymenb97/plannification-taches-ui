import { Formik, Form, Field, useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setNavLink } from "../../../redux/navActions";
import { instanceToken as axios } from "../../../common/axiosWithAuth";
export default function EditUser(props) {
  const digitsRegex = (value) => /^\+?(\d| )+$/.test(value);
  const [result, setResult] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNavLink("Utilisateurs", "gerer-utilisateurs"));
    return () => {
      dispatch(setNavLink("", ""));
    };
  }, []);
  const onSubmit = (values) => setResult(values);
  const validationSchema = Yup.lazy((values) => {
    if (changePassword) {
      return Yup.object().shape({
        name: Yup.string().required("Saisir Un nom"),
        surname: Yup.string().required("Saisir Un Prénom"),
        username: Yup.string().required("Saisir le nom d'utilisateur"),
        address: Yup.string().required("Saisir l'adresse"),
        email: Yup.string()
          .required("Saisir un E-mail")
          .email("Saisir une addresse e-mail valide"),
        phone: Yup.string()
          .required("Saisir le numéro de téléphone")
          .test(
            "Digits only",
            "Saisir un numéro de téléphone valide",
            digitsRegex
          )
          .min(8, "Saisir un numéro de téléphone valide"),
        roles: Yup.array().min(1, "Sélectionner au moins un role"),
        password: Yup.string()
          .required("Saisir un mot de passe")
          .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
        passwordConfirm: Yup.string().test(
          "password-match",
          "Mot de passe should match",
          function (value) {
            return this.parent.password === value;
          }
        ),
      });
    } else {
      return Yup.object().shape({
        name: Yup.string().required("Saisir Un nom"),
        surname: Yup.string().required("Saisir Un Prénom"),
        username: Yup.string().required("Saisir le nom d'utilisateur"),
        address: Yup.string().required("Saisir l'adresse"),
        email: Yup.string()
          .required("Saisir un E-mail")
          .email("Saisir une addresse e-mail valide"),
        phone: Yup.string()
          .required("Saisir le numéro de téléphone")
          .test(
            "Digits only",
            "Saisir un numéro de téléphone valide",
            digitsRegex
          )
          .min(8, "Saisir un numéro de téléphone valide"),
        roles: Yup.array().min(1, "Sélectionner au moins un role"),
      });
    }
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
      .get(`/users/${props.match.params.id}`)
      .then((res) => {
        setInitialValues({
          email: res.data.email,
          password: "",
          passwordConfirm: "",
          name: res.data.name,
          surname: res.data.surname,
          roles: res.data.roles,
          username: res.data.username,
          phone: res.data.phone,
          address: res.data.address,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
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
              <h3 className="fw-bolder m-0">{`Modifier information pour ${initialValues.name} ${initialValues.surname}`}</h3>
            </div>
          </div>
          <div id="kt_account_profile_details" className="collapse show fadein">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                axios
                  .put(`/users/${props.match.params.id}`, values)
                  .then((res) => {
                    console.log(res.data);
                    setSubmitting(false);
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

                isSubmitting,
                /* and other goodies */
              }) => (
                <Form className="form">
                  <div className="card-body border-top p-9">
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Nom complet
                      </label>
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-6 fv-row">
                            <Field
                              type="text"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              name="name"
                              value={values.name}
                              placeholder="Nom"
                            />
                            {errors.name && touched.name ? (
                              <div className="text-danger">{errors.name}</div>
                            ) : null}
                          </div>
                          <div className="col-lg-6 fv-row">
                            <Field
                              type="text"
                              name="surname"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              placeholder="Prénom"
                              value={values.surname}
                            />
                            {errors.surname && touched.surname ? (
                              <div className="text-danger">
                                {errors.surname}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-lg-6 fv-row"></div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Email
                      </label>
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-12 fv-row">
                            <Field
                              type="text"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              placeholder="E-mail"
                              name="email"
                              value={values.email}
                            />
                            {errors.email && touched.email ? (
                              <div className="text-danger">{errors.email}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Nom d'utilisateur
                      </label>
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-12 fv-row">
                            <Field
                              type="text"
                              name="username"
                              value={values.username}
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              placeholder="Nom d'utilisateur"
                            />
                            {errors.username && touched.username ? (
                              <div className="text-danger">
                                {errors.username}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Téléphone
                      </label>
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-12 fv-row">
                            <Field
                              type="text"
                              name="phone"
                              value={values.phone}
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              placeholder="Téléphone"
                            />
                            {errors.phone && touched.phone ? (
                              <div className="text-danger">{errors.phone}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Adresse
                      </label>
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-12 fv-row">
                            <Field
                              name="address"
                              value={values.address}
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              placeholder="Adresse"
                            />
                            {errors.address && touched.address ? (
                              <div className="text-danger">
                                {errors.address}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-6 align-content-end">
                      {!changePassword ? (
                        <div className="">
                          <button
                            onClick={() => setChangePassword(true)}
                            className="btn btn-light btn-active-light-primary"
                          >
                            Changer Mot De Passe
                          </button>
                        </div>
                      ) : (
                        <>
                          <label className="col-lg-4 col-form-label required fw-bold fs-6 fadein">
                            Mot de passe
                          </label>
                          <div className="col-lg-8 fadein">
                            <div className="row">
                              <div className="col-lg-6 fv-row">
                                <Field
                                  type="password"
                                  name="password"
                                  value={values.password}
                                  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                                  placeholder="Mot de passe"
                                />
                                {errors.password && touched.password ? (
                                  <div className="text-danger">
                                    {errors.password}
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-lg-6 fv-row">
                                <Field
                                  name="passwordConfirm"
                                  value={values.passwordConfirm}
                                  type="password"
                                  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                                  placeholder="Confirmer mot de passe"
                                />
                                {errors.passwordConfirm &&
                                touched.passwordConfirm ? (
                                  <div className="text-danger">
                                    {errors.passwordConfirm}
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-lg-6 fv-row"></div>
                            </div>
                          </div>
                          <div className="">
                            <button
                              onClick={() => setChangePassword(false)}
                              className="btn btn-color-gray-400 btn-active-light-primary px-6"
                            >
                              Annuler
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Roles
                      </label>
                      <div className="col-lg-8 fv-row">
                        <div className="d-flex align-items-center mt-3">
                          <label className="form-check form-check-inline form-check-solid me-5">
                            <Field
                              name="roles"
                              value="ROLE_ADMIN"
                              type="checkbox"
                              className="form-check-input"
                            />
                            <span className="fw-bold ps-2 fs-6">
                              Administrateur
                            </span>
                          </label>
                          <label className="form-check form-check-inline form-check-solid me-5">
                            <Field
                              name="roles"
                              value="ROLE_MEMBER"
                              type="checkbox"
                              className="form-check-input"
                            />
                            <span className="fw-bold ps-2 fs-6">
                              Membre Projet
                            </span>
                          </label>
                          <label className="form-check form-check-inline form-check-solid me-5">
                            <Field
                              name="roles"
                              value="ROLE_MANAGER"
                              type="checkbox"
                              className="form-check-input"
                            />
                            <span className="fw-bold ps-2 fs-6">
                              Chef De Projet
                            </span>
                          </label>
                        </div>
                        {errors.roles && touched.roles ? (
                          <div className="text-danger mt-4">{errors.roles}</div>
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
