import * as React from "react";
import Axios from "axios";
import { IBaseWeatherSensor } from "../../../../interfaces/xiaomi";
import { BaseWeatherSensor } from "../../../../global/components/simple/BaseWeatherSensor";
import { setInterval } from "timers";
export interface IApplicationProps {}
export interface IApplicationState {
  isInitialized: boolean;
  sensors: IBaseWeatherSensor[];
  intervalId: undefined;
}
export class Application extends React.Component<IApplicationProps, IApplicationState> {
  private isMountedFinished = false;
  constructor(props) {
    super(props);
    this.state = { sensors: [], isInitialized: false, intervalId: undefined };
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
    return Axios.get("/api/sensors").then(result => {
      this.setState({ sensors: result.data["sensors"] });
    });
  }

  render() {
    if (!this.state.isInitialized) {
      return false;
    }
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          {(!this.state.sensors || this.state.sensors.length < 1) && <h1 className="ms-font-xl ms-fontColor-themePrimary">Keine Sensoren gefunden</h1>}
          <div className="ms-Grid-row">
            {this.state.sensors &&
              this.state.sensors.length > 0 &&
              this.state.sensors.map((sensor, index) => {
                return (
                  <div className="ms-Grid-col ms-sm12 ms-lg6 ms-xl3" key={"sensor_container_" + index}>
                    <BaseWeatherSensor id={index} sensorInformations={sensor} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
