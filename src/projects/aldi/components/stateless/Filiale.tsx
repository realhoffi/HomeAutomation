import * as React from "react";
import { ActionButton, TextField, Label } from "office-ui-fabric-react";
import { IFilialeViewModel } from "../../../../interfaces/aldi";
import { NumberTextField } from "../../../../global/components/simple/NumberTextField";
import { Panel } from "../../../../global/components/simple/Panel";
import { getGermanDateString } from "../../../../helper/date";

export interface IFilialeProps {
  enableDeleteBtn: boolean;
  filiale: IFilialeViewModel;
  fahrdaten: Date[];
  id: string;
  title: string;
  onDeleteClick(id: string): void;
  onFahrdatumChanged(id: string, value: number): void;
  onPkzChanged(id: string, value: number): void;
  onTestnummerChanged(id: string, value: number): void;
  onAusgabenChanged(id: string, value: number): void;
  onEinnahmenChanged(id: string, value: number): void;
  onOrtChanged(id: string, value: string): void;
  onStrasseChanged(id: string, value: string): void;
  onPlzChanged(id: string, value: number): void;
}
export class Filiale extends React.Component<IFilialeProps, {}> {
  constructor(props) {
    super(props);
    this.fahrDatumChanged = this.fahrDatumChanged.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
    this.pkzChanged = this.pkzChanged.bind(this);
    this.testnummerChanged = this.testnummerChanged.bind(this);
    this.ausgabenChanged = this.ausgabenChanged.bind(this);
    this.einnahmenChanged = this.einnahmenChanged.bind(this);
    this.ortChanged = this.ortChanged.bind(this);
    this.strasseChanged = this.strasseChanged.bind(this);
    this.plzChanged = this.plzChanged.bind(this);
  }
  private fahrDatumChanged(event) {
    let index = event.target.selectedIndex;
    let value = event.target.options[index].value;
    this.props.onFahrdatumChanged(this.props.id, parseInt(value));
  }
  private deleteClicked() {
    this.props.onDeleteClick(this.props.id);
  }
  private pkzChanged(value: number) {
    this.props.onPkzChanged(this.props.id, value);
  }
  private testnummerChanged(value: number) {
    this.props.onTestnummerChanged(this.props.id, value);
  }
  private ausgabenChanged(value: number) {
    this.props.onAusgabenChanged(this.props.id, value);
  }
  private einnahmenChanged(value: number) {
    this.props.onEinnahmenChanged(this.props.id, value);
  }
  private ortChanged(value: string) {
    this.props.onOrtChanged(this.props.id, value);
  }
  private strasseChanged(value: string) {
    this.props.onStrasseChanged(this.props.id, value);
  }
  private plzChanged(value: number) {
    this.props.onPlzChanged(this.props.id, value);
  }
  render() {
    console.log("render Filiale");
    return (
      <div className="ms-Grid-row" key={"filiale_" + this.props.id}>
        <div className="ms-Grid-col ms-sm12">
          <Panel
            headerText={this.props.title}
            headerControls={
              this.props.enableDeleteBtn ? (
                <ActionButton data-info-title="Filiale entfernen" data-info-desc="Löscht die Filiale" iconProps={{ iconName: "Delete" }} onClick={this.deleteClicked} />
              ) : null
            }
          >
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md5">
                <div>
                  <Label>Routenfahrdatum</Label>
                  <select className="custom-ddl-control" onChange={this.fahrDatumChanged} value={this.props.filiale.fahrdatum || undefined}>
                    {this.props.fahrdaten.map((fahrtDatum, index) => {
                      return (
                        <option key={"fahrt__" + index} value={fahrtDatum.getTime()}>
                          {getGermanDateString(fahrtDatum)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="ms-Grid-col ms-sm8 ms-md4">
                <NumberTextField required={true} placeholder="Testnummer" label="Testnummer" numberValue={this.props.filiale.testnummer} onChanged={this.testnummerChanged} />
              </div>
              <div className="ms-Grid-col ms-sm4 ms-md3">
                <NumberTextField required={true} placeholder="Prüfkennziffer" label="Pkz." numberValue={this.props.filiale.pkz} onChanged={this.pkzChanged} />
              </div>
              <div className="ms-Grid-col ms-sm12 ms-lg5">
                <TextField required={true} placeholder="Straße" label="Straße" value={this.props.filiale.strasse} onChanged={this.strasseChanged} />
              </div>
              <div className="ms-Grid-col ms-sm4 ms-md3 ms-lg2">
                <NumberTextField required={true} placeholder="Plz" label="Plz" numberValue={this.props.filiale.plz} onChanged={this.plzChanged} />
              </div>
              <div className="ms-Grid-col ms-sm8 ms-md9 ms-lg5">
                <TextField required={true} placeholder="Ort" label="Ort" value={this.props.filiale.ort} onChanged={this.ortChanged} />
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                <NumberTextField placeholder="Einnahmen" label="Einnahmen" numberValue={this.props.filiale.einnahmen} onChanged={this.einnahmenChanged} suffix=" €" />
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                <NumberTextField placeholder="Ausgaben" label="Ausgaben" numberValue={this.props.filiale.ausgaben} onChanged={this.ausgabenChanged} suffix=" €" />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    );
  }
}
