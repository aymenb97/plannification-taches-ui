import React, { useState } from "react";
import * as action from "../../redux/actionTypes";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import clsx from "clsx";
import { toAbsoluteUrl } from "../../Helpers/AssetHelper";
import { set } from "harmony-reflect";
import { auth } from "../../redux/actions";
const initialValues = { email: "", password: "" };
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Veuillez saisir un email valide")
    .required("Veuillez saisir votre email"),
  password: Yup.string().required("Veuillez saisir votre mot de passe"),
});
export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      dispatch(auth(values.email, values.password));
    },
  });

  return (
    <div
      className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
      style={{
        backgroundImage: `url(${toAbsoluteUrl(
          "/media/illustrations/sketchy-1/14.png"
        )})`,
      }}
    >
      {/* begin::Content */}
      <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20 vh-100">
        {/* begin::Logo 
        <a href='#' className='mb-12'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo-1.svg')} className='h-45px' />
        </a>
         end::Logo */}
        {/* begin::Wrapper */}
        <div className="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
          <form
            className="form w-100"
            onSubmit={formik.handleSubmit}
            noValidate
            id="kt_login_signin_form"
          >
            {/* begin::Heading */}
            <div className="text-center mb-10">
              <h1 className="text-dark mb-3">Authentifier Vous</h1>
            </div>
            {/* begin::Heading */}

            {error ? (
              <div className="mb-lg-15 alert alert-danger">
                <div className="alert-text font-weight-bold">
                  {error.message}
                </div>
              </div>
            ) : null}

            {/* begin::Form group */}
            <div className="fv-row mb-10">
              <label className="form-label fs-6 fw-bolder text-dark">
                Email
              </label>
              <input
                placeholder="Email"
                {...formik.getFieldProps("email")}
                className={clsx(
                  "form-control form-control-lg form-control-solid",
                  { "is-invalid": formik.touched.email && formik.errors.email },
                  {
                    "is-valid": formik.touched.email && !formik.errors.email,
                  }
                )}
                type="email"
                name="email"
                autoComplete="off"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group */}
            <div className="fv-row mb-10">
              <div className="d-flex justify-content-between mt-n5">
                <div className="d-flex flex-stack mb-2">
                  {/* begin::Label */}
                  <label className="form-label fw-bolder text-dark fs-6 mb-0">
                    Mot de passe
                  </label>
                  {/* end::Label */}
                  {/* begin::Link 
                  <Link
                    to="/auth/forgot-password"
                    className="link-primary fs-6 fw-bolder"
                    style={{ marginLeft: "5px" }}
                  >
                    Forgot Password ?
                  </Link>
                   end::Link */}
                </div>
              </div>
              <input
                type="password"
                autoComplete="off"
                {...formik.getFieldProps("password")}
                className={clsx(
                  "form-control form-control-lg form-control-solid",
                  {
                    "is-invalid":
                      formik.touched.password && formik.errors.password,
                  },
                  {
                    "is-valid":
                      formik.touched.password && !formik.errors.password,
                  }
                )}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.password}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group */}

            {/* begin::Action */}
            <div className="text-center">
              <button
                type="submit"
                id="kt_sign_in_submit"
                className="btn btn-lg btn-primary w-100 mb-5"
                disabled={!formik.isValid}
              >
                {!loading && (
                  <span className="indicator-label">S'authentifier</span>
                )}
                {loading && (
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                )}
              </button>
            </div>
            {/* end::Action */}
          </form>
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
    </div>
  );
}
