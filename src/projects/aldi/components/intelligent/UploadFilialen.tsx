import * as React from "react";
import Axios from "axios";
import {
  TextField,
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  MarqueeSelection,
  IColumn,
  SelectionMode,
  IconButton,
  ContextualMenu,
  ContextualMenuItemType,
  DirectionalHint,
  Label
} from "office-ui-fabric-react";
import {
  IRouteViewModel,
  IRouteModel,
  IFilialeModel
} from "../../../../interfaces/aldi";
import { routeOverviewColumns } from "../../configuration/routenColumns";
import { Fragment } from "react";
import { ButtonRow } from "../../../../global/components/simple/ButtonRow";
import { isNumber } from "util";
import {
  getGermanDateTimeString,
  getGermanDateString
} from "../../../../helper/date";
import { promise_all_custom } from "../../../../helper/promise";
interface IUploadReport {
  import: any[];
  importCount: number;
  skipCount: number;
  messages: string[];
}
export interface IUploadFilialenProps {
  routes: IRouteModel[];
  uploadFinished(): void;
  cancelClick(): void;
}
export class UploadFilialen extends React.Component<IUploadFilialenProps, {}> {
  textareaElement: HTMLTextAreaElement = undefined;
  selectRouteElement: HTMLSelectElement = undefined;
  constructor(props) {
    super(props);

    this.uploadClick = this.uploadClick.bind(this);
    this.setTextareaElement = this.setTextareaElement.bind(this);
    this.setSelectRouteElement = this.setSelectRouteElement.bind(this);
  }

  private saveFilialen(filialen: IFilialeModel[]): Promise<any[]> {
    let filialPromises = filialen.map((filiale, index) => {
      return Axios.post("/api/filialen", {
        filiale
      });
    });
    return promise_all_custom(filialPromises);
  }
  private parseNumber(value: string): number {
    value = value.replace(/,/g, ".");
    value = value.replace(/[^0-9.]/g, "");
    let returnValue = parseFloat(value);

    if (isNaN(returnValue)) {
      return -1;
    }
    return returnValue;
  }
  private createFilialen(value: string): IUploadReport {
    let ret: IUploadReport = {
      import: [],
      importCount: 0,
      skipCount: 0,
      messages: []
    };

    if (!value) {
      ret.messages.push("Kein Initialwert übergeben");
      return ret;
    }
    let filialen = value.split("\n");
    if (!filialen || filialen.length === 0) {
      ret.messages.push("Es konnten keine Filialen ausgelesen werden");
      return ret;
    }

    let selectedRoute = "";
    if (this.selectRouteElement && this.selectRouteElement.options.length > 0) {
      selectedRoute = this.selectRouteElement.options[
        this.selectRouteElement.selectedIndex
      ].value;
    }
    filialen.forEach(filiale => {
      let rows = filiale.split("\t");
      if (!rows || rows.length < 7) {
        ret.messages.push(
          "Es konnten keine Filial-Eigenschaften ausgelesen werden. [Wert: " +
            filiale +
            "]"
        );
        ret.skipCount += 1;
        return;
      }
      let model: IFilialeModel = {
        timestamp: Date.now(),
        ausgaben: this.parseNumber(rows[0].trim()),
        einnahmen: this.parseNumber(rows[1].trim()),
        plz: this.parseNumber(rows[2].trim()),
        ort: rows[3].trim(),
        strasse: rows[4].trim(),
        pkz: this.parseNumber(rows[5].trim()),
        testnummer: this.parseNumber(rows[6].trim()),
        route_id: selectedRoute
      };
      ret.importCount += 1;
      ret.import.push(model);
    });
    return ret;
  }
  private uploadClick() {
    let filialen = this.createFilialen(
      this.textareaElement ? this.textareaElement.value : ""
    );
    this.saveFilialen(filialen.import)
      .then(r => {
        if (r.length === filialen.importCount) {
          alert("OK");
          this.props.uploadFinished();
        } else {
          alert("NIX OK");
        }
        return null;
      })
      .catch(error => {
        alert("Globaler Error in saveFilialen");
      });
    // this.props.uploadClick(filialen.import);
  }
  private setTextareaElement(element) {
    this.textareaElement = element;
  }
  private setSelectRouteElement(element) {
    this.selectRouteElement = element;
  }
  render() {
    console.log("render UploadFilialen");
    return (
      <Fragment>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <div style={{ padding: "25px" }}>
              <Label>{"Routenfahrt auswählen"}</Label>
              <select ref={this.setSelectRouteElement}>
                {this.props.routes.map((route, index) => {
                  return (
                    <option value={route._id} key={"r_" + index}>
                      {getGermanDateString(new Date(route.route_timestamp))}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <textarea
              rows={20}
              ref={this.setTextareaElement}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <ButtonRow
              saveButtonProps={{
                text: "Upload",
                disabled: false,
                checked: false,
                onClickFunc: this.uploadClick
              }}
              cancelButtonProps={{
                text: "Abbrechen",
                disabled: false,
                checked: false,
                onClickFunc: this.props.cancelClick
              }}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
