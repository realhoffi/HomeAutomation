import * as React from "react";
export interface IApplicationProps {
    requestUrl: string;
}
export interface IApplicationState {
    showModal: boolean;
    modalContent: JSX.Element;
    isCalloutVisible: boolean;
    callOutContent: JSX.Element;
}
import debug = require("debug");
import { CommandBarButton, BaseButton, Button, Callout } from "office-ui-fabric-react";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { ManageRoute } from "./ManageRoute";
import { PageType } from "../../../../data/enums";
import { SyntheticEvent, MouseEventHandler } from "react";
import { CalloutContent } from "office-ui-fabric-react/lib/components/Callout/CalloutContent";
import { ToolTip } from "../../../../global/components/simple/ToolTip";
export class Application extends React.Component<IApplicationProps, IApplicationState> {
    private targetCallOutElement: HTMLElement | null;
    constructor(props) {
        super(props);
        this.state = { modalContent: undefined, showModal: false, isCalloutVisible: false, callOutContent: undefined };

        this.addRouteClick = this.addRouteClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showCallOut = this.showCallOut.bind(this);
        this.hideCallOut = this.hideCallOut.bind(this);
    }
    componentDidMount() {
        document.title = "Aldi Hauptseite";
    }

    private addRouteClick() {
        let c = <ManageRoute onExitPage={this.closeModal} pageType={PageType.Add} />;
        this.setState({ showModal: true, modalContent: c });
        this.hideCallOut();
    }
    private closeModal() {
        this.setState({ showModal: false, modalContent: undefined });
    }
    private showCallOut(event: React.SyntheticEvent<HTMLAnchorElement | HTMLButtonElement | BaseButton | Button>) {
        console.log("MouseIn - " + event.target["tagName"]);
        if (this.state.isCalloutVisible || this.state.showModal) {
            return;
        }
        this.targetCallOutElement = event.target as any;
        let title = this.targetCallOutElement.hasAttribute("data-info-title") ? this.targetCallOutElement.getAttribute("data-info-title") : "";
        let description = this.targetCallOutElement.hasAttribute("data-info-desc") ? this.targetCallOutElement.getAttribute("data-info-desc") : "";

        if (!title && !description) {
            return;
        }
        this.setState({ isCalloutVisible: true, callOutContent: <ToolTip Title={title} Description={description} /> });
        return false;
    }
    private hideCallOut() {
        console.log("MouseOut");
        this.targetCallOutElement = null;
        this.setState({ isCalloutVisible: false, callOutContent: undefined });
        return false;
    }
    render() {
        return <div className="ms-Grid-row">
            {
                (this.state.modalContent && this.state.showModal) &&
                <div className="ms-Grid-col ms-sm12">
                    {this.state.modalContent}
                </div>
            }
            {
                (this.state.showModal === false) &&
                <div className="ms-Grid-col ms-sm12">
                    < div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-lg4">
                            <div className="custom-cmd-button"  >
                                <CommandBarButton data-info-title="Route erfassen" data-info-desc="Erstellt eine neue Route für Aldi"
                                    iconProps={{ iconName: "Add" }}
                                    text="Route erfassen"
                                    onClick={this.addRouteClick}
                                    onMouseEnter={this.showCallOut}
                                    onMouseLeave={this.hideCallOut}
                                />
                            </div>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg4">
                            <div className="custom-cmd-button">
                                <CommandBarButton
                                    iconProps={{ iconName: "Add" }}
                                    text="Filialen erfassen"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                this.state.isCalloutVisible &&
                <div>
                    <Callout
                        role={"alertdialog"}
                        ariaLabelledBy={"callout-label-2"}
                        className="ms-CalloutExample-callout"
                        gapSpace={0}
                        target={this.targetCallOutElement}
                        onDismiss={this.hideCallOut}
                        setInitialFocus={true}>
                        {
                            this.state.callOutContent
                        }
                    </Callout>
                </div>
            }
        </div >;
    }
}