import React, { useEffect } from "react";
import ChatMembers from "../../../Components/chat/ChatMembers";
import Messages from "../../../Components/chat/ChatInner";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../redux/navActions";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Switch,
} from "react-router-dom";
export default function Chat() {
  const dispatch = useDispatch();
  dispatch(setPageTitle("Messagerie"));
  useEffect(() => {}, []);
  let { path, url } = useRouteMatch();
  return (
    <div className="d-flex flex-column flex-lg-row">
      <ChatMembers />
      <Switch>
        <Route
          path={`${path}/:id`}
          component={(props) => <Messages {...props} />}
        />
      </Switch>
    </div>
  );
}
