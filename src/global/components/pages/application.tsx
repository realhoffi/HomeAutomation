import * as React from "react";

import { Application as YeelightApplication } from "../../../projects/yeelight/components/pages/application";
import { Application as VacuumApplication } from "../../../projects/vacuumRoboter/components/pages/application";
import { Application as AldiApplication } from "../../../projects/aldi/components/pages/application";
import { Application as SensorApplication } from "../../../projects/xiaomi/components/pages/sensors";
import { Application as GatewayApplication } from "../../../projects/xiaomi/components/pages/gateways";

import { Pivot, Label, PivotLinkSize } from "office-ui-fabric-react";
import { PivotItem } from "office-ui-fabric-react/lib/components/Pivot/PivotItem";
export interface IApplicationState {
    GatewayInformations: JSX.Element;
    SensorInformations: JSX.Element;
    YeelightInformations: JSX.Element;
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
            YeelightInformations: <YeelightApplication />
        };
    }
    componentDidMount() {
        console.log("componentDidMount Application");
    }

    render() {
        return <div>
            <Pivot linkSize={PivotLinkSize.large}>
                <PivotItem linkText="Yeelights" itemIcon="Lightbulb">
                    <div style={{ paddingTop: "15px" }}>
                        {this.state.YeelightInformations}
                    </div>
                </PivotItem>
                <PivotItem linkText="Gateways" itemIcon="Light">
                    <div style={{ paddingTop: "15px" }}>
                        {this.state.GatewayInformations}
                    </div>
                </PivotItem>
                <PivotItem linkText="Sensoren" itemIcon="CloudWeather">
                    <div style={{ paddingTop: "15px" }}>
                        {this.state.SensorInformations}
                    </div>
                </PivotItem>
            </Pivot>
        </div>;
    }
}