import * as React from "react";
export interface IApplicationProps {
    requestUrl: string;
}
export class Application extends React.Component<IApplicationProps, {}> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.title = "Yeelight Hauptseite";
        console.log("Yewelight componentDidMount");
    }
    render() {
        console.log("Yewelight render");
        return <h1>Hello from Yeelight!<br />Your requested url is {this.props.requestUrl}</h1>;
    }
}