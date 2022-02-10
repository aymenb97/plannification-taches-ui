import React, { useEffect, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { instanceToken as axios } from "../../common/axiosWithAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserMember from "./UserMember";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";
export default function ChatMembers() {
  const userId = useSelector((state) => state.auth.id);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const options = {
    includeScore: false,
    keys: ["name", "surname"],
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then((res) => {
        const tUsers = res.data["hydra:member"];
        setUsers(tUsers);
        setAllUsers(tUsers);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  const searchUser = (e) => {
    if (e.target.value.trim() !== "") {
      const newUsers = [...allUsers];
      console.log(newUsers);
      const fuse = new Fuse(newUsers, options);
      const result = fuse.search(e.target.value);
      const foundUsers = result.map((i) => i.item);
      //console.log(foundUsers);
      setUsers(foundUsers);
    } else {
      setUsers([...allUsers]);
    }
  };
  return (
    <div className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0">
      <div className="card card-flush">
        <div className="card-header pt-7">
          <form className="w-100 position-relative">
            <span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y">
              <FontAwesomeIcon icon={faSearch} size="1x"></FontAwesomeIcon>
            </span>
            <input
              onChange={(e) => searchUser(e)}
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
            {users.map((user) =>
              user.id !== parseFloat(userId) ? (
                <UserMember
                  key={user.id}
                  id={user.id}
                  name={user.name + " " + user.surname}
                  email={user.email}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
