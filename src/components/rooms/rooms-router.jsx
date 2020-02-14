import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import RoomsList from './rooms-list';
import CurrentRoom from './current-room';
import NewRoom from './new-room';

export default function RoomsIndex() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <RoomsList />
      </Route>
      <Route path={`${path}/new`}>
        <NewRoom />
      </Route>
      <Route path={`${path}/:_roomId`}>
        <CurrentRoom />
      </Route>
    </Switch>
  );
}
