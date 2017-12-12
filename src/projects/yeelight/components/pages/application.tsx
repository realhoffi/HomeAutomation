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
    lights: ILightModel[];
}
export class Application extends React.Component<IApplicationProps, IApplicationState> {
    private ival;
    private isMountedFinished = false;
    constructor(props) {
        super(props);
        this.state = { lights: [], isInitialized: false };

        this.colorChangedOnLight = this.colorChangedOnLight.bind(this);
        this.powerChangedOnLight = this.powerChangedOnLight.bind(this);
        this.colorSchemaChangedOnLight = this.colorSchemaChangedOnLight.bind(this);
        this.brightnessChangedOnLight = this.brightnessChangedOnLight.bind(this);
        this.reloadLightInformations = this.reloadLightInformations.bind(this);
        this.loadDevices = this.loadDevices.bind(this);
    }
    componentDidMount() {
        document.title = "Yeelight Hauptseite";
        console.log("Yeelight componentDidMount");
        this.loadDevices().then(() => {
            if (this.isMountedFinished === true) {
                this.setState({ isInitialized: true });
            }
        });
        this.ival = setInterval(this.loadDevices, 30000);
        this.isMountedFinished = true;
    }
    componentWillUnmount() {
        clearInterval(this.ival);
        this.isMountedFinished = false;
    }
    private loadDevices() {
        return Axios.get("/api/lights/details")
            .then((results) => {
                if (this.isMountedFinished === true) {
                    this.setState({ lights: results.data["lights"] });
                }
            })
            .catch((error) => { });
    }

    private reloadLightInformations() {
        Axios.get("/api/lights/details").then((result) => {
            this.setState({ lights: result.data.lights });
            let newState = { ...this.state };
        });
    }
    private colorChangedOnLight(lightInformation: ILightModel, color: IRGBColor) {
        let rgb = (color.r * 65536) + (color.g * 256) + color.b;
        Axios.post("/api/lights/" + lightInformation.id + "/color/" + rgb)
            .then(this.reloadLightInformations);
    }
    private powerChangedOnLight(lightInformation: ILightModel) {
        Axios.post("/api/lights/" + lightInformation.id + "/power")
            .then(this.reloadLightInformations);
    }
    private colorSchemaChangedOnLight(lightInformation: ILightModel, color: IRGBColor, brightness: number) {
        let rgb = (color.r * 65536) + (color.g * 256) + color.b;
        Promise.all([
            Axios.post("/api/lights/" + lightInformation.id + "/brightness/" + brightness),
            Axios.post("/api/lights/" + lightInformation.id + "/color/" + rgb)
        ]).then(this.reloadLightInformations);
    }
    private brightnessChangedOnLight(lightInformation: ILightModel, brightness: number) {
        Axios.post("/api/lights/" + lightInformation.id + "/brightness/" + brightness)
            .then(this.reloadLightInformations);
    }
    render() {
        if (!this.state.isInitialized) {
            return false;
        }
        console.log("Yewelight render");
        return <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
                {
                    (!this.state.lights || this.state.lights.length < 1) &&
                    <h1 className="ms-font-xl ms-fontColor-themePrimary">Keine Lampen gefunden</h1>
                }
                <div className="ms-Grid-row" >
                    {
                        (this.state.lights && this.state.lights.length > 0) &&
                        this.state.lights.map((light, index) => {
                            return <div className="ms-Grid-col ms-sm12 ms-lg6 ms-xl3" key={"light_container_" + index}>
                                <BaseLight lightInformation={light}
                                    id={index}
                                    onBrightnessChanged={this.brightnessChangedOnLight}
                                    onColorChanged={this.colorChangedOnLight}
                                    onColorSchemaChanged={this.colorSchemaChangedOnLight}
                                    onPowerChanged={this.powerChangedOnLight} />
                            </div>;
                        })
                    }
                </div>
            </div>
        </div>;
    }
}