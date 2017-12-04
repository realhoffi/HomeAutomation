import * as React from "react";
import { Toggle, Slider, Label } from "office-ui-fabric-react";
import Axios from "axios";
import { IGatewayModel, IGatewayColor } from "../../../models/gateway";
import { Panel } from "../../../global/components/simple/Panel";
import { json } from "body-parser";
export interface IGatewayProps {
    onIntensityChanged(currentGatewayInformation: IGatewayModel, newGatewayInformation: IGatewayModel);
    onColorChanged(currentGatewayInformation: IGatewayModel, newGatewayInformation: IGatewayModel);
    onPowerChanged(currentGatewayInformation: IGatewayModel, newGatewayInformation: IGatewayModel);
    onColorSchemaChanged(currentGatewayInformation: IGatewayModel, newGatewayInformation: IGatewayModel);
    gatewayInformation: IGatewayModel;
    id: number;
}
export class Gateway extends React.Component<IGatewayProps, {}> {
    private sliderDelay;
    private colorSchemes;
    constructor(props) {
        super(props);
        this.state = { gateways: [] };
        this.colorSchemes = [
            {
                name: "Bitte auswählen...",
                color: { "r": 0, "g": 0, "b": 0 },
                intensity: -1
            },
            {
                name: "Romantik",
                color: { "r": 235, "g": 104, "b": 119 },
                intensity: 43
            },
            {
                name: "Sky",
                color: { "r": 0, "g": 255, "b": 127 },
                intensity: 43
            }];
        this.sliderChanged = this.sliderChanged.bind(this);
        this.togglePower = this.togglePower.bind(this);
        this.setIntensity = this.setIntensity.bind(this);
        this.colorSchemeChanged = this.colorSchemeChanged.bind(this);

        this.onRedChanged = this.onRedChanged.bind(this);
        this.onBlueChanged = this.onBlueChanged.bind(this);
        this.onGreenChanged = this.onGreenChanged.bind(this);
    }
    componentDidMount() {
    }
    private colorSchemeChanged(event) {
        let schemeIndex = event.currentTarget.selectedIndex;
        let schema = this.colorSchemes[schemeIndex];
        if (!schema || schema.intensity === -1)
            return;
        Axios.post("/api/gateways/" + this.props.gatewayInformation.sid + "/intensity/" + schema.intensity)
            .then((result) => {
                console.log("Response intensity: " + JSON.stringify(result.data));
                return Axios.post("/api/gateways/" + this.props.gatewayInformation.sid + "/color", schema.color);
            })
            .then((resultTwo) => {
                console.log("Response color: " + JSON.stringify(resultTwo.data));
                return Axios.get("/api/gateways/" + this.props.gatewayInformation.sid);
            })
            .then((resultThree) => {
                console.log("Response intensity: " + JSON.stringify(resultThree.data));
                this.props.onColorSchemaChanged(this.props.gatewayInformation, resultThree.data);
            });
    }
    private togglePower() {
        let newPowerState = this.props.gatewayInformation.on ? 0 : 100;
        Axios.post("/api/gateways/" + this.props.gatewayInformation.sid + "/intensity/" + newPowerState)
            .then((result) => {
                return Axios.get("/api/gateways/" + this.props.gatewayInformation.sid);
            }).then((data) => {
                this.props.onPowerChanged(this.props.gatewayInformation, data.data);
            });
    }
    private setIntensity(value: number) {
        return Axios.post("/api/gateways/" + this.props.gatewayInformation.sid + "/intensity/" + value)
            .then(() => {
                return Axios.get("/api/gateways/" + this.props.gatewayInformation.sid);
            }).then((data) => {
                this.props.onIntensityChanged(this.props.gatewayInformation, data.data);
            });
    }
    private sliderChanged(value: number) {
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.setIntensity(value);
        }, 400);
    }
    private postColor(color: IGatewayColor) {
        return Axios.post("/api/gateways/" + this.props.gatewayInformation.sid + "/color", color)
            .then((resultTwo) => {
                console.log("Response color: " + JSON.stringify(resultTwo.data));
                return Axios.get("/api/gateways/" + this.props.gatewayInformation.sid);
            })
            .then((resultThree) => {
                console.log("Response intensity: " + JSON.stringify(resultThree.data));
                this.props.onColorChanged(this.props.gatewayInformation, resultThree.data);
            });
    }
    private onRedChanged(value: number) {
        let color = { ...this.props.gatewayInformation.rgb };
        color.r = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.postColor(color);
        }, 400);
    }
    private onBlueChanged(value: number) {
        let color = { ...this.props.gatewayInformation.rgb };
        color.b = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.postColor(color);
        }, 400);
    }
    private onGreenChanged(value: number) {
        let color = { ...this.props.gatewayInformation.rgb };
        color.g = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.postColor(color);
        }, 400);
    }
    render() {
        console.log("gateway render");
        return <div className="ms-Grid-row" key={"gateway_" + this.props.id}>
            <div className="ms-Grid-col ms-sm12 ms-lg12 ms-xl6">
                <Panel headerText={"Gateway " + this.props.gatewayInformation.sid}>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <h1 className="ms-font-xl ms-fontColor-themePrimary">{this.props.gatewayInformation.on ? "Licht anschalten" : "Licht ausschalten"}</h1>
                            <Toggle
                                key={"gw_" + this.props.id}
                                checked={this.props.gatewayInformation.on}
                                onText="On"
                                offText="Off"
                                onChanged={this.togglePower}
                            />
                        </div>
                        <div className="ms-Grid-col ms-sm6">
                            <h1 className="ms-font-xl ms-fontColor-themePrimary">Farbschema</h1>
                            <select onChange={this.colorSchemeChanged} style={{ padding: "10px", width: "100%" }}>
                                {
                                    this.colorSchemes.map((schema, index) => {
                                        return <option key={"option_schema_" + index} value={index}>{schema.name}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="ms-Grid-col ms-sm12">
                            <h1 className="ms-font-xl ms-fontColor-themePrimary">Leuchtstärke</h1>
                            <Slider
                                min={1}
                                max={100}
                                step={1}
                                disabled={this.props.gatewayInformation.on === false}
                                value={this.props.gatewayInformation.intensity}
                                showValue={true}
                                onChange={this.sliderChanged}
                            />
                        </div>
                        <div className="ms-Grid-col ms-sm12">
                            <h1 className="ms-font-xl ms-fontColor-themePrimary">RGB Farben</h1>
                            <Slider
                                label="Rot"
                                min={0}
                                max={255}
                                step={1}
                                disabled={this.props.gatewayInformation.on === false}
                                value={this.props.gatewayInformation.rgb.r}
                                showValue={true}
                                onChange={this.onRedChanged}
                            />
                            <Slider
                                label="Grün"
                                min={0}
                                max={255}
                                step={1}
                                disabled={this.props.gatewayInformation.on === false}
                                value={this.props.gatewayInformation.rgb.g}
                                showValue={true}
                                onChange={this.onGreenChanged}
                            />
                            <Slider
                                label="Blau"
                                min={0}
                                max={255}
                                step={1}
                                disabled={this.props.gatewayInformation.on === false}
                                value={this.props.gatewayInformation.rgb.b}
                                showValue={true}
                                onChange={this.onBlueChanged}
                            />
                        </div>
                    </div>
                </Panel>
            </div>
        </div>;
    }
}