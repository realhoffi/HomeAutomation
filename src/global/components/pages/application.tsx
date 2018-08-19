import * as React from "react";

import { Application as YeelightApplication } from "../../../projects/yeelight/components/pages/application";
import { Application as SensorApplication } from "../../../projects/xiaomi/components/pages/sensors";
import { Application as GatewayApplication } from "../../../projects/xiaomi/components/pages/gateways";

import { Pivot, PivotLinkSize } from "office-ui-fabric-react";
import { PivotItem } from "office-ui-fabric-react";
import { SystemInfo } from "../../../projects/system/components/pages/systeminfo";
export interface IApplicationState {
  GatewayInformations: JSX.Element;
  SensorInformations: JSX.Element;
  YeelightInformations: JSX.Element;
  SystemInformations: JSX.Element;
}
export interface IApplicationProps {
  requestUrl: string;
}
export class Application extends React.PureComponent<IApplicationProps, IApplicationState> {
  constructor(props) {
    super(props);
    this.state = {
      GatewayInformations: <GatewayApplication />,
      SensorInformations: <SensorApplication />,
      YeelightInformations: <YeelightApplication />,
      SystemInformations: <SystemInfo />
    };
  }
  componentDidMount() {
    console.log("componentDidMount Application");
  }

  render() {
    return (
      <div>
        <Pivot linkSize={PivotLinkSize.large}>
          {/* <PivotItem linkText="System-Info" itemIcon="Settings">
            <div style={{ paddingTop: "15px" }}>
              {this.state.SystemInformations}
            </div>
          </PivotItem> */}
          <PivotItem linkText="Sensoren" itemIcon="CloudWeather">
            <div style={{ paddingTop: "15px" }}>{this.state.SensorInformations}</div>
          </PivotItem>
          <PivotItem linkText="Gateways" itemIcon="Light">
            <div style={{ paddingTop: "15px" }}>{this.state.GatewayInformations}</div>
          </PivotItem>
          <PivotItem linkText="Yeelights" itemIcon="Lightbulb">
            <div style={{ paddingTop: "15px" }}>{this.state.YeelightInformations}</div>
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
