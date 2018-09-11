import * as React from "react";
import Axios from "axios";
import { ILightModel, IRGBColor, IGatewayModel } from "../../../../interfaces/xiaomi";
import { BaseLight } from "../../../../global/components/simple/BaseLight";
import { setInterval } from "timers";
export interface IApplicationProps {}
export interface IApplicationState {
  isInitialized: boolean;
  gateways: IGatewayModel[];
  gatewayLights: ILightModel[];
  intervalId: undefined;
}
export class Application extends React.Component<IApplicationProps, IApplicationState> {
  private isMountedFinished = false;
  constructor(props) {
    super(props);
    this.state = {
      gateways: [],
      gatewayLights: [],
      isInitialized: false,
      intervalId: undefined
    };
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
    let interval = setInterval(this.loadDevices, 30000);
    this.setState({ intervalId: interval["_id"] });
    this.isMountedFinished = true;
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    this.isMountedFinished = false;
  }
  private loadDevices() {
    if (!this.isMountedFinished) {
      Promise.resolve();
    }
    return Axios.get("/api/gateways")
      .then(results => {
        let gws: IGatewayModel[] = results.data["gateways"];
        let gwLights: ILightModel[] = gws.map(this.mapGatewayToLightModel);
        this.setState({ gateways: gws, gatewayLights: gwLights });
      })
      .catch(error => {});
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
  render() {
    if (!this.state.isInitialized) {
      return false;
    }
    console.log("Yewelight render");
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          {(!this.state.gatewayLights || this.state.gatewayLights.length < 1) && <h1 className="ms-font-xl ms-fontColor-themePrimary">Keine Gateways gefunden</h1>}
          <div className="ms-Grid-row">
            {this.state.gatewayLights &&
              this.state.gatewayLights.length > 0 &&
              this.state.gatewayLights.map((gw, index) => {
                return (
                  <div className="ms-Grid-col ms-sm12 ms-lg6 ms-xl3" key={"gwr_" + index}>
                    <BaseLight
                      lightInformation={gw}
                      id={index}
                      onBrightnessChanged={(lightInformation: ILightModel, brightness: number) => {
                        Axios.post("/api/gateways/" + lightInformation.id + "/brightness/" + brightness).then(this.loadDevices);
                      }}
                      onColorChanged={(lightInformation: ILightModel, color: IRGBColor) => {
                        Axios.post("/api/gateways/" + lightInformation.id + "/color", { color }).then(this.loadDevices);
                      }}
                      onColorSchemaChanged={(lightInformation: ILightModel, color: IRGBColor, brightness: number) => {
                        Axios.post("/api/gateways/" + lightInformation.id + "/color", { color })
                          .then(() => {
                            return Axios.post("/api/gateways/" + lightInformation.id + "/brightness/" + brightness);
                          })
                          .then(this.loadDevices);
                      }}
                      onPowerChanged={(lightInformation: ILightModel) => {
                        Axios.post("/api/gateways/" + lightInformation.id + "/power").then(this.loadDevices);
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
