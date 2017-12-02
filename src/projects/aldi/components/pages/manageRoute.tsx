import * as React from "react";
import { ActionButton } from "office-ui-fabric-react";
import { PageType } from "../../../../data/enums";
import { BasePage } from "../../../../global/components/container/basePage";
import { ButtonRow } from "../../../../global/components/simple/ButtonRow";

export interface IManageRouteProps {
    pageType: PageType;
    onExitPage(): void;
}

export class ManageRoute extends React.Component<IManageRouteProps, {}> {
    constructor(props) {
        super(props);
        this.cancelClick = this.cancelClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
    }
    componentDidMount() {
        let docTitle = "";
        switch (this.props.pageType) {
            case PageType.Display:
                docTitle = "Route anzeigen";
                break;
            case PageType.Edit:
                docTitle = "Route bearbeiten";
                break;
            case PageType.Add:
                docTitle = "Route hinzufügen";
                break;
            default:
                break;
        }
        document.title = docTitle;
    }
    private saveClick() {
        console.log("Save Click");
        this.props.onExitPage();
    }
    private cancelClick() {
        console.log("cancel Click");
        this.props.onExitPage();
    }
    render() {
        return <BasePage Body={
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                        <div className="" style={{ float: "right" }}>
                            <ButtonRow
                                saveButtonProps={{ checked: false, disabled: false, text: "Speichern", onClickFunc: this.saveClick }}
                                cancelButtonProps={{ checked: true, disabled: false, text: "Abbrechen", onClickFunc: this.cancelClick }} />
                        </div>
                    </div>
                </div>
            </div>
        } Header={
            <div className="ms-font-xxl ms-textAlignCenter">
                {"Route verwalten"}
            </div>
        } />;
    }
}
