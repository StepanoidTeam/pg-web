import React, { useEffect } from "react";

import { useGlobal } from "../use-global";
import { getApiVersion } from "../services/version.service";
import "./version-holder.css";

const { version: webVersion } = require("../../package.json");

export default function VersionHolder() {
  const [{ apiVersion }, { setApiVersion, setOnline }] = useGlobal();

  useEffect(() => {
    getApiVersion().then(apiVersion => {
      setApiVersion(apiVersion);
      setOnline(true);
    });
  }, []);

  return (
    <div className="version-holder flex-column m-1">
      <span>web: {webVersion}</span>
      <span>api: {apiVersion}</span>
    </div>
  );
}
