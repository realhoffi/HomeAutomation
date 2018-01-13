import { IDefaultDbEntryModel } from "./mongo";
export interface IKeyValueModel {
  value: string;
  key: string;
}
export interface IRelationAttribut {
  id: string;
}
export interface IAusgabeModel extends IRelationAttribut {
  value: number;
  description: string;
}
export interface ILinkModel extends IRelationAttribut {
  link: string;
  text: string;
}
export interface IFilialeModel extends IDefaultDbEntryModel {
  plz: number;
  ort: string;
  strasse: string;
  pkz: number;
  testnummer: number;
  einnahmen: number;
  ausgaben: number;
  route_id: string;
}
export interface IRouteModel extends IDefaultDbEntryModel {
  route_timestamp: number;
  ausgaben: IAusgabeModel[];
  links: ILinkModel[];
}

/**
 * Viewmodel zur Anzeige
 *
 * @export
 * @interface IFilialeViewModel
 * @extends {IDefaultDbEntryModel}
 */
export interface IFilialeViewModel extends IDefaultDbEntryModel {
  fahrdatum: number;
  plz: number;
  ort: string;
  strasse: string;
  pkz: number;
  testnummer: number;
  einnahmen: number;
  ausgaben: number;
  index: number;
}
export interface IRouteViewModel extends IRouteModel {
  filialen: IFilialeViewModel;
  index: number;
}
