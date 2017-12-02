import * as React from "react";
import { Link } from "react-router-dom";
import { Status } from "./routing";

export interface IToolTipProps {
    Title: string;
    Description: string;
}
export class ToolTip extends React.PureComponent<IToolTipProps, {}> {
    render() {
        return (
            <div style={{ minWidth: "150px" }}>
                <div className="ms-CalloutExample-header" style={{ padding: "18px 24px 12px" }}>
                    <span className="ms-fontColor-themePrimary ms-fontWeight-semibold ms-font-l ms-fontSize-l">
                        {this.props.Title}
                    </span>
                </div>
                <div className="ms-CalloutExample-inner" style={{ height: "100%", padding: "0 24px 20px" }}>
                    <div className="ms-font-l ms-fontSize-m">
                        <p className="ms-CalloutExample-subText">
                            {this.props.Description}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}