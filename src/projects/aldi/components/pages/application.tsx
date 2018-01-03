import * as React from "react";
import Axios from "axios";
import {
  CommandBarButton,
  BaseButton,
  Button,
  Callout
} from "office-ui-fabric-react";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { ManageRoute } from "./manageRoute";
import { PageType } from "../../../../enums/enums";
import { SyntheticEvent, MouseEventHandler } from "react";
import { CalloutContent } from "office-ui-fabric-react/lib/components/Callout/CalloutContent";
import { ToolTip } from "../../../../global/components/simple/ToolTip";
import { Routenuebersicht } from "../intelligent/Routenuebersicht";
import { IRouteModel, IRouteViewModel } from "../../../../interfaces/aldi";

export interface IApplicationProps {
  requestUrl: string;
}
export interface IApplicationState {
  showModal: boolean;
  modalContent: JSX.Element;
  isCalloutVisible: boolean;
  callOutContent: JSX.Element;
  routen: IRouteViewModel[];
}

export class Application extends React.Component<
  IApplicationProps,
  IApplicationState
> {
  private targetCallOutElement: HTMLElement | null;
  constructor(props) {
    super(props);
    this.state = {
      modalContent: undefined,
      showModal: false,
      isCalloutVisible: false,
      callOutContent: undefined,
      routen: []
    };

    this.addRouteClick = this.addRouteClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showCallOut = this.showCallOut.bind(this);
    this.hideCallOut = this.hideCallOut.bind(this);
    this.sortItemsByPropertyName = this.sortItemsByPropertyName.bind(this);

    this.editRoute = this.editRoute.bind(this);
    this.deleteRoute = this.deleteRoute.bind(this);
  }
  private getRouteViewModelByRouteModel(items: IRouteModel[]) {
    return items.map((item: IRouteModel, index) => {
      return {
        filialen: undefined,
        index: index + 1,
        ...item
      } as IRouteViewModel;
    });
  }
  componentDidMount() {
    document.title = "Aldi Hauptseite";
    this.loadRouten()
      .then((data: IRouteModel[]) => {
        let items: IRouteViewModel[] = this.getRouteViewModelByRouteModel(data);
        this.setState({ routen: items });
      })
      .catch(() => {
        alert("Fehler beim laden der Routen");
      });
  }
  private loadRouten() {
    return new Promise((resolve, reject) => {
      Axios.get("/api/routen")
        .then(results => {
          resolve(results.data);
        })
        .catch(() => {
          reject();
        });
    });
  }
  private deleteRouteElement(route: IRouteViewModel) {
    return new Promise((resolve, reject) => {
      Axios.delete("/api/routen/" + route._id)
        .then(results => {
          resolve(results.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  private sortItemsByPropertyName(
    propertyName: string,
    descending: boolean
  ): IRouteViewModel[] {
    if (descending) {
      return this.state.routen.sort(
        (a: IRouteViewModel, b: IRouteViewModel) => {
          if (
            !a.hasOwnProperty(propertyName) ||
            !b.hasOwnProperty(propertyName)
          ) {
            return 0;
          }
          if (a[propertyName] < b[propertyName]) {
            return 1;
          }
          if (a[propertyName] > b[propertyName]) {
            return -1;
          }
          return 0;
        }
      );
    } else {
      return this.state.routen.sort(
        (a: IRouteViewModel, b: IRouteViewModel) => {
          if (
            !a.hasOwnProperty(propertyName) ||
            !b.hasOwnProperty(propertyName)
          ) {
            return 0;
          }
          if (a[propertyName] < b[propertyName]) {
            return -1;
          }
          if (a[propertyName] > b[propertyName]) {
            return 1;
          }
          return 0;
        }
      );
    }
  }
  private addRouteClick() {
    let c = (
      <ManageRoute onExitPage={this.closeModal} pageType={PageType.Add} />
    );
    this.setState({ showModal: true, modalContent: c });
    this.hideCallOut();
  }
  private closeModal() {
    this.setState({ showModal: false, modalContent: undefined });
  }
  private showCallOut(
    event: React.SyntheticEvent<
      HTMLAnchorElement | HTMLButtonElement | BaseButton | Button
    >
  ) {
    console.log("MouseIn - " + event.target["tagName"]);
    if (this.state.isCalloutVisible || this.state.showModal) {
      return;
    }
    this.targetCallOutElement = event.target as any;
    let title = this.targetCallOutElement.hasAttribute("data-info-title")
      ? this.targetCallOutElement.getAttribute("data-info-title")
      : "";
    let description = this.targetCallOutElement.hasAttribute("data-info-desc")
      ? this.targetCallOutElement.getAttribute("data-info-desc")
      : "";

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
  private deleteRoute(routeElement: IRouteViewModel) {
    this.deleteRouteElement(routeElement)
      .then((result: any) => {
        return this.loadRouten();
      })
      .then((data: IRouteModel[]) => {
        let items: IRouteViewModel[] = this.getRouteViewModelByRouteModel(data);
        this.setState({ routen: items });
      })
      .catch((error: any) => {
        debugger;
        let n = "";
      });
  }
  private editRoute(routeElement: IRouteViewModel) {}
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
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-lg4">
              <div className="custom-cmd-button">
                <CommandBarButton
                  data-info-title="Route erfassen"
                  data-info-desc="Erstellt eine neue Route für Aldi"
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
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <Routenuebersicht
              items={this.state.routen}
              sortByPropertyName={this.sortItemsByPropertyName}
              deleteRoute={this.deleteRoute}
              editRoute={this.editRoute}
            />
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
      </div>
    );
  }
}
