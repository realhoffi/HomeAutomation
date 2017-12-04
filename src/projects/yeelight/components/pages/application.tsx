import * as React from "react";
import { Toggle } from "office-ui-fabric-react";
import Axios from "axios";
import { Gateway } from "../gateway";
import { IGatewayModel, IGatewayColor } from "../../../../models/gateway";
export interface IApplicationProps {
    requestUrl: string;
}
export interface IApplicationState {
    gateways: any[];
}
export class Application extends React.Component<IApplicationProps, IApplicationState> {
    constructor(props) {
        super(props);
        this.state = { gateways: [] };
        this.setNewGateWayInformations = this.setNewGateWayInformations.bind(this);
    }
    componentDidMount() {
        document.title = "Yeelight Hauptseite";
        console.log("Yeelight componentDidMount");
        Axios.get("/api/gateways").then((data) => {
            // debugger;
            this.setState({ gateways: data.data.gateways });
        });
    }
    private getGatewayIndexBySid(sid: string): number {
        let currentGatewayIndex = -1;
        let i = this.state.gateways.find((gw, index) => {
            currentGatewayIndex = index;
            return gw.sid === sid;
        });
        return currentGatewayIndex;
    }
    private setNewGateWayInformations(currentGatewayInformation: IGatewayModel, newGatewayInformation: IGatewayModel) {
        let index = this.getGatewayIndexBySid(currentGatewayInformation.sid);
        if (index < 0) {
            return;
        }
        let newState = { ...this.state };
        newState.gateways[index] = newGatewayInformation;
        this.setState(newState);
    }
    render() {
        console.log("Yewelight render");

        return <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
                <h1>Hello from Yeelight!<br />Your requested url is {this.props.requestUrl}</h1>
            </div>
            {
                this.state.gateways.map((gw, index) => {
                    return <div className="ms-Grid-row" key={"gwr_" + index}>
                        <div className="ms-Grid-col ms-sm12">
                            <Gateway gatewayInformation={gw}
                                id={index}
                                onColorChanged={this.setNewGateWayInformations}
                                onIntensityChanged={this.setNewGateWayInformations}
                                onPowerChanged={this.setNewGateWayInformations}
                                onColorSchemaChanged={this.setNewGateWayInformations} />
                        </div>
                    </div>;
                })
            }
        </div>;
    }
}