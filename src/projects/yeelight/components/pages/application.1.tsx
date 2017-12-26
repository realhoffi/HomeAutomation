import * as React from "react";
import { Toggle } from "office-ui-fabric-react";
import Axios from "axios";
import {
  ILightModel,
  IRGBColor,
  IBaseWeatherSensor,
  IGatewayModel
} from "../../../../interfaces/xiaomi";
import { BaseLight } from "../../../../global/components/simple/BaseLight";
import { BaseWeatherSensor } from "../../../../global/components/simple/BaseWeatherSensor";
import { setInterval } from "timers";
const intToRGB = require("int-to-rgb");
export interface IApplicationProps {
  requestUrl: string;
}
export interface IApplicationState {
  isInitialized: boolean;
  gateways: IGatewayModel[];
  sensors: IBaseWeatherSensor[];
  lights: ILightModel[];
  gatewayLights: ILightModel[];
}
export class Application extends React.Component<
  IApplicationProps,
  IApplicationState
> {
  constructor(props) {
    super(props);
    this.state = {
      gateways: [],
      lights: [],
      sensors: [],
      gatewayLights: [],
      isInitialized: false
    };

    this.colorChangedOnLight = this.colorChangedOnLight.bind(this);
    this.powerChangedOnLight = this.powerChangedOnLight.bind(this);
    this.colorSchemaChangedOnLight = this.colorSchemaChangedOnLight.bind(this);
    this.brightnessChangedOnLight = this.brightnessChangedOnLight.bind(this);
    this.reloadLightInformations = this.reloadLightInformations.bind(this);
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
    let p1 = Axios.get("/api/lights/details");
    let p2 = Axios.get("/api/gateways");
    let p3 = Axios.get("/api/sensors");
    return Promise.all([p1, p2, p3])
      .then(results => {
        let gws: IGatewayModel[] = results[1].data["gateways"];
        let gwLights: ILightModel[] = gws.map(this.mapGatewayToLightModel);
        // gateways: results[0].data["gateways"],
        this.setState({
          lights: results[0].data["lights"],
          sensors: results[2].data["sensors"],
          gateways: gws,
          gatewayLights: gwLights
        });
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
  private reloadGatewayInformations() {
    Axios.get("/api/gateways").then(result => {
      let gateways = result.data.gateways;
      let gwLights: ILightModel[] = gateways.map(this.mapGatewayToLightModel);
      this.setState({ gateways: gateways, gatewayLights: gwLights });
    });
  }
  private reloadLightInformations() {
    Axios.get("/api/lights/details").then(result => {
      this.setState({ lights: result.data.lights });
      let newState = { ...this.state };
    });
  }
  private colorChangedOnLight(lightInformation: ILightModel, color: IRGBColor) {
    let rgb = color.r * 65536 + color.g * 256 + color.b;
    Axios.post("/api/lights/" + lightInformation.id + "/color/" + rgb).then(
      this.reloadLightInformations
    );
  }
  private powerChangedOnLight(lightInformation: ILightModel) {
    Axios.post("/api/lights/" + lightInformation.id + "/power").then(
      this.reloadLightInformations
    );
  }
  private colorSchemaChangedOnLight(
    lightInformation: ILightModel,
    color: IRGBColor,
    brightness: number
  ) {
    let rgb = color.r * 65536 + color.g * 256 + color.b;
    Promise.all([
      Axios.post(
        "/api/lights/" + lightInformation.id + "/brightness/" + brightness
      ),
      Axios.post("/api/lights/" + lightInformation.id + "/color/" + rgb)
    ]).then(this.reloadLightInformations);
  }
  private brightnessChangedOnLight(
    lightInformation: ILightModel,
    brightness: number
  ) {
    Axios.post(
      "/api/lights/" + lightInformation.id + "/brightness/" + brightness
    ).then(this.reloadLightInformations);
  }
  render() {
    if (!this.state.isInitialized) {
      return false;
    }
    console.log("Yewelight render");
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          {(!this.state.sensors || this.state.sensors.length < 1) && (
            <h1 className="ms-font-xl ms-fontColor-themePrimary">
              Keine Sensoren gefunden
            </h1>
          )}
          <div className="ms-Grid-row">
            {this.state.sensors &&
              this.state.sensors.length > 0 &&
              this.state.sensors.map((sensor, index) => {
                return (
                  <div
                    className="ms-Grid-col ms-sm12 ms-lg6 ms-xl3"
                    key={"sensor_container_" + index}
                  >
                    <BaseWeatherSensor id={index} sensorInformations={sensor} />
                  </div>
                );
              })}
          </div>
          {(!this.state.lights || this.state.lights.length < 1) && (
            <h1 className="ms-font-xl ms-fontColor-themePrimary">
              Keine Lampen gefunden
            </h1>
          )}
          <div className="ms-Grid-row">
            {this.state.lights &&
              this.state.lights.length > 0 &&
              this.state.lights.map((light, index) => {
                return (
                  <div
                    className="ms-Grid-col ms-sm12 ms-lg6 ms-xl3"
                    key={"light_container_" + index}
                  >
                    <BaseLight
                      lightInformation={light}
                      id={index}
                      onBrightnessChanged={this.brightnessChangedOnLight}
                      onColorChanged={this.colorChangedOnLight}
                      onColorSchemaChanged={this.colorSchemaChangedOnLight}
                      onPowerChanged={this.powerChangedOnLight}
                    />
                  </div>
                );
              })}
          </div>
          {(!this.state.gateways || this.state.gateways.length < 1) && (
            <h1 className="ms-font-xl ms-fontColor-themePrimary">
              Keine Gateways gefunden
            </h1>
          )}
          <div className="ms-Grid-row">
            {this.state.gatewayLights &&
              this.state.gatewayLights.length > 0 &&
              this.state.gatewayLights.map((gw, index) => {
                return (
                  <div
                    className="ms-Grid-col ms-sm12 ms-lg6 ms-xl3"
                    key={"gwr_" + index}
                  >
                    <BaseLight
                      lightInformation={gw}
                      id={index}
                      onBrightnessChanged={(
                        lightInformation: ILightModel,
                        brightness: number
                      ) => {
                        Axios.post(
                          "/api/gateways/" +
                            lightInformation.id +
                            "/brightness/" +
                            brightness
                        ).then(this.reloadGatewayInformations);
                      }}
                      onColorChanged={(
                        lightInformation: ILightModel,
                        color: IRGBColor
                      ) => {
                        Axios.post(
                          "/api/gateways/" + lightInformation.id + "/color",
                          { color }
                        ).then(this.reloadGatewayInformations);
                      }}
                      onColorSchemaChanged={(
                        lightInformation: ILightModel,
                        color: IRGBColor,
                        brightness: number
                      ) => {
                        Axios.post(
                          "/api/gateways/" + lightInformation.id + "/color",
                          { color }
                        )
                          .then(() => {
                            return Axios.post(
                              "/api/gateways/" +
                                lightInformation.id +
                                "/brightness/" +
                                brightness
                            );
                          })
                          .then(this.reloadGatewayInformations);
                      }}
                      onPowerChanged={(lightInformation: ILightModel) => {
                        Axios.post(
                          "/api/gateways/" + lightInformation.id + "/power"
                        ).then(this.reloadGatewayInformations);
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
