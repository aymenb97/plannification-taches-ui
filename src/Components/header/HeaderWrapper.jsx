import React from "react";
import clsx from "clsx";
import { toAbsoluteUrl } from "../../Helpers/AssetHelper";
import { Header } from "./Header";
export function HeaderWrapper() {
  return (
    <div
      id="kt_header"
      className={clsx(
        "header",

        "align-items-stretch"
      )}
    >
      <div
        className={clsx("d-flex align-items-stretch justify-content-between")}
      >
        {/* begin::Logo */}
        {true && (
          <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
            <div to="/dashboard" className="d-lg-none">
              <img
                alt="Logo"
                src={toAbsoluteUrl("/media/logos/logo-2.svg")}
                className="h-30px"
              />
            </div>
          </div>
        )}
        {/* end::Logo */}

        {true && (
          <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
            <div to="/" className="d-lg-none">
              <img
                alt="Logo"
                src={toAbsoluteUrl("/media/logos/logo-2.svg")}
                className="h-30px"
              />
            </div>
          </div>
        )}

        {/* begin::Wrapper */}
        <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
          {/* begin::Navbar */}
          {true && (
            <div className="d-flex align-items-stretch" id="kt_header_nav">
              <Header />
            </div>
          )}

          {true && (
            <div className="d-flex align-items-center" id="kt_header_nav">
              {/* <DefaultTitle />   */}
            </div>
          )}

          <div className="d-flex align-items-stretch flex-shrink-0">
            {/*<Topbar />*/}
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  );
}