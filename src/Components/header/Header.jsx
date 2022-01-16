import React, { useEffect, useState, useRef } from "react";
import { toAbsoluteUrl } from "../../Helpers/AssetHelper";
import { Link } from "react-router-dom";
import { UserCircle } from "../UserCircle";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../redux/actions";
import clsx from "clsx";
export function Header() {
  const ref = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.name);
  const surname = useSelector((state) => state.auth.surname);
  const email = useSelector((state) => state.auth.email);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showMenu && ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showMenu]);
  return (
    <div ref={ref} className="d-flex align-items-stretch flex-shrink-0">
      <div className="d-flex align-items-center ms-1 ms-lg-3">
        <div className="d-flex align-items-center ms-1 ms-lg-3">
          <div
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="cursor-pointer symbol  symbol-md-40px"
          >
            <UserCircle name={name + " " + surname} />
          </div>
          <div
            className={clsx(
              "menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px",
              showMenu && "show"
            )}
            style={{
              zIndex: "105",
              position: "fixed",
              inset: "0px auto auto 0px",
              margin: "0px",
              transform: "translate(1214px, 65px)",
            }}
            data-popper-placement="bottom-end"
          >
            <div className="menu-item px-3">
              <div className="menu-content d-flex align-items-center px-3">
                <div className="symbol-50px me-5">
                  <UserCircle name={name + " " + surname} />
                </div>
                <div className="d-flex flex-column">
                  <div className="fw-bolder d-flex align-items-center fs-5">
                    {name + " " + surname}
                  </div>
                  <a
                    href={"mailto:" + email}
                    className="fw-bold text-muted text-hover-primary fs-7"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
            <div className="separator my-2"></div>
            <div className="menu-item px-5">
              <Link to="/mon-profil">
                <span className="menu-link px-5">Mon Profil</span>
              </Link>
            </div>
            <div className="menu-item px-5">
              <Link to="/chat">
                <span className="menu-link px-5">Messages</span>
              </Link>
            </div>
            <div className="menu-item px-5">
              <span
                onClick={() => {
                  dispatch(authLogout());
                }}
                className="menu-link px-5"
              >
                Se Déconnecter
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
