import * as React from "react";
import { IconButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { Icon, IconType } from "office-ui-fabric-react/lib/Icon";

export interface IPanelState {
    isContentVisible: boolean;
}
export interface IPanelProps {
    headerText: string;
    className?: string;
    isCollapsed?: boolean;
    canToggleContentHidden?: boolean;
    headerControls?: any;
}
export class Panel extends React.PureComponent<IPanelProps, IPanelState> {

    constructor(props) {
        super(props);
        this.state = {
            isContentVisible: !this.props.isCollapsed
        };
        this.linkClicked = this.linkClicked.bind(this);
    }
    public static defaultProps: IPanelProps = {
        headerText: "Kein Text",
        className: "",
        isCollapsed: false,
        canToggleContentHidden: true,
        headerControls: null
    };
    linkClicked(e) {
        if (this.props.canToggleContentHidden === false) {
            return false;
        }
        e.preventDefault();
        let newState = {
            ...this.state
        };
        newState.isContentVisible = !newState.isContentVisible;
        this.setState(newState);
        return false;
    }

    render() {
        // console.log("render Panel");
        let c = this.props.className || "";
        return <div className={c}>
            <div className="custom-border-settings ms-borderColor-neutralLighter">
                <div className="ms-bgColor-neutralLighter custom-panel-header">
                    <IconButton
                        disabled={false}
                        style={{ width: "40px", height: "36px" }}
                        checked={false}
                        iconProps={{ iconName: this.props.canToggleContentHidden ? (this.state.isContentVisible ? "ChevronUp" : "ChevronDownMed") : "blank" }}
                        title="Emoji"
                        ariaLabel="Emoji"
                        onClick={this.linkClicked} />
                    <div onClick={this.linkClicked} style={{ cursor: "pointer", width: this.props.headerControls ? "75%" : "100%" }}>
                        <span className="ms-font-xl ms-fontColor-themePrimary" >
                            {
                                this.props.headerText
                            }
                        </span>
                    </div>
                    {
                        this.props.headerControls &&
                        this.props.headerControls
                    }
                </div>
                {
                    this.state.isContentVisible &&
                    <div style={{ padding: "10px", paddingTop: "15px" }}>
                        {
                            this.props.children
                        }
                    </div>
                }
            </div>
        </div>;
    }
}

