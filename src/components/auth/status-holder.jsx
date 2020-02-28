import React from 'react';

import { logOut } from '../../services/auth.service';
import { useGlobal } from '../../use-global';

import './status-holder.css';

export default function StatusHolder() {
  const [{ user }, {}] = useGlobal();

  return (
    <div className="status-holder flex-column align-end p-1 z-index-1">
      {user ? (
        <div className="flex-row align-center">
          <div className="flex-row align-center mx-2">
            <i className="material-icons px-1">face</i>
            <span>{user.name}</span>
          </div>

          <button
            className="button flex-row align-center px-3"
            onClick={logOut}
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
