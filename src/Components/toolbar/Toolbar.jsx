import React from "react";

export function Toolbar(props) {
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
      </div>
    </div>
  );
}
