import * as React from "react";
import { Toggle, Slider, Label } from "office-ui-fabric-react";
import Axios from "axios";
import { ILightModel, IRGBColor } from "../../../../models/xiaomi";
import { Panel } from "../../../../global/components/simple/Panel";
// const fc = require("./../../../config/config");
export interface IYeelightProps {
  onColorTemperatureChanged(
    lightInformation: ILightModel,
    colorTemperature: number
  );
  onBrightnessChanged(lightInformation: ILightModel, brightness: number);
  onColorChanged(lightInformation: ILightModel, color: IRGBColor);
  onPowerChanged(lightInformation: ILightModel);
  onColorSchemaChanged(
    lightInformation: ILightModel,
    color: IRGBColor,
    brightness: number
  );
  lightInformation: ILightModel;
  id: number;
}
export class Yeelight extends React.Component<IYeelightProps, {}> {
  private sliderDelay;
  private colorSchemes;
  constructor(props) {
    super(props);
    this.state = { gateways: [] };
    this.colorSchemes = [
      {
        name: "Bitte auswählen...",
        color: { r: 0, g: 0, b: 0 },
        brightness: -1
      },
      {
        name: "Romantik",
        color: { r: 235, g: 104, b: 119 },
        brightness: 43
      },
      {
        name: "Sky",
        color: { r: 0, g: 255, b: 127 },
        brightness: 43
      }
    ];
    this.brightnessChanged = this.brightnessChanged.bind(this);
    this.togglePower = this.togglePower.bind(this);
    this.setBrightness = this.setBrightness.bind(this);
    this.colorSchemeChanged = this.colorSchemeChanged.bind(this);
    this.colorTemperatureChanged = this.colorTemperatureChanged.bind(this);

    this.onRedChanged = this.onRedChanged.bind(this);
    this.onBlueChanged = this.onBlueChanged.bind(this);
    this.onGreenChanged = this.onGreenChanged.bind(this);
  }
  private colorSchemeChanged(event) {
    let schemeIndex = event.currentTarget.selectedIndex;
    let schema = this.colorSchemes[schemeIndex];
    if (!schema || schema.intensity === -1) return;
    this.props.onColorSchemaChanged(
      this.props.lightInformation,
      schema.color,
      schema.brightness
    );
  }
  private togglePower() {
    this.props.onPowerChanged(this.props.lightInformation);
  }
  private setBrightness(value: number) {
    this.props.onBrightnessChanged(this.props.lightInformation, value);
  }
  private brightnessChanged(value: number) {
    if (this.sliderDelay) {
      clearTimeout(this.sliderDelay);
    }
    this.sliderDelay = setTimeout(() => {
      this.setBrightness(value);
    }, 400);
  }
  private colorTemperatureChanged(value: number) {
    if (this.sliderDelay) {
      clearTimeout(this.sliderDelay);
    }
    this.sliderDelay = setTimeout(() => {
      this.props.onColorTemperatureChanged(this.props.lightInformation, value);
    }, 400);
  }
  private onColorChanged(color: IRGBColor) {
    this.props.onColorChanged(this.props.lightInformation, color);
  }
  private onRedChanged(value: number) {
    let color = { ...this.props.lightInformation.rgb };
    color.r = value;
    if (this.sliderDelay) {
      clearTimeout(this.sliderDelay);
    }
    this.sliderDelay = setTimeout(() => {
      this.onColorChanged(color);
    }, 400);
  }
  private onBlueChanged(value: number) {
    let color = { ...this.props.lightInformation.rgb };
    color.b = value;
    if (this.sliderDelay) {
      clearTimeout(this.sliderDelay);
    }
    this.sliderDelay = setTimeout(() => {
      this.onColorChanged(color);
    }, 400);
  }
  private onGreenChanged(value: number) {
    let color = { ...this.props.lightInformation.rgb };
    color.g = value;
    if (this.sliderDelay) {
      clearTimeout(this.sliderDelay);
    }
    this.sliderDelay = setTimeout(() => {
      this.onColorChanged(color);
    }, 400);
  }
  render() {
    console.log("Yeelight render");
    return (
      <div className="ms-Grid-row" key={"list_" + this.props.id}>
        <div className="ms-Grid-col ms-sm12 ms-lg12">
          <Panel
            headerText={this.props.lightInformation.name}
            className="custom-padding-bottom-10px"
          >
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6">
                <h1 className="ms-font-xl ms-fontColor-themePrimary">
                  {this.props.lightInformation.power
                    ? "Licht anschalten"
                    : "Licht ausschalten"}
                </h1>
                <Toggle
                  key={"light_power_" + this.props.id}
                  checked={this.props.lightInformation.power}
                  onText="On"
                  offText="Off"
                  onChanged={this.togglePower}
                />
              </div>
              <div className="ms-Grid-col ms-sm6">
                <h1 className="ms-font-xl ms-fontColor-themePrimary">
                  Farbschema
                </h1>
                <select
                  onChange={this.colorSchemeChanged}
                  style={{ padding: "10px", width: "100%" }}
                  disabled={!this.props.lightInformation.power}
                >
                  {this.colorSchemes.map((schema, index) => {
                    return (
                      <option key={"option_schema_" + index} value={index}>
                        {schema.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="ms-Grid-col ms-sm12">
                <h1 className="ms-font-xl ms-fontColor-themePrimary">
                  Leuchtstärke
                </h1>
                <Slider
                  min={1}
                  max={100}
                  step={1}
                  disabled={!this.props.lightInformation.power}
                  value={this.props.lightInformation.brightness}
                  showValue={true}
                  onChange={this.brightnessChanged}
                />
              </div>
              <div className="ms-Grid-col ms-sm12">
                <h1 className="ms-font-xl ms-fontColor-themePrimary">
                  Farbtemperatur
                </h1>
                <Slider
                  min={1700}
                  max={6500}
                  step={1}
                  disabled={!this.props.lightInformation.power}
                  value={this.props.lightInformation.colorTemperature}
                  showValue={true}
                  onChange={this.colorTemperatureChanged}
                />
              </div>
              <div className="ms-Grid-col ms-sm12">
                <h1 className="ms-font-xl ms-fontColor-themePrimary">
                  RGB Farben
                </h1>
                <Slider
                  label="Rot"
                  min={0}
                  max={255}
                  step={1}
                  disabled={!this.props.lightInformation.power}
                  value={this.props.lightInformation.rgb.r}
                  showValue={true}
                  onChange={this.onRedChanged}
                />
                <Slider
                  label="Grün"
                  min={0}
                  max={255}
                  step={1}
                  disabled={!this.props.lightInformation.power}
                  value={this.props.lightInformation.rgb.g}
                  showValue={true}
                  onChange={this.onGreenChanged}
                />
                <Slider
                  label="Blau"
                  min={0}
                  max={255}
                  step={1}
                  disabled={!this.props.lightInformation.power}
                  value={this.props.lightInformation.rgb.b}
                  showValue={true}
                  onChange={this.onBlueChanged}
                />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    );
  }
}
