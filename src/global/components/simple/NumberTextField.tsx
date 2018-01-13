import * as React from "react";
import { TextField, ITextFieldProps } from "office-ui-fabric-react";

export interface INumberTextFieldProps extends ITextFieldProps {
  numberValue?: number;
  numberValueChanged?(value: number);
}

export class NumberTextField extends React.Component<
  INumberTextFieldProps,
  {}
> {
  constructor(props) {
    super(props);
    this.valueChanged = this.valueChanged.bind(this);
  }
  private valueChanged(value: string) {
    let v = value.replace(",", ".");
    let n = parseFloat(v);
    n = isNaN(n) ? 0 : n;
    this.props.onChanged(n);
    if (this.props.numberValueChanged) {
      this.props.numberValueChanged(n);
    }
  }

  validateNumber = function(value) {
    return isNaN(Number(value))
      ? "The value should be a number, actual is " + value + "."
      : "";
  };
  render() {
    let v = this.props.numberValue || this.props.value || "";
    return (
      <TextField
        value={v.toString()}
        placeholder={this.props.placeholder}
        type="number"
        prefix={this.props.prefix}
        suffix={this.props.suffix}
        required={this.props.required}
        label={this.props.label}
        onGetErrorMessage={this.validateNumber}
        onChanged={this.valueChanged}
      />
    );
  }
}
