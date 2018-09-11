import * as React from "react";
import { ActionButton } from "office-ui-fabric-react";
export interface IButtonProperties {
  disabled: boolean;
  checked: boolean;
  text: string;
  onClickFunc(): void;
}
export interface IButtonRowProps {
  saveButtonProps: IButtonProperties;
  cancelButtonProps: IButtonProperties;
}
export class ButtonRow extends React.PureComponent<IButtonRowProps, {}> {
  render() {
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-textAlignRight">
          <ActionButton
            data-automation-id="save"
            key={"save_btn_" + Date.now()}
            iconProps={{ iconName: "Save" }}
            disabled={this.props.saveButtonProps.disabled}
            checked={this.props.saveButtonProps.checked}
            onClick={this.props.saveButtonProps.onClickFunc}
          >
            {this.props.saveButtonProps.text}
          </ActionButton>
          <ActionButton
            data-automation-id="cancel"
            key={"cancel_btn_" + Date.now()}
            iconProps={{ iconName: "Cancel" }}
            disabled={this.props.cancelButtonProps.disabled}
            checked={this.props.cancelButtonProps.checked}
            onClick={this.props.cancelButtonProps.onClickFunc}
          >
            {this.props.cancelButtonProps.text}
          </ActionButton>
        </div>
      </div>
    );
  }
}
