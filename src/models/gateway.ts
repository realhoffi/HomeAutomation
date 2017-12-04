export interface IGatewayModel {
    on: boolean;
    sid: string;
    ip: string;
    intensity: number;
    rgb: IGatewayColor;
}
export interface IGatewayColor {
    r: number;
    g: number;
    b: number;
}