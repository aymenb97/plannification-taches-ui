import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export function Toolbar(props) {
  const navLink = useSelector((state) => state.nav.navLink);
  const navTitle = useSelector((state) => state.nav.navTitle);
  return (
    <div id="kt_toolbar_container" class="container-fluid d-flex flex-stack">
      <div
        id="kt_page_title"
        data-kt-swapper="true"
        data-kt-swapper-mode="prepend"
        data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
        class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0"
      >
        <h1 class="d-flex h-40px align-items-center text-dark fw-bolder my-1 fs-3">
          {props.title}
        </h1>

        {navLink && (
          <>
            <span className="h-20px border-gray-200 border-start mx-4"></span>
            <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
              <Link to={`/${navLink}`}>
                <li className="text-muted text-hover-primary cursor-pointer">
                  {navTitle}
                </li>
              </Link>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
