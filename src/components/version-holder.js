import React, { useState, useEffect } from "react";

import { getVersion } from "../services/version.service";

export default function VersionHolder() {
  const [hasError, setErrors] = useState(false);
  const [version, setVersion] = useState(false);

  async function fetchData() {
    getVersion()
      .then(version => setVersion(version))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  });

  getVersion();

  return (
    <div style={{ color: "white" }}>
      {version ? <span>api ver: {version}</span> : "loading..."}

      {hasError ? <span>Has error: {JSON.stringify(hasError)}</span> : null}
    </div>
  );
}
