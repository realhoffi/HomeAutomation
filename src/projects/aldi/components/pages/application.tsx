import * as React from "react";

import { BaseButton, Button } from "office-ui-fabric-react";
import { ManageRoute } from "./manageRoute";
import { PageType } from "../../../../enums/enums";
import { Fragment } from "react";
import { ToolTip } from "../../../../global/components/simple/ToolTip";
import { Routenuebersicht } from "../intelligent/Routenuebersicht";
import { IRouteModel, IRouteViewModel, IFilialeViewModel } from "../../../../interfaces/aldi";
import { UploadRoutes } from "../intelligent/UploadRoutes";
import { UploadFilialen } from "../intelligent/UploadFilialen";
import { Filialuebersicht } from "../intelligent/Filialuebersicht";
import { Panel } from "../../../../global/components/simple/Panel";
import { Filiale } from "../intelligent/Filiale";

export interface IApplicationProps {
  requestUrl: string;
}
export interface IApplicationState {
  showModal: boolean;
  modalContent: JSX.Element;
  isCalloutVisible: boolean;
  callOutContent: JSX.Element;
  selectedRoutes: IRouteViewModel[];
  selectedFilialen: IFilialeViewModel[];
}

export class Application extends React.Component<IApplicationProps, IApplicationState> {
  private targetCallOutElement: HTMLElement | null;
  constructor(props) {
    super(props);
    this.state = {
      modalContent: undefined,
      showModal: false,
      isCalloutVisible: false,
      callOutContent: undefined,
      selectedRoutes: [],
      selectedFilialen: []
    };

    this.closeModal = this.closeModal.bind(this);
    this.showCallOut = this.showCallOut.bind(this);
    this.hideCallOut = this.hideCallOut.bind(this);

    this.routeUploaded = this.routeUploaded.bind(this);
    this.showUploadRoutesClick = this.showUploadRoutesClick.bind(this);
    this.uploadFilialen = this.uploadFilialen.bind(this);
    this.showUploadFilialenClick = this.showUploadFilialenClick.bind(this);

    this.editRoute = this.editRoute.bind(this);
    this.addRouteClick = this.addRouteClick.bind(this);

    this.createFiliale = this.createFiliale.bind(this);
    this.editFiliale = this.editFiliale.bind(this);
    this.filialeSavedClick = this.filialeSavedClick.bind(this);
  }

  private showUploadFilialenClick() {
    this.setState({
      showModal: true,
      modalContent: <UploadFilialen uploadFinished={this.uploadFilialen} cancelBtnClick={this.closeModal} />
    });
  }
  private uploadFilialen() {
    this.closeModal();
  }

  private showUploadRoutesClick() {
    this.setState({
      showModal: true,
      modalContent: <UploadRoutes uploadClick={this.routeUploaded} cancelClick={this.closeModal} />
    });
  }
  private routeUploaded(routes: IRouteModel[]) {
    this.closeModal();
  }
  private addRouteClick() {
    this.setState({
      showModal: true,
      modalContent: <ManageRoute onExitPage={this.closeModal} pageType={PageType.Add} />
    });
    this.hideCallOut();
  }
  private closeModal(copiedState: IApplicationState = undefined) {
    if (copiedState) {
      copiedState.showModal = false;
      copiedState.modalContent = undefined;
      return copiedState;
    } else {
      this.setState({ showModal: false, modalContent: undefined });
    }
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
    this.setState({
      isCalloutVisible: true,
      callOutContent: <ToolTip Title={title} Description={description} />
    });
    return false;
  }
  private hideCallOut() {
    console.log("MouseOut");
    this.targetCallOutElement = null;
    this.setState({ isCalloutVisible: false, callOutContent: undefined });
    return false;
  }

  private filialeSavedClick() {
    this.closeModal();
  }
  private editRoute(routeElement: IRouteViewModel) {}
  private editFiliale(filialElement: IFilialeViewModel) {
    this.setState({
      showModal: true,
      modalContent: (
        <Filiale cancel_clicked={this.closeModal} pageType={PageType.Edit} filialeId={filialElement._id} headerText="Filiale bearbeiten" ok_clicked={this.filialeSavedClick} />
      )
    });
    this.hideCallOut();
  }
  private createFiliale() {
    this.setState({
      showModal: true,
      modalContent: <Filiale cancel_clicked={this.closeModal} pageType={PageType.Add} filialeId={null} headerText="Filiale hinzufügen" ok_clicked={this.filialeSavedClick} />
    });
    this.hideCallOut();
  }
  render() {
    console.log("render application");
    if (this.state.showModal && !!this.state.modalContent) {
      return (
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">{this.state.modalContent}</div>
        </div>
      );
    }
    return (
      <Fragment>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <Panel contentClass="custom-padding-top-10px" headerText="Routenübersicht" className="custom-padding-bottom-10px custom-padding-top-10px">
              <Routenuebersicht
                onEditRouteClick={this.editRoute}
                commandbarItems={[
                  {
                    key: "newItem",
                    name: "New",
                    icon: "Add",
                    onClick: this.addRouteClick
                  },
                  {
                    key: "import",
                    name: "Import",
                    icon: "import",
                    onClick: this.showUploadRoutesClick
                  }
                ]}
              />
            </Panel>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <Panel contentClass="custom-padding-top-10px" headerText="Filialübersicht" className="custom-padding-bottom-10px">
              <div>
                <Filialuebersicht
                  onEditFilialeClick={this.editFiliale}
                  commandbarItems={[
                    {
                      key: "newItem",
                      name: "New",
                      icon: "Add",
                      onClick: this.createFiliale
                    },
                    {
                      key: "import",
                      name: "Import",
                      icon: "import",
                      onClick: this.showUploadFilialenClick
                    }
                  ]}
                />
              </div>
            </Panel>
          </div>
        </div>
        {/* {this.state.isCalloutVisible && (
          <div>
            <Callout
              role={"alertdialog"}
              ariaLabelledBy={"callout-label-2"}
              className="ms-CalloutExample-callout"
              gapSpace={0}
              target={this.targetCallOutElement}
              onDismiss={this.hideCallOut}
              setInitialFocus={true}
            >
              {this.state.callOutContent}
            </Callout>
          </div>
        )} */}
      </Fragment>
    );
  }
}
