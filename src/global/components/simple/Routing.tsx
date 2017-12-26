import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";
export interface IRedirectWithStatusProps {
  from: string;
  to: string;
  status: any;
}
export class RedirectWithStatus extends React.Component<
  IRedirectWithStatusProps,
  {}
> {
  render() {
    return (
      <Route
        render={({ staticContext }) => {
          if (staticContext) {
            staticContext.status = this.props.status;
          }
          return <Redirect from={this.props.from} to={this.props.to} />;
        }}
      />
    );
  }
}
export interface IStatusProps {
  code: number;
}
export class Status extends React.Component<IStatusProps, {}> {
  render() {
    return (
      <Route
        render={({ staticContext }) => {
          if (staticContext) {
            staticContext.status = this.props.code;
          }
          return this.props.children;
        }}
      />
    );
  }
}
