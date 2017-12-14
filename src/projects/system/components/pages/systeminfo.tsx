import * as React from "react";
import { Toggle } from "office-ui-fabric-react";
import Axios from "axios";
import { ILightModel, IRGBColor, IBaseWeatherSensor, IGatewayModel } from "../../../../models/xiaomi";
import { BaseLight } from "../../../../global/components/simple/BaseLight";
import { BaseWeatherSensor } from "../../../../global/components/simple/BaseWeatherSensor";
import { setInterval } from "timers";
const intToRGB = require("int-to-rgb");
export interface IApplicationProps {
}
export interface IApplicationState {
    isInitialized: boolean;
    systemInformation: any;
}
export class SystemInfo extends React.Component<IApplicationProps, IApplicationState> {
    private isMountedFinished = false;
    private ival;
    constructor(props) {
        super(props);
        this.state = { systemInformation: undefined, isInitialized: false };
        this.loadDevices = this.loadDevices.bind(this);
    }
    componentDidMount() {
        document.title = "System Informationen";
        console.log("SystemInfo componentDidMount");
        this.loadDevices().then(() => {
            if (this.isMountedFinished === true) {
                this.setState({ isInitialized: true });
            }
        });
        this.ival = setInterval(this.loadDevices, 10000);
        this.isMountedFinished = true;
    }
    componentWillUnmount() {
        clearInterval(this.ival);
        this.isMountedFinished = false;
    }
    private loadDevices() {
        return Axios.get("/api/system").then((result) => {
            if (this.isMountedFinished === true) {
                this.setState({ systemInformation: result.data["system"] });
            }
        });
    }

    render() {
        if (!this.state.isInitialized) {
            return false;
        }
        return <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
                {
                    (!this.state.systemInformation) &&
                    <h1 className="ms-font-xl ms-fontColor-themePrimary">Keine System-Informationen gefunden</h1>
                }
                <div className="ms-Grid-row" >
                    {
                        this.state.systemInformation &&
                        <div className="ms-Grid-col ms-sm12 ms-lg6 ms-xl3" key={"sysinfo_"}>
                            {
                                JSON.stringify(this.state.systemInformation)
                            }
                        </div>
                    }
                    }
                </div>
                {

                }
            </div>
        </div>;
    }
}