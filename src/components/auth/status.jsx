import React, { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

import { getStatus } from "../../services/auth.service";

import "./status.css";

export default function Status() {
  const [statusText, setStatusText] = useState("loading...");

  useEffect(() => {
    console.log("status hook");
    getStatus()
      .then(data => {
        console.log(data);

        setStatusText("logged");
      })
      .catch(data => {
        console.log(data);
        setStatusText("unauthorized");
      });
  }, []);

  return <div className="status">{statusText}</div>;
}
