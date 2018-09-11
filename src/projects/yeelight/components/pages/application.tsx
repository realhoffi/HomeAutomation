import * as React from "react";
import Axios from "axios";
import { ILightModel, IRGBColor } from "../../../../interfaces/xiaomi";
import { setInterval } from "timers";
import { Yeelight } from "../simple/Yeelight";
import { Fragment } from "react";
export interface IApplicationProps {}
export interface IApplicationState {
  isInitialized: boolean;
  lights: ILightModel[];
  intervalId: undefined;
}
export class Application extends React.Component<IApplicationProps, IApplicationState> {
  private isMountedFinished = false;
  constructor(props) {
    super(props);
    this.state = { lights: [], isInitialized: false, intervalId: undefined };

    this.colorChangedOnLight = this.colorChangedOnLight.bind(this);
    this.powerChangedOnLight = this.powerChangedOnLight.bind(this);
    this.colorSchemaChangedOnLight = this.colorSchemaChangedOnLight.bind(this);
    this.brightnessChangedOnLight = this.brightnessChangedOnLight.bind(this);
    this.colorTemperatureChangedOnLight = this.colorTemperatureChangedOnLight.bind(this);
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
    return Axios.get("/api/lights/details")
      .then(results => {
        this.setState({ lights: results.data["lights"] });
      })
      .catch(error => {});
  }

  private reloadLightInformations() {
    Axios.get("/api/lights/details").then(result => {
      this.setState({ lights: result.data.lights });
      let newState = { ...this.state };
    });
  }
  private colorChangedOnLight(lightInformation: ILightModel, color: IRGBColor) {
    let rgb = color.r * 65536 + color.g * 256 + color.b;
    Axios.post("/api/lights/" + lightInformation.id + "/color/" + rgb).then(this.reloadLightInformations);
  }
  private powerChangedOnLight(lightInformation: ILightModel) {
    Axios.post("/api/lights/" + lightInformation.id + "/power").then(this.reloadLightInformations);
  }
  private colorTemperatureChangedOnLight(lightInformation: ILightModel, colorTemperature: number) {
    Axios.post("/api/lights/" + lightInformation.id + "/temperature/" + colorTemperature).then(this.reloadLightInformations);
  }
  private colorSchemaChangedOnLight(lightInformation: ILightModel, color: IRGBColor, brightness: number) {
    let rgb = color.r * 65536 + color.g * 256 + color.b;
    Promise.all([Axios.post("/api/lights/" + lightInformation.id + "/brightness/" + brightness), Axios.post("/api/lights/" + lightInformation.id + "/color/" + rgb)]).then(
      this.reloadLightInformations
    );
  }
  private brightnessChangedOnLight(lightInformation: ILightModel, brightness: number) {
    Axios.post("/api/lights/" + lightInformation.id + "/brightness/" + brightness).then(this.reloadLightInformations);
  }
  render() {
    if (!this.state.isInitialized) {
      return false;
    }
    console.log("Yewelight render");
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          {(!this.state.lights || this.state.lights.length < 1) && <h1 className="ms-font-xl ms-fontColor-themePrimary">Keine Lampen gefunden</h1>}
          <div className="ms-Grid-row">
            {this.state.lights &&
              this.state.lights.length > 0 &&
              this.state.lights.map((light, index) => {
                return (
                  <div className="ms-Grid-col ms-sm12 ms-lg6 ms-xl3" key={"light_container_" + index}>
                    <Fragment>
                      {/* <BaseLight
                        lightInformation={light}
                        id={index}
                        onBrightnessChanged={this.brightnessChangedOnLight}
                        onColorChanged={this.colorChangedOnLight}
                        onColorSchemaChanged={this.colorSchemaChangedOnLight}
                        onPowerChanged={this.powerChangedOnLight}
                      /> */}
                      <Yeelight
                        lightInformation={light}
                        id={index + 22}
                        onBrightnessChanged={this.brightnessChangedOnLight}
                        onColorChanged={this.colorChangedOnLight}
                        onColorSchemaChanged={this.colorSchemaChangedOnLight}
                        onPowerChanged={this.powerChangedOnLight}
                        onColorTemperatureChanged={this.colorTemperatureChangedOnLight}
                      />
                    </Fragment>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
