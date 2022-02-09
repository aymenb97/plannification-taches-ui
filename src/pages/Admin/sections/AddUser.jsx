import { Formik, Form, Field } from "formik";
import { propTypes } from "react-bootstrap-v5/lib/esm/Image";
import * as Yup from "yup";
import { instanceToken as axios } from "../../../common/axiosWithAuth";
export default function AddUser(props) {
  const digitsRegex = (value) => /^\+?(\d| )+$/.test(value);
  const addUserSchema = Yup.object().shape({
    name: Yup.string().required("Saisir Un nom"),
    surname: Yup.string().required("Saisir Un Prénom"),
    username: Yup.string().required("Saisir le nom d'utilisateur"),
    address: Yup.string().required("Saisir l'adresse"),
    email: Yup.string()
      .required("Saisir un E-mail")
      .email("Saisir une addresse e-mail valide"),
    password: Yup.string()
      .required("Saisir un mot de passe")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    phone: Yup.string()
      .required("Saisir le numéro de téléphone")
      .test("Digits only", "Saisir un numéro de téléphone valide", digitsRegex)
      .min(8, "Saisir un numéro de téléphone valide"),
    roles: Yup.array().min(1, "Sélectionner au moins un role"),
    passwordConfirm: Yup.string().test(
      "password-match",
      "Mot de passe should match",
      function (value) {
        return this.parent.password === value;
      }
    ),
  });
  return (
    <div className="card mb-5 mb-xl-10 fadein">
      <div className="card-header border-0 cursor-pointer">
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Ajouter Utilisateur</h3>
        </div>
      </div>
      <div id="kt_account_profile_details" className="collapse show">
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
            name: "",
            surname: "",
            roles: [],
            username: "",
            phone: "",
            address: "",
          }}
          validationSchema={addUserSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            axios
              .post("/users", values)
              .then((res) => {
                setSubmitting(false);
                props.history.push("/gerer-utilisateurs");
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
                          <div className="text-danger">{errors.surname}</div>
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
                          <div className="text-danger">{errors.username}</div>
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
                          <div className="text-danger">{errors.address}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Mot de passe
                  </label>
                  <div className="col-lg-8">
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
                          <div className="text-danger">{errors.password}</div>
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
                        {errors.passwordConfirm && touched.passwordConfirm ? (
                          <div className="text-danger">
                            {errors.passwordConfirm}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-lg-6 fv-row"></div>
                    </div>
                  </div>
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
                        <span className="fw-bold ps-2 fs-6">Membre Projet</span>
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
