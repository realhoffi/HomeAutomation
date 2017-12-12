export interface IXiaomiDevice {
    id: string;
    ip: string;
    name: string;
}
export interface IRGBColor {
    r: number;
    g: number;
    b: number;
}
export interface ILightModel extends IXiaomiDevice {
    power: boolean;
    colorTemperature: number;
    brightness: number;
    rgb: IRGBColor;
}

export interface IGatewayModel extends IXiaomiDevice {
    power: boolean;
    illuminance: number;
    brightness: number;
    rgb: IRGBColor;
}

export interface IBaseWeatherSensor extends IXiaomiDevice {
    temperature: number;
    humidity: number;
    pressure: number;
    hasPressure: boolean;
}