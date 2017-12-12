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
    gateways: IGatewayModel[];
    gatewayLights: ILightModel[];
}
export class Application extends React.Component<IApplicationProps, IApplicationState> {
    constructor(props) {
        super(props);
        this.state = { gateways: [], gatewayLights: [], isInitialized: false };
        this.loadDevices = this.loadDevices.bind(this);
        this.reloadGatewayInformations = this.reloadGatewayInformations.bind(this);
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
        return Axios.get("/api/gateways").then((results) => {
            let gws: IGatewayModel[] = results.data["gateways"];
            let gwLights: ILightModel[] = gws.map(this.mapGatewayToLightModel);
            this.setState({ gateways: gws, gatewayLights: gwLights });
        }).catch((error) => { });
    }
    private mapGatewayToLightModel(gwModel: IGatewayModel): ILightModel {
        return {
            id: gwModel.id,
            ip: gwModel.ip,
            power: gwModel.power,
            brightness: gwModel.brightness,
            name: gwModel.name,
            colorTemperature: gwModel.illuminance,
            rgb: gwModel.rgb
        } as ILightModel;
    }
    private reloadGatewayInformations() {
        Axios.get("/api/gateways").then((result) => {
            let gateways = result.data.gateways;
            let gwLights: ILightModel[] = gateways.map(this.mapGatewayToLightModel);
            this.setState({ gateways: gateways, gatewayLights: gwLights });
        });
    }

    render() {
        if (!this.state.isInitialized) {
            return false;
        }
        console.log("Yewelight render");
        return <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
                {
                    (!this.state.gatewayLights || this.state.gatewayLights.length < 1) &&
                    <h1 className="ms-font-xl ms-fontColor-themePrimary">Keine Gateways gefunden</h1>
                }
                <div className="ms-Grid-row" >
                    {
                        (this.state.gatewayLights && this.state.gatewayLights.length > 0) &&
                        this.state.gatewayLights.map((gw, index) => {
                            return <div className="ms-Grid-col ms-sm12 ms-lg6 ms-xl3" key={"gwr_" + index}>
                                <BaseLight lightInformation={gw}
                                    id={index}
                                    onBrightnessChanged={(lightInformation: ILightModel, brightness: number) => {
                                        Axios.post("/api/gateways/" + lightInformation.id + "/brightness/" + brightness)
                                            .then(this.reloadGatewayInformations);
                                    }}
                                    onColorChanged={(lightInformation: ILightModel, color: IRGBColor) => {
                                        Axios.post("/api/gateways/" + lightInformation.id + "/color", { color })
                                            .then(this.reloadGatewayInformations);
                                    }}
                                    onColorSchemaChanged={(lightInformation: ILightModel, color: IRGBColor, brightness: number) => {
                                        Axios.post("/api/gateways/" + lightInformation.id + "/color", { color })
                                            .then(() => {
                                                return Axios.post("/api/gateways/" + lightInformation.id + "/brightness/" + brightness);
                                            })
                                            .then(this.reloadGatewayInformations);
                                    }}
                                    onPowerChanged={(lightInformation: ILightModel) => {
                                        Axios.post("/api/gateways/" + lightInformation.id + "/power")
                                            .then(this.reloadGatewayInformations);
                                    }} />
                            </div>;
                        })
                    }
                </div>
            </div>
        </div>;
    }
}