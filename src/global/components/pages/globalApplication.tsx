import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Application } from "./application";
import { Application as YeelightApplication } from "../../../projects/yeelight/components/pages/application";
import { Application as VacuumApplication } from "../../../projects/vacuumRoboter/components/pages/application";
import { Application as AldiApplication } from "../../../projects/aldi/components/pages/application";
import { Application as SensorApplication } from "../../../projects/xiaomi/components/pages/sensors";
import { Application as GatewayApplication } from "../../../projects/xiaomi/components/pages/gateways";
import { NotFoundPage } from "../../components/simple/NotFoundPage";
import { RedirectWithStatus } from "../simple/Routing";
import { BasePage } from "../container/basePage";
import { SystemInfo } from "../../../projects/system/components/pages/systeminfo";
import { Nav } from "office-ui-fabric-react";

export interface IGlobalApplicationProps {}
export interface IGlobalApplicationState {
  selectedNavKey: string;
}
export class GlobalApplication extends React.Component<IGlobalApplicationProps, IGlobalApplicationState> {
  constructor(props) {
    super(props);
    this.state = { selectedNavKey: this.getRouteIdFromHash() };
    this.routeChanged = this.routeChanged.bind(this);
  }
  private getRouteIdFromHash(): string {
    return document.location.hash ? "#" + document.location.hash.replace("#/", "") : "#";
  }
  componentDidMount() {
    document.title = "Web-Application by Florian Hoffmann";
    console.log("componentDidMount Application");
    window.addEventListener("hashchange", this.routeChanged);
  }
  routeChanged() {
    console.log("route changed");
    let navKey = this.getRouteIdFromHash();
    if (this.state.selectedNavKey === navKey) {
      return;
    }
    this.setState({
      selectedNavKey: navKey
    });
  }
  componentWillUnmount() {
    window.removeEventListener("hashchange", this.routeChanged);
  }
  render() {
    console.log("render Application");
    return (
      <BasePage
        IncludeFabricElement={true}
        Body={
          <Switch>
            <RedirectWithStatus status={302} from="/courses" to="/aldi" />
            <Route exact path="/" component={Application} key="r1" />
            <Route path="/system" component={SystemInfo} key="r8" />
            <Route path="/light" component={YeelightApplication} key="r2" />
            <Route path="/aldi" component={AldiApplication} key="r3" />
            <Route path="/vacuum" component={VacuumApplication} key="r4" />
            <Route path="/sensors" component={SensorApplication} key="r6" />
            <Route path="/gateways" component={GatewayApplication} key="r7" />
            <Route path="*" component={NotFoundPage} key="r5" />
          </Switch>
        }
        Navigation={
          <div>
            <Nav
              selectedKey={this.state.selectedNavKey}
              groups={[
                {
                  name: "Navigation",
                  links: [
                    { key: "#", name: "root", url: "#" },
                    {
                      key: "#system",
                      name: "System-Informationen",
                      url: "#system"
                    },
                    { key: "#light", name: "Yeelight", url: "#light" },
                    { key: "#sensors", name: "Sensoren", url: "#sensors" },
                    { key: "#gateways", name: "Gateways", url: "#gateways" },
                    { key: "#aldi", name: "Aldi", url: "#aldi" }
                  ]
                }
              ]}
            />
            {/* <ul>
              <li>
                <Link to={"/"} replace={true}>
                  Übersicht
                </Link>
              </li>
              <li>
                <Link to={"/system"} replace={true}>
                  System-Informationen
                </Link>
              </li>
              <li>
                <Link to={"/light"} replace={true}>
                  Yeelight
                </Link>
              </li>
              <li>
                <Link to={"/sensors"} replace={true}>
                  Sensoren
                </Link>
              </li>
              <li>
                <Link to={"/gateways"} replace={true}>
                  Gateways
                </Link>
              </li>
              <li>
                <Link to={"/aldi"} replace={true}>
                  Aldi
                </Link>
              </li>
              <li>
                <Link to={"/vacuum"} replace={true}>
                  Vacuum
                </Link>
              </li>
            </ul> */}
          </div>
        }
      />
    );
  }
}
