import * as React from "react";
import { ActionButton, TextField } from "office-ui-fabric-react";
import { IAusgabeModel } from "../../../../interfaces/aldi";
import { NumberTextField } from "../../../../global/components/simple/NumberTextField";
import { Panel } from "../../../../global/components/simple/Panel";

export interface IAusgabeProps {
  ausgabeModel: IAusgabeModel;
  ausgabeId: string;
  title: string;
  onDeleteClick(id: string): void;
  onValueChanged(id: string, value: number): void;
  onDescriptionChanged(id: string, value: string): void;
}
const defaultOption = <option key="-1">Bitte einen Wert angeben</option>;
export class Ausgabe extends React.PureComponent<IAusgabeProps, {}> {
  constructor(props) {
    super(props);
    this.deleteClicked = this.deleteClicked.bind(this);
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
    this.onValueChanged = this.onValueChanged.bind(this);
  }
  private deleteClicked() {
    this.props.onDeleteClick(this.props.ausgabeId);
  }
  private onValueChanged(value: number) {
    this.props.onValueChanged(this.props.ausgabeId, value);
  }
  private onDescriptionChanged(value: string) {
    this.props.onDescriptionChanged(this.props.ausgabeId, value);
  }
  render() {
    console.log("render Ausgabe");
    return (
      <Panel
        key={"ausgabe_" + this.props.ausgabeId}
        headerText={this.props.title}
        className="custom-padding-bottom-10px"
        headerControls={
          <ActionButton
            data-info-title={this.props.title + " löschen"}
            data-info-desc={this.props.title + " löschen"}
            iconProps={{
              iconName: "Delete",
              className: "img-font-size-large"
            }}
            onClick={this.deleteClicked}
          />
        }
      >
        {
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-lg6">
              <TextField
                placeholder="Beschreibung der Ausgabe (z.B. Tanken)"
                required={true}
                label="Beschreibung der Ausgabe"
                value={this.props.ausgabeModel.description}
                onChanged={this.onDescriptionChanged}
              />
            </div>
            <div className="ms-Grid-col ms-sm12 ms-lg6">
              <NumberTextField
                placeholder="Ausgaben in Euro"
                label="Wert der Ausgabe"
                required={true}
                numberValue={this.props.ausgabeModel.value}
                suffix="Euro"
                onChanged={this.onValueChanged}
              />
            </div>
          </div>
        }
      </Panel>
    );
  }
}
