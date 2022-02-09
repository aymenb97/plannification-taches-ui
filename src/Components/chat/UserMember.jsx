import { useRouteMatch } from "react-router-dom";
import React from "react";
import { UserCircle } from "../UserCircle";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function UserMember(props) {
  let { path, url } = useRouteMatch();

  return (
    <Link to={`${url}/${props.id}`}>
      <div className="d-flex flex-stack px-1 cursor-pointer py-4 m-1 rounded hoverable-element">
        <div className="d-flex align-items-center ">
          <UserCircle name={props.name} />
          <div className="ms-5">
            <span className="fs-5 fw-bolder text-gray-900 mb-2">
              {props.name}
            </span>
            <div className="fw-bold text-gray-400">{props.email}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
