import * as React from "react";
import {
  Toggle,
  Slider,
  Label,
  Icon,
  IconButton
} from "office-ui-fabric-react";
import { IBaseWeatherSensor } from "../../../interfaces/xiaomi";
import { Panel } from "../../../global/components/simple/Panel";
import Axios from "axios";
import { Fragment } from "react";
import { BaseWeatherSensorChart } from "./BaseWeatherSensorChart";

export interface IBaseWeatherSensorProps {
  sensorInformations: IBaseWeatherSensor;
  id: number;
}
export interface IBaseWeatherSensorState {
  showDetails: boolean;
}
export class BaseWeatherSensor extends React.Component<
  IBaseWeatherSensorProps,
  IBaseWeatherSensorState
> {
  constructor(props) {
    super(props);
    this.state = { showDetails: false };
    this.sensorDetailsClicked = this.sensorDetailsClicked.bind(this);
  }
  sensorDetailsClicked() {
    this.setState({ showDetails: !this.state.showDetails });
    // alert();
  }
  render() {
    console.log("BaseWeatherSensor render");
    return (
      <div className="ms-Grid-row" key={"sensor" + this.props.id}>
        <div className="ms-Grid-col ms-sm12">
          <Panel
            headerText={this.props.sensorInformations.name}
            className="custom-padding-bottom-10px"
            headerControls={
              <div>
                <IconButton
                  checked={false}
                  iconProps={{
                    iconName: "info"
                  }}
                  title="Charts öffnen"
                  ariaLabel="Charts öffnen"
                  onClick={this.sensorDetailsClicked}
                />
              </div>
            }
          >
            {!this.state.showDetails && (
              <Fragment>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12">
                    <h1 className="ms-font-su ms-fontColor-themePrimary">
                      {this.props.sensorInformations.temperature + " °C"}
                    </h1>
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <h1 className="ms-font-xl ms-fontColor-themePrimary">
                      {this.props.sensorInformations.humidity}
                      <i
                        className="ms-Icon ms-Icon--Precipitation"
                        aria-hidden="true"
                      />
                    </h1>
                  </div>
                  {this.props.sensorInformations.hasPressure && (
                    <div className="ms-Grid-col ms-sm6">
                      <h1 className="ms-font-xl ms-fontColor-themePrimary">
                        {this.props.sensorInformations.pressure}
                      </h1>
                    </div>
                  )}
                </div>
              </Fragment>
            )}
            {this.state.showDetails && (
              <BaseWeatherSensorChart
                sensorInformations={this.props.sensorInformations}
              />
            )}
          </Panel>
        </div>
      </div>
    );
  }
}
