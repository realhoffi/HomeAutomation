import * as React from "react";
import { Label } from "office-ui-fabric-react";
import Axios from "axios";
import { setInterval } from "timers";
import { Fragment } from "react";
export interface IApplicationProps {}
export interface IApplicationState {
  isInitialized: boolean;
  systemInformation: any;
}
export class SystemInfo extends React.Component<
  IApplicationProps,
  IApplicationState
> {
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
    return Axios.get("/api/system").then(result => {
      if (this.isMountedFinished === true) {
        this.setState({ systemInformation: result.data["system"] });
      }
    });
  }
  private convertRamToMBString(ram: number): string {
    if (isNaN(ram)) {
      return "-";
    }
    return (ram / 1024 / 1024).toFixed(0) + " MB";
  }
  private getUptimeString(uptime: number): string {
    if (isNaN(uptime)) {
      return "-";
    }
    let hr = Math.floor(uptime / 60 / 60);
    let days = (hr / 24).toFixed(2);
    return `${hr} Stunden (${days} Tage)`;
  }
  private getLabelRowForProperty(label: string, value: string) {
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          <Label className="ms-font-xl ms-fontColor-themePrimary">
            {label}
          </Label>
          <span>{value}</span>
        </div>
      </div>
    );
  }
  private getValueFromSystemInfo() {
    return (
      <Fragment>
        {this.getLabelRowForProperty(
          "Hostname: ",
          `${this.state.systemInformation.hostname} (${
            this.state.systemInformation.userName
          })`
        )}
        {this.getLabelRowForProperty(
          "Total Memory: ",
          this.convertRamToMBString(
            Number(this.state.systemInformation.totalMemory)
          )
        )}
        {this.getLabelRowForProperty(
          "Free Memory: ",
          this.convertRamToMBString(
            Number(this.state.systemInformation.freeMemory)
          )
        )}
        {this.getLabelRowForProperty(
          "Uptime: ",
          this.getUptimeString(this.state.systemInformation.uptime)
        )}
        {this.getLabelRowForProperty(
          "Plattform: ",
          `${this.state.systemInformation.platform} (${
            this.state.systemInformation.arch
          })`
        )}
      </Fragment>
    );
  }
  render() {
    if (!this.state.isInitialized) {
      return false;
    }
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          {!this.state.systemInformation && (
            <h1 className="ms-font-xl ms-fontColor-themePrimary">
              Keine System-Informationen gefunden
            </h1>
          )}
          {this.state.systemInformation && (
            <div className="ms-Grid-row">
              <div
                className="ms-Grid-col ms-sm12 ms-lg6 ms-xl3"
                key={"sysinfo_"}
              >
                {this.getValueFromSystemInfo()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
