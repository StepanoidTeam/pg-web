import React, { useEffect } from "react";

import { getStatus } from "../../services/auth.service";

import "./status.css";
import { useGlobal } from "../../use-global";

export default function Status() {
  const [
    { AuthToken, isAuthenticated, user },
    { setUserData, clearUserData }
  ] = useGlobal();

  useEffect(() => {
    AuthToken &&
      getStatus(AuthToken)
        .then(setUserData)
        .catch(clearUserData);
  }, []);

  return (
    <div className="status flex-column align-end p-1">
      {isAuthenticated ? (
        <div className="flex-row align-center">
          <span>{user.Name}</span>
          <span style={{ color: "black" }}>{user.Id}</span>
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
