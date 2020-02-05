import React from "react";
import { $apiVersion } from "../services/version.service";

import "./version-holder.css";

const { version: webVersion } = require("../../package.json");
export default class VersionHolder extends React.Component {
  constructor(props) {
    super(props);

    $apiVersion
      .then(apiVersion => {
        console.log(apiVersion);
        this.setState({ apiVersion });
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ hasError: err });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });

    this.state = {
      isLoading: true,
      hasError: null,
      apiVersion: null,
      webVersion
    };
  }

  render() {
    const { apiVersion, hasError, isLoading } = this.state;

    return (
      <div className="version-holder flex-column m-1">
        {<span>web: {webVersion}</span>}
        {isLoading && <span>loading...</span>}
        {!isLoading && apiVersion && <span>api: {apiVersion}</span>}

        {hasError ? <span>Has error: {JSON.stringify(hasError)}</span> : null}
      </div>
    );
  }
}
