import React, { useEffect } from "react";

import { getStatus } from "../../services/auth.service";

import "./status.css";
import { useGlobal } from "../../use-global";

export default function Status() {
  const [
    { AuthToken, counter, isAuthenticated, user },
    { addToCounter, setUserData, clearUserData }
  ] = useGlobal();

  useEffect(() => {
    getStatus(AuthToken)
      .then(setUserData)
      .catch(clearUserData);
  }, [AuthToken]);

  console.log(isAuthenticated, user);

  return (
    <div className="status flex-column align-end">
      {isAuthenticated && (
        <button className="button px-3" onClick={clearUserData}>
          log out
        </button>
      )}
      {isAuthenticated && <span>{user.Name}</span>}
      <span>{AuthToken}</span>

      {/* //debug */}
      <button className="button px-3" onClick={() => addToCounter(1)}>
        +{counter} to global
      </button>
    </div>
  );
}
