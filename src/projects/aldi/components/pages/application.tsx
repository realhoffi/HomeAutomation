import * as React from "react";
import Axios from "axios";
import {
  CommandBarButton,
  BaseButton,
  Button,
  Callout,
  CommandBar
} from "office-ui-fabric-react";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { ManageRoute } from "./manageRoute";
import { PageType } from "../../../../enums/enums";
import { SyntheticEvent, MouseEventHandler, Fragment } from "react";
import { CalloutContent } from "office-ui-fabric-react/lib/components/Callout/CalloutContent";
import { ToolTip } from "../../../../global/components/simple/ToolTip";
import { Routenuebersicht } from "../intelligent/Routenuebersicht";
import {
  IRouteModel,
  IRouteViewModel,
  IFilialeModel,
  IFilialeViewModel
} from "../../../../interfaces/aldi";
import { UploadRoutes } from "../intelligent/UploadRoutes";
import { UploadFilialen } from "../intelligent/UploadFilialen";
import {
  promise_all_custom,
  ICustomPromiseResult
} from "../../../../helper/promise";
import { Filialuebersicht } from "../intelligent/Filialuebersicht";
import { Panel } from "../../../../global/components/simple/Panel";
import { Filiale } from "../intelligent/Filiale";
// import { BaseUebersicht } from "../../../../global/components/simple/BaseUebersicht";

export interface IApplicationProps {
  requestUrl: string;
}
export interface IApplicationState {
  showModal: boolean;
  modalContent: JSX.Element;
  isCalloutVisible: boolean;
  callOutContent: JSX.Element;
  routen: IRouteViewModel[];
  selectedRoutes: IRouteViewModel[];
  filialen: IFilialeViewModel[];
  selectedFilialen: IFilialeViewModel[];
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
      routen: [],
      selectedRoutes: [],
      filialen: [],
      selectedFilialen: []
    };
    this.addRouteClick = this.addRouteClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showCallOut = this.showCallOut.bind(this);
    this.hideCallOut = this.hideCallOut.bind(this);

    this.sortRoutesByPropertyName = this.sortRoutesByPropertyName.bind(this);
    this.sortFilialenByPropertyName = this.sortFilialenByPropertyName.bind(
      this
    );

    this.filialeSelectionChanged = this.filialeSelectionChanged.bind(this);
    this.routeSelectionChanged = this.routeSelectionChanged.bind(this);

    this.deleteSelectedRoutes = this.deleteSelectedRoutes.bind(this);
    this.deleteSelectedFilialen = this.deleteSelectedFilialen.bind(this);

    this.routeUploaded = this.routeUploaded.bind(this);
    this.showUploadRoutesClick = this.showUploadRoutesClick.bind(this);
    this.uploadFilialen = this.uploadFilialen.bind(this);
    this.showUploadFilialenClick = this.showUploadFilialenClick.bind(this);

    this.editRoute = this.editRoute.bind(this);
    this.deleteRoutes = this.deleteRoutes.bind(this);

    this.editFiliale = this.editFiliale.bind(this);
    this.deleteFilialen = this.deleteFilialen.bind(this);

    this.deleteSelectedItems = this.deleteSelectedItems.bind(this);
    this.filialeSavedClick = this.filialeSavedClick.bind(this);
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
  private getFilialViewModelByRouteModel(items: IFilialeModel[]) {
    return items.map((item: IFilialeModel, index) => {
      return {
        index: index + 1,
        _id: item._id,
        created: item.created,
        einnahmen: item.einnahmen,
        ausgaben: item.ausgaben,
        modified: item.modified,
        timestamp: item.timestamp,
        fahrdatum: -1,
        ort: item.ort,
        pkz: item.pkz,
        plz: item.plz,
        strasse: item.strasse,
        testnummer: item.testnummer
      } as IFilialeViewModel;
    });
  }
  componentDidMount() {
    document.title = "Aldi Hauptseite";
    let promises = [this.reloadRouten()]; // , this.reloadFilialen()

    promise_all_custom(promises)
      .then(results => {
        if (!results) {
          alert("Fehler beim Laden der Elemente!");
          return;
        }
        this.setState({
          routen: results[0].data || []
          //   filialen: results[1].data || []
        });
        results.forEach((r: ICustomPromiseResult, index) => {
          if (r.isError) {
            switch (index) {
              case 1:
                alert("Routen konnten nicht geladen werden");
                break;
              case 2:
                alert("Filialen konnten nicht geladen werden");
                break;
            }
          }
        });
      })
      .catch(e => {
        console.log("Fehler beim Laden der Elemente!", JSON.stringify(e));
        alert("Fehler beim Laden der Elemente!");
      });
  }
  private routeSelectionChanged(routes: IRouteViewModel[]) {
    this.setState({ selectedRoutes: routes });
  }
  private filialeSelectionChanged(filialen: IFilialeViewModel[]) {
    this.setState({ selectedFilialen: filialen });
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
  private loadFilialen() {
    return new Promise((resolve, reject) => {
      Axios.get("/api/filialen")
        .then(results => {
          resolve(results.data);
        })
        .catch(() => {
          reject();
        });
    });
  }
  private deleteFilialeElement(route: IFilialeViewModel) {
    return Axios.delete("/api/filialen/" + route._id);
  }
  private deleteRouteElement(route: IRouteViewModel) {
    return Axios.delete("/api/routen/" + route._id);
  }
  private deleteSelectedItems() {
    if (
      this.state.selectedFilialen.length < 1 &&
      this.state.selectedRoutes.length < 1
    ) {
      return;
    }
    promise_all_custom([
      this.deleteSelectedRoutes(),
      this.deleteSelectedFilialen()
    ])
      .then(() => {
        this.setState({ selectedFilialen: [], selectedRoutes: [] });
      })
      .catch(() => {
        alert("grober fehler deleteSelectedItems");
      });
  }
  private sortElement(a, b, propertyName, descending: boolean = false): number {
    let r = 0;
    if (!a.hasOwnProperty(propertyName) || !b.hasOwnProperty(propertyName)) {
    } else if (a[propertyName] < b[propertyName]) {
      r = 1;
    } else if (a[propertyName] > b[propertyName]) {
      r = -1;
    } else {
      r = 0;
    }
    return descending ? r * -1 : r;
  }
  private sortRoutesByPropertyName(
    propertyName: string,
    descending: boolean
  ): IRouteViewModel[] {
    return this.state.routen.sort((a: IRouteViewModel, b: IRouteViewModel) => {
      return this.sortElement(a, b, propertyName, descending);
    });
  }
  private sortFilialenByPropertyName(
    propertyName: string,
    descending: boolean
  ): IFilialeViewModel[] {
    return this.state.filialen.sort(
      (a: IFilialeViewModel, b: IFilialeViewModel) => {
        return this.sortElement(a, b, propertyName, descending);
      }
    );
  }
  private showUploadFilialenClick() {
    this.setState({
      showModal: true,
      modalContent: (
        <UploadFilialen
          uploadFinished={this.uploadFilialen}
          cancelBtnClick={this.closeModal}
          routes={this.state.routen}
        />
      )
    });
  }
  private reloadFilialen(): Promise<IFilialeViewModel[]> {
    return new Promise((resolve, reject) => {
      this.loadFilialen()
        .then((data: IFilialeModel[]) => {
          let items: IFilialeViewModel[] = this.getFilialViewModelByRouteModel(
            data
          );
          resolve(items);
        })
        .catch(() => {
          alert("Fehler beim Laden der Filialen");
        });
    });
  }
  private reloadRouten(): Promise<IRouteViewModel[]> {
    return new Promise((resolve, reject) => {
      this.loadRouten()
        .then((data: IRouteModel[]) => {
          let items: IRouteViewModel[] = this.getRouteViewModelByRouteModel(
            data
          );
          resolve(items);
        })
        .catch(() => {
          alert("Fehler beim Laden der Filialen");
        });
    });
  }
  private uploadFilialen() {
    this.reloadFilialen()
      .then((data: IFilialeViewModel[]) => {
        this.setState({ filialen: data }, () => {
          this.closeModal();
        });
      })
      .catch(() => {
        alert("Fehler beim Laden der Filialen");
      });
  }
  private deleteSelectedRoutes(): Promise<any> {
    return this.deleteRoutes(this.state.selectedRoutes);
  }
  private deleteSelectedFilialen(): Promise<any> {
    return this.deleteFilialen(this.state.selectedFilialen);
  }
  private showUploadRoutesClick() {
    this.setState({
      showModal: true,
      modalContent: (
        <UploadRoutes
          uploadClick={this.routeUploaded}
          cancelClick={this.closeModal}
        />
      )
    });
  }
  private routeUploaded(routes: IRouteModel[]) {
    this.reloadRouten()
      .then((data: IRouteViewModel[]) => {
        this.setState({ routen: data }, () => {
          this.closeModal();
        });
      })
      .catch(() => {
        alert("Fehler beim Laden der Routen");
      });
  }
  private addRouteClick() {
    this.setState({
      showModal: true,
      modalContent: (
        <ManageRoute onExitPage={this.closeModal} pageType={PageType.Add} />
      )
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
  private deleteFilialen(filialElements: IFilialeViewModel[]) {
    return new Promise((resolve, reject) => {
      let promises = [];
      filialElements.forEach(filiale => {
        promises.push(this.deleteFilialeElement(filiale));
      });
      promise_all_custom(promises)
        .then(() => {
          return this.reloadFilialen();
        })
        .then((data: IFilialeViewModel[]) => {
          this.setState({ filialen: data }, () => {
            resolve();
          });
        })
        .catch(() => {
          alert("Grober Fehler!");
          reject();
        });
    });
  }
  private deleteRoutes(routeElements: IRouteViewModel[]) {
    return new Promise((resolve, reject) => {
      let promises = [];
      routeElements.forEach(routeElement => {
        promises.push(this.deleteRouteElement(routeElement));
      });
      promise_all_custom(promises)
        .then(() => {
          return this.reloadRouten();
        })
        .then((data: IRouteViewModel[]) => {
          this.setState({ routen: data }, () => {
            resolve();
          });
        })
        .catch(() => {
          alert("Grober Fehler!");
          reject();
        });
    });
  }
  private filialeSavedClick() {
    this.reloadFilialen().then(r => {
      let newState = { ...this.state };
      this.closeModal(newState);
      newState.filialen = r;
      this.setState(newState);
      return null;
    });
    return null;
  }
  private editRoute(routeElement: IRouteViewModel) {}
  private editFiliale(filialElement: IFilialeViewModel) {
    this.setState({
      showModal: true,
      modalContent: (
        <Filiale
          cancel_clicked={this.closeModal}
          pageType={PageType.Edit}
          filialeId={filialElement._id}
          headerText="Filiale bearbeiten"
          ok_clicked={this.filialeSavedClick}
        />
      )
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
            <CommandBar
              isSearchBoxVisible={true}
              items={[
                {
                  key: "newItem",
                  name: "New",
                  icon: "Add",
                  items: [
                    {
                      key: "newroute",
                      name: "Route",
                      icon: "Mail",
                      onClick: this.addRouteClick
                    },
                    {
                      key: "newfiliale",
                      name: "Neue Filiale",
                      icon: "Calendar"
                    }
                  ]
                },
                {
                  key: "import",
                  name: "Import",
                  icon: "import",
                  items: [
                    {
                      key: "uploadroutes",
                      name: "Routen",
                      icon: "Mail",
                      onClick: this.showUploadRoutesClick
                    },
                    {
                      key: "uploadsfilalen",
                      name: "Filialen",
                      icon: "Calendar",
                      onClick: this.showUploadFilialenClick
                    }
                  ]
                },
                {
                  key: "delete",
                  name: "Löschen",
                  icon: "delete",
                  onClick: this.deleteSelectedItems
                }
              ]}
            />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <Panel
              headerText="Routenübersicht"
              className="custom-padding-bottom-10px custom-padding-top-10px"
            >
              <Routenuebersicht
                items={this.state.routen}
                sortByPropertyName={this.sortRoutesByPropertyName}
                onDeleteRouteClicked={this.deleteRoutes}
                onEditRouteClick={this.editRoute}
                selectionChanged={this.routeSelectionChanged}
              />
            </Panel>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <Panel
              headerText="Filialübersicht"
              className="custom-padding-bottom-10px"
            >
              <Filialuebersicht
                onEditFilialeClick={this.editFiliale}
                commandbarItems={[
                  {
                    key: "newItem",
                    name: "New",
                    icon: "Add",
                    disabled: true
                  },
                  {
                    key: "import",
                    name: "Import",
                    icon: "import",
                    onClick: this.showUploadFilialenClick
                  }
                ]}
              />
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
