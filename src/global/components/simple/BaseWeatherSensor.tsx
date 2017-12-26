import * as React from "react";
import { Toggle, Slider, Label, Icon } from "office-ui-fabric-react";
import { IBaseWeatherSensor } from "../../../interfaces/xiaomi";
import { Panel } from "../../../global/components/simple/Panel";
import Axios from "axios";

export interface IBaseWeatherSensorProps {
  sensorInformations: IBaseWeatherSensor;
  id: number;
}
export class BaseWeatherSensor extends React.Component<
  IBaseWeatherSensorProps,
  {}
> {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("BaseWeatherSensor render");
    return (
      <div className="ms-Grid-row" key={"sensor" + this.props.id}>
        <div className="ms-Grid-col ms-sm12">
          <Panel
            headerText={this.props.sensorInformations.name}
            className="custom-padding-bottom-10px"
          >
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
          </Panel>
        </div>
      </div>
    );
  }
}
