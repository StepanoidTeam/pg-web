import React, { useEffect } from 'react';

import { useGlobal } from '../use-global';
import { getApiVersion } from '../services/version.service';
import './version-holder.css';

const { version: webVersion } = require('../../package.json');

export default function VersionHolder() {
  const [{ apiVersion }, { setApiVersion }] = useGlobal();

  useEffect(() => {
    getApiVersion().then(apiVersion => {
      setApiVersion(apiVersion);
    });
  }, []);

  return (
    <div className="version-holder flex-column m-1 z-index-1">
      <span>web: {webVersion}</span>
      <span>🔥api: {apiVersion}</span>
    </div>
  );
}
