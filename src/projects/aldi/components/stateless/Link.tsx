import * as React from "react";
import {
  ActionButton,
  TextField,
  Label,
  Link as OfficeLink
} from "office-ui-fabric-react";
import { BasePage } from "../../../../global/components/container/basePage";
import { ILinkModel } from "../../../../interfaces/aldi";
import { NumberTextField } from "../../../../global/components/simple/NumberTextField";
import { Panel } from "../../../../global/components/simple/Panel";

export interface ILinkProps {
  linkModel: ILinkModel;
  linkId: string;
  title: string;
  onDeleteClick(id: string): void;
  onLinkHrefChanged(id: string, value: string): void;
}
const defaultOption = <option key="-1">Bitte einen Wert angeben</option>;
export class Link extends React.PureComponent<ILinkProps, {}> {
  constructor(props) {
    super(props);
    this.deleteLinkClicked = this.deleteLinkClicked.bind(this);
    this.onLinkHrefChanged = this.onLinkHrefChanged.bind(this);
  }
  private deleteLinkClicked() {
    this.props.onDeleteClick(this.props.linkId);
  }
  private onLinkHrefChanged(value: string) {
    this.props.onLinkHrefChanged(this.props.linkId, value);
  }
  render() {
    console.log("render Link");
    return (
      <div className="ms-Grid-row" key={"link_comp_" + this.props.linkId}>
        <div className="ms-Grid-col ms-sm2 ms-lg1">
          <Label>
            <OfficeLink
              href={this.props.linkModel.link}
              disabled={!this.props.linkModel.link}
              target="_blank"
            >
              {this.props.title}
            </OfficeLink>
          </Label>
        </div>
        <div className="ms-Grid-col ms-sm8 ms-lg-10">
          <TextField
            placeholder="Link eingeben"
            value={this.props.linkModel.link}
            onChanged={this.onLinkHrefChanged}
          />
        </div>
        <div className="ms-Grid-col ms-sm2 ms-lg1">
          <ActionButton
            data-info-title="Link entfernen"
            data-info-desc="Löscht den Link"
            iconProps={{
              iconName: "Delete",
              className: "img-font-size-large"
            }}
            onClick={this.deleteLinkClicked}
          />
        </div>
      </div>
    );
  }
}
