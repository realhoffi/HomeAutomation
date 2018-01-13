import * as React from "react";
import {
  ActionButton,
  TextField,
  Label,
  Link as OfficeLink,
  DatePicker
} from "office-ui-fabric-react";
import { BasePage } from "../../../../global/components/container/basePage";
import { ILinkModel } from "../../../../interfaces/aldi";
import { NumberTextField } from "../../../../global/components/simple/NumberTextField";
import { Panel } from "../../../../global/components/simple/Panel";
import { getGermanDateString } from "../../../../helper/date";

export interface IRoutenfahrtProps {
  value: Date;
  routenfahrtId: string;
  title: string;
  onDeleteClick(id: string): void;
  onDateChanged(id: string, value: Date): void;
}
const defaultOption = <option key="-1">Bitte einen Wert angeben</option>;
export class Routenfahrt extends React.PureComponent<IRoutenfahrtProps, {}> {
  constructor(props) {
    super(props);
    this.deleteRoutenfahrtClicked = this.deleteRoutenfahrtClicked.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
  }
  private deleteRoutenfahrtClicked() {
    this.props.onDeleteClick(this.props.routenfahrtId);
  }
  private dateChanged(date: Date | null | undefined) {
    this.props.onDateChanged(this.props.routenfahrtId, date);
  }
  render() {
    console.log("render Routenfahrt");
    return (
      <div className="ms-Grid-row" key={"route_" + this.props.routenfahrtId}>
        <div className="ms-Grid-col ms-sm2 ms-md1 ms-lg1">
          <Label className="ms-fontSize-l ms-textAlignCenter">
            {this.props.title}
          </Label>
        </div>
        <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg6">
          <DatePicker
            placeholder="Bitte Routenfahrdatum auswählen"
            showWeekNumbers={true}
            showMonthPickerAsOverlay={true}
            allowTextInput={false}
            formatDate={getGermanDateString}
            firstDayOfWeek={1}
            key={"fahrt" + this.props.routenfahrtId}
            value={this.props.value}
            onSelectDate={this.dateChanged}
          />
        </div>
        <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg1">
          <ActionButton
            data-info-title="Fahrdatum entfernen"
            data-info-desc="Löscht das Fahrdatum"
            iconProps={{
              iconName: "Delete",
              className: "img-font-size-large"
            }}
            onClick={this.deleteRoutenfahrtClicked}
          />
        </div>
      </div>
    );
  }
}
