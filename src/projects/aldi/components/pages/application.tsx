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
        let c = <ManageRoute pageType={PageType.Add} />;
        this.setState({ showModal: true, modalContent: c });
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
        let calloutContent = <div style={{ minWidth: "150px" }}>
            <div className="ms-CalloutExample-header" style={{ padding: "18px 24px 12px" }}>
                <span className="ms-fontColor-themePrimary ms-fontWeight-semibold ms-font-l ms-fontSize-l">
                    {title}
                </span>
            </div>
            <div className="ms-CalloutExample-inner" style={{ height: "100%", padding: "0 24px 20px" }}>
                <div className="ms-font-l ms-fontSize-m">
                    <p className="ms-CalloutExample-subText">
                        {description}
                    </p>
                </div>
            </div>
        </div>;

        this.setState({ isCalloutVisible: true, callOutContent: calloutContent });
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
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
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
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                <div className="custom-cmd-button">
                    <CommandBarButton
                        iconProps={{ iconName: "Add" }}
                        text="Filialen erfassen"
                    />
                </div>
            </div>
            <Modal
                isOpen={this.state.showModal}
                onDismiss={this.closeModal}
                isBlocking={true}
                isDarkOverlay={true}
                closeButtonAriaLabel="Schließen"
                containerClassName="custom-modal-container-fullSize">
                {this.state.modalContent}
            </Modal>
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
        </div>;
    }
}