import React from "react";
import { $apiVersion } from "../services/version.service";

export default class VersionHolder extends React.Component {
  constructor(props) {
    super(props);

    $apiVersion
      .then(version => {
        console.log(version);
        this.setState({ version });
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
      version: null
    };
  }

  render() {
    const { version, hasError, isLoading } = this.state;

    return (
      <div style={{ color: "white" }}>
        {isLoading && <span>loading...</span>}
        {!isLoading && version && <span>api ver: {version}</span>}

        {hasError ? <span>Has error: {JSON.stringify(hasError)}</span> : null}
      </div>
    );
  }
}
