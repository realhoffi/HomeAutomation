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
    sensors: IBaseWeatherSensor[];
}
export class Application extends React.Component<IApplicationProps, IApplicationState> {
    constructor(props) {
        super(props);
        this.state = { sensors: [], isInitialized: false };
        this.loadDevices = this.loadDevices.bind(this);
    }
    componentDidMount() {
        document.title = "Yeelight Hauptseite";
        console.log("Yeelight componentDidMount");
        this.loadDevices().then(() => {
            this.setState({ isInitialized: true });
        });
        setInterval(this.loadDevices, 60000);
    }
    private loadDevices() {
        return Axios.get("/api/sensors").then((result) => {
            this.setState({ sensors: result.data["sensors"] });
        });
    }

    render() {
        if (!this.state.isInitialized) {
            return false;
        }
        return <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
                {
                    (!this.state.sensors || this.state.sensors.length < 1) &&
                    <h1 className="ms-font-xl ms-fontColor-themePrimary">Keine Sensoren gefunden</h1>
                }
                <div className="ms-Grid-row" >
                    {
                        (this.state.sensors && this.state.sensors.length > 0) &&
                        this.state.sensors.map((sensor, index) => {
                            return <div className="ms-Grid-col ms-sm12 ms-lg6 ms-xl3" key={"sensor_container_" + index}>
                                <BaseWeatherSensor id={index} sensorInformations={sensor} />
                            </div>;
                        })
                    }
                </div>
            </div>
        </div>;
    }
}