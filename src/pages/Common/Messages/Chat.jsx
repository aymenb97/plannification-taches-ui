import React from "react";
import ChatMembers from "../../../Components/chat/ChatMembers";
import Messages from "../../../Components/chat/ChatInner";

import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Switch,
} from "react-router-dom";
export default function Chat() {
  let { path, url } = useRouteMatch();
  return (
    <div className="d-flex flex-column flex-lg-row">
      <ChatMembers />
      <Switch>
        <Route path={`${path}/:id`} component={Messages} />
      </Switch>
    </div>
  );
}
