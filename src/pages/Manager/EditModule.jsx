import { Formik, Form, Field, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Moment from 'moment';
import Swal from "sweetalert2";
import { instanceToken as axios } from "./../../common/axiosWithAuth";
export default function Editmodule(props) {
  const [result, setResult] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState();


  const onSubmit = (values) => setResult(values);
  const validationSchema = Yup.lazy((values) => {
    
      return Yup.object().shape({
        titreModule: Yup.string().required("champ obligatoire"),
        dateDebutModule: Yup.string().required("champ obligatoire"),
        dateFinModule:Yup.string().required("champ obligatoire"),
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
      .get(`/modules/${props.match.params.id}`)
      .then((res) => {
        setInitialValues({
          titreModule: res.data.titreModule,
          dateDebutModule: Moment(res.data.dateDebutModule).format('YYYY-MM-DD'),
          dateFinModule: Moment(res.data.dateFinModule).format('YYYY-MM-DD'),
        });
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
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
              <h3 className="fw-bolder m-0">{`Modifier information pour le module "${initialValues.titreModule}"`}</h3>
            </div>
          </div>
          <div id="kt_account_profile_details" className="collapse show fadein">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                axios
                  .put(`/modules/${props.match.params.id}`, values)
                  .then((res) => {
                    console.log(res.data);
                    setSubmitting(false);
                    props.history.push("/gerer-modules");
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
                            <div className="text-danger">{errors.titreModule}</div>
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
                          <div className="text-danger">{errors.dateDebutModule}</div>
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
                          <div className="text-danger">{errors.dateFinModule}</div>
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
