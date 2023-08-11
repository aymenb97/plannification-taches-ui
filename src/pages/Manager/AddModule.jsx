import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import { propTypes } from "react-bootstrap-v5/lib/esm/Image";
import * as Yup from "yup";
import { instanceToken as axios } from "./../../common/axiosWithAuth";
export default function AddModule(props) {
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

  const addMangerSchema = Yup.object().shape({
    titreModule: Yup.string().required("champ obligatoire"),
    dateDebutModule: Yup.string().required("champ obligatoire"),
    dateFinModule: Yup.string().required("champ obligatoire"),
  });
  const [value, setValue] = useState(0);

  return (
    <div className="card mb-5 mb-xl-10 fadein">
      <div className="card-header border-0 cursor-pointer">
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Ajouter Module</h3>
        </div>
      </div>
      <div id="kt_account_profile_details" className="collapse show">
        <Formik
          initialValues={{
            titreModule: "",
            dateDebutModule: "",
            dateFinModule: "",
          }}
          validationSchema={addMangerSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            axios
              .post("/modules", values)
              .then((res) => {
                setSubmitting(false);
                props.history.push("/gerer-modules");
                Swal.fire({
                  position: "center-center",
                  icon: "success",
                  title: "Ajout effectué avec succes",
                  showConfirmButton: false,
                  timer: 1500,
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
                    Titre module
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 fv-row">
                        <Field
                          type="text"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          name="titreModule"
                          value={values.titreModule}
                          placeholder="Titre module"
                        />
                        {errors.titreModule && touched.titreModule ? (
                          <div className="text-danger">
                            {errors.titreModule}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Date début module
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 fv-row">
                        <Field
                          type="date"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder=""
                          name="dateDebutModule"
                          value={values.dateDebutModule}
                        />
                        {errors.dateDebutModule && touched.dateDebutModule ? (
                          <div className="text-danger">
                            {errors.dateDebutModule}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Date fin module
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 fv-row">
                        <Field
                          type="date"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder=""
                          name="dateFinModule"
                          value={values.dateFinModule}
                        />
                        {errors.dateFinModule && touched.dateFinModule ? (
                          <div className="text-danger">
                            {errors.dateFinModule}
                          </div>
                        ) : null}
                      </div>
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
