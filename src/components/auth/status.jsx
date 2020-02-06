import React, { useEffect } from "react";

import { getStatus } from "../../services/auth.service";

import "./status.css";
import { useGlobal } from "../../use-global";
import { useHistory } from "react-router-dom";

export default function Status() {
  const history = useHistory();
  const [
    { authToken, isAuthenticated, user },
    { setUserData, clearUserData }
  ] = useGlobal();

  useEffect(() => {
    authToken &&
      !isAuthenticated &&
      getStatus(authToken)
        .then(data => {
          setUserData(data);

          //if user in room - redirect
          if (data.GameRoomId) {
            history.push(`rooms/${encodeURIComponent(data.GameRoomId)}`);
          }
        })
        .catch(clearUserData);
  }, []);

  return (
    <div className="status flex-column align-end p-1">
      {isAuthenticated ? (
        <div className="flex-row align-center">
          <div className="flex-row align-center mx-2">
            <i className="material-icons px-1">face</i>
            <span>{user.name}</span>
          </div>

          <button
            className="button flex-row align-center px-3"
            onClick={clearUserData}
          >
            <span> log out</span>
            <i className="material-icons">exit_to_app</i>
          </button>
        </div>
      ) : (
        <div>unauthorized</div>
      )}
    </div>
  );
}
