import * as React from "react";
export interface IApplicationProps {
    requestUrl: string;
}
import debug = require("debug");
export class Application extends React.Component<IApplicationProps, {}> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.title = "Vacuum Roboter Hauptseite";
        debug("Component:Application")("Application Url: " + this.props.requestUrl);
    }
    render() {
        return <h1>Hello from Vacuum Roboter!<br />Your requested url is {this.props.requestUrl}</h1>;
    }
}