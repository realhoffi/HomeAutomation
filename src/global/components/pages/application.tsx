import * as React from "react";
import { Route, Switch, Link } from "react-router-dom";

import { Application as YeelightApplication } from "../../../projects/yeelight/components/pages/application";
import { Application as VacuumApplication } from "../../../projects/vacuumRoboter/components/pages/application";
import { Application as AldiApplication } from "../../../projects/aldi/components/pages/application";
import { NotFoundPage } from "../../components/simple/NotFoundPage";

export interface IApplicationProps {
    requestUrl: string;
}
export class Application extends React.PureComponent<IApplicationProps, {}> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("componentDidMount Application");
    }
    render() {
        return <h1>Hello from Root!<br />Your requested url is {this.props.requestUrl}</h1>;
    }
}