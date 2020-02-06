import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import RoomsList from "./rooms-list";
import CurrentRoom from "./current-room";

export default function RoomsIndex() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <RoomsList />
      </Route>
      <Route path={`${path}/new`}>
        <div className="form">new room here</div>
      </Route>
      <Route path={`${path}/:_roomId`}>
        <CurrentRoom />
      </Route>
    </Switch>
  );
}
