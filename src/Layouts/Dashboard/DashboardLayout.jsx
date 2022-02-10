import React from "react";
import { HeaderWrapper } from "../../Components/header/HeaderWrapper";
import { Toolbar } from "../../Components/toolbar/Toolbar";
import { useSelector } from "react-redux";
import { toAbsoluteUrl } from "../../Helpers/AssetHelper";
export function DashboardLayout(props) {
  const pageTitle = useSelector((state) => state.nav.pageTitle);
  return (
    <>
      <div className="page d-flex flex-row flex-column-fluid">
        <div
          id="kt_aside"
          className="aside aside-dark aside-hoverable"
          data-kt-drawer="true"
          data-kt-drawer-name="aside"
          data-kt-drawer-activate="{default: true, lg: false}"
          data-kt-drawer-overlay="true"
          data-kt-drawer-width="{default:'200px', '300px': '250px'}"
          data-kt-drawer-direction="start"
          data-kt-drawer-toggle="#kt_aside_mobile_toggle"
        >
          {/* begin::Brand */}
          <div
            className="aside-logo bg-danger flex-column-auto text-center"
            id="kt_aside_logo"
          >
            <img
              className="text-start-0"
              width="220px"
              src={toAbsoluteUrl("/media/logos/logo.svg")}
              alt=""
            />
          </div>
          {/* end::Brand */}

          {/* begin::Aside menu */}
          <div className="aside-menu flex-column-fluid">{props.aside}</div>
          {/* end::Aside menu */}

          {/* begin::Footer */}
          <div
            className="aside-footer flex-column-auto pt-5 pb-7 px-5"
            id="kt_aside_footer"
          >
            <span className="text-white"></span>
          </div>
          {/* end::Footer */}
        </div>
        <div className="wrapper d-flex flex-column flex-row-fluid">
          <HeaderWrapper />
          <div
            id="kt_content"
            className="content d-flex flex-column flex-column-fluid"
          >
            <div className="toolbar">
              <Toolbar title={pageTitle} />
            </div>
            <div className="post d-flex flex-column-fluid">
              <div className="container">{props.content}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
