import * as React from "react";
import { CommandBarButton } from "office-ui-fabric-react";
import { PageType } from "../../../../data/enums";

export interface IManageRouteProps {
    pageType: PageType;
}

export class ManageRoute extends React.Component<IManageRouteProps, {}> {
    constructor(props) {
        super(props);
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
    render() {
        return <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                    <div className="custom-cmd-button">
                        <CommandBarButton
                            iconProps={{ iconName: "Add" }}
                            text="Route erfassen"
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
            </div>
        </div>;
    }
}