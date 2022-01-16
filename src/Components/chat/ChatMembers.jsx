import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserMember from "./UserMember";
export default function ChatMembers() {
  return (
    <div className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0">
      <div className="card card-flush">
        <div className="card-header pt-7">
          <form className="w-100 position-relative">
            <span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y">
              <FontAwesomeIcon icon={faSearch} size="1x"></FontAwesomeIcon>
            </span>
            <input
              type="text"
              className="form-control form-control-solid px-15"
              placeholder="Search by name"
            />
          </form>
        </div>
        <div className="card-body pt-5">
          <div
            className="scroll-y me-n5 pe-5 h-200px h-lg-auto"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header"
            data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body"
            data-kt-scroll-offset="0px"
            style={{ maxHeight: "181px" }}
          >
            <UserMember id={2} name="Ayman Slk" email="test@gmail.com" />
            <UserMember name="Syman Rlk" email="test@gmail.com" />
            <UserMember name="Qyman Qlk" email="test@gmail.com" />
            <UserMember name="Vyman Flk" email="test@gmail.com" />
            <UserMember name="Ryman Blk" email="test@gmail.com" />
            <UserMember name="Eyman Rlk" email="test@gmail.com" />
            <UserMember name="Nyman Mlk" email="test@gmail.com" />
            <UserMember name="Wyman Llk" email="test@gmail.com" />
          </div>
        </div>
      </div>
    </div>
  );
}
