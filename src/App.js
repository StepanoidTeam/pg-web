import React, { useState, useEffect } from "react";
import cx from "classnames";

import logo from "./assets/pg-icon.svg";
import "./App.css";
import VersionHolder from "./components/version-holder";
import { getVersion } from "./services/version.service";

export default function App() {
  const [isOnline, setOnline] = useState(false);

  useEffect(() => {
    getVersion().then(() => setOnline(true));
  });

  return (
    <div className={cx("app", { "is-online": isOnline })}>
      <img src={logo} className="app-logo" alt="logo" />

      <VersionHolder />
    </div>
  );
}
