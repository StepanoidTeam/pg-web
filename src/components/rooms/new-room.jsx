import React from 'react';
import { Link } from 'react-router-dom';

export default function NewRoom() {
  return (
    <div className="form flex-column p-2">
      <h1 className="flex-row mx-2">
        <span className="fill-left">create room</span>
      </h1>

      <div className="flex-row align-center">
        <Link to="/rooms">
          <button className="button mx-1">quit</button>
        </Link>
        <div className="fill-left"></div>

        <button className="button mx-1">create room</button>
      </div>
    </div>
  );
}
