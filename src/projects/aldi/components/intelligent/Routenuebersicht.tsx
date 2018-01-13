import * as React from "react";
import Axios from "axios";
import {
  TextField,
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  MarqueeSelection,
  IColumn,
  SelectionMode,
  IconButton,
  ContextualMenu,
  ContextualMenuItemType,
  DirectionalHint,
  IContextualMenuItem
} from "office-ui-fabric-react";
import { IRouteViewModel, IRouteModel } from "../../../../interfaces/aldi";
import { routeOverviewColumns } from "../../configuration/columns";
import { Fragment } from "react";
import { BaseUebersicht } from "../../../../global/components/simple/BaseUebersicht";
import { promise_all_custom } from "../../../../helper/promise";
import { sortArrayByProperty } from "../../../../helper/sorting";

interface IPromiseRouteResult {
  rawItems: IRouteModel[];
  transformedItems: IRouteViewModel[];
}

export interface IRoutenuebersichtProps {
  onEditRouteClick(route: IRouteViewModel): void;
  commandbarItems: IContextualMenuItem[];
}
export interface IRoutenuebersichtState {
  columns: IColumn[];
  items: IRouteViewModel[];
  rawItems: IRouteModel[];
  selectedItems: IRouteViewModel[];
  isLoading: boolean;
  commandbarItems: IContextualMenuItem[];
  isCtxVisible: boolean;
  ctxTarget: any;
}
export class Routenuebersicht extends React.Component<
  IRoutenuebersichtProps,
  IRoutenuebersichtState
> {
  constructor(props) {
    super(props);

    this.selectionHasChanged = this.selectionHasChanged.bind(this);
    this.deleteAllRoutenClicked = this.deleteAllRoutenClicked.bind(this);
    this.deleteRouteClicked = this.deleteRouteClicked.bind(this);
    this.sortItems = this.sortItems.bind(this);
    this.deleteRoute = this.deleteRoute.bind(this);
    this.deleteRouten = this.deleteRouten.bind(this);
    this.editRoute = this.editRoute.bind(this);
    this.onCtxMenueVisible = this.onCtxMenueVisible.bind(this);
    this.renderContext = this.renderContext.bind(this);
    this.showMoreClicked = this.showMoreClicked.bind(this);

    let commardbarItems: IContextualMenuItem[] = [].concat(
      this.props.commandbarItems
    );
    if (!commardbarItems) {
      commardbarItems = [];
    }
    commardbarItems.push({
      key: "delete",
      name: "Delete Selected",
      icon: "delete",
      disabled: true,
      onClick: this.deleteAllRoutenClicked
    });
    let cols = routeOverviewColumns.map(col => {
      if (col.fieldName === "ctx") {
        col.onRender = this.renderContext;
      }
      return col;
    });

    this.state = {
      isLoading: true,
      columns: cols,
      items: [],
      rawItems: [],
      selectedItems: [],
      commandbarItems: commardbarItems,
      ctxTarget: undefined,
      isCtxVisible: false
    };
  }
  componentDidMount() {
    this.loadRouten()
      .then((data: IPromiseRouteResult) => {
        this.setState({
          rawItems: data.rawItems,
          items: data.transformedItems,
          isLoading: false
        });
        return null;
      })
      .catch(error => {
        alert("Fehler loadRouten");
      });
  }
  private renderContext() {
    return (
      <div className="ms-font-xl ms-fontColor-themePrimary">
        <IconButton
          checked={false}
          iconProps={{ iconName: "More" }}
          title="More"
          ariaLabel="More"
          onClick={this.showMoreClicked}
        />
      </div>
    );
  }
  private showMoreClicked(event) {
    this.setState({
      isCtxVisible: true,
      ctxTarget: event.target
    });
  }
  private onCtxMenueVisible(isVisible: boolean) {
    if (this.state.isCtxVisible === isVisible) {
      return;
    }
    let ns = { ...this.state };
    ns.isCtxVisible = isVisible;
    if (isVisible === false) {
      ns.ctxTarget = null;
    }
    this.setState(ns);
  }
  private selectionHasChanged(selectedItems: IRouteViewModel[]) {
    let newState = { ...this.state };
    newState.selectedItems = selectedItems;
    newState.commandbarItems.forEach(item => {
      if (item.key === "delete") {
        item.disabled = !selectedItems || selectedItems.length < 1;
      }
    });
    this.setState(newState);
  }
  private getRouteViewModelByRouteModel(items: IRouteModel[]) {
    return items.map((item: IRouteModel, index) => {
      return {
        index: index + 1,
        _id: item._id,
        created: item.created,
        modified: item.modified,
        timestamp: item.timestamp,
        links: item.links,
        route_timestamp: item.route_timestamp,
        ausgaben: item.ausgaben
      } as IRouteViewModel;
    });
  }
  private loadRouten(): Promise<IPromiseRouteResult> {
    return new Promise((resolve, reject) => {
      this.loadRoutenRequest()
        .then((data: IRouteModel[]) => {
          let items: IRouteViewModel[] = this.getRouteViewModelByRouteModel(
            data
          );
          resolve({
            rawItems: data || [],
            transformedItems: items || []
          });
        })
        .catch(() => {
          alert("Fehler beim Laden der Routen");
        });
    });
  }
  private deleteRouten(routenElements: IRouteViewModel[]) {
    return new Promise((resolve, reject) => {
      let promises = [];
      routenElements.forEach(route => {
        promises.push(this.deleteRouteElementRequest(route));
      });
      promise_all_custom(promises)
        .then(() => {
          resolve();
        })
        .catch(() => {
          alert("Grober Fehler deleteRouten!");
          reject();
        });
    });
  }
  private loadRoutenRequest() {
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
  private deleteRouteElementRequest(route: IRouteViewModel) {
    return Axios.delete("/api/routen/" + route._id);
  }
  private deleteRoute(selectedItems: IRouteViewModel[]) {
    return new Promise((resolve, reject) => {
      if (
        !selectedItems ||
        selectedItems.length === 0 ||
        selectedItems.length > 1
      ) {
        resolve();
        return null;
      }
      return this.deleteRouten(selectedItems)
        .then(() => {
          return this.loadRouten();
        })
        .then((data: IPromiseRouteResult) => {
          this.setState(
            {
              rawItems: data.rawItems,
              items: data.transformedItems,
              isLoading: false
            },
            () => {
              resolve();
              return null;
            }
          );
        })
        .catch(error => {
          alert("Fehler deleteRoute");
          reject();
          return null;
        });
    });
  }
  private editRoute(selectedRoute: IRouteViewModel) {
    if (selectedRoute) {
      this.props.onEditRouteClick(selectedRoute);
    }
  }
  private sortItems(propertyName: string, descending: boolean) {
    return sortArrayByProperty(this.state.items, propertyName, descending);
  }
  private deleteRouteClicked(selectedItems: IRouteViewModel[]) {
    return this.deleteRoute(selectedItems);
  }
  private deleteAllRoutenClicked() {
    return this.setState({ isLoading: true }, () => {
      this.deleteRouten(this.state.selectedItems)
        .then(() => {
          this.loadRouten().then((data: IPromiseRouteResult) => {
            this.setState({
              rawItems: data.rawItems,
              items: data.transformedItems,
              isLoading: false
            });
            return null;
          });
        })
        .catch(error => {
          alert("Fehler deleteAllRoutenClicked");
        });
    });
  }
  render() {
    console.log("render Routenuebersicht");
    // return null;
    return (
      <BaseUebersicht
        key="ru"
        ctxTarget={this.state.ctxTarget}
        ctxVisible={this.state.isCtxVisible}
        onCtxMenueVisible={this.onCtxMenueVisible}
        onDeleteItemClicked={this.deleteRouteClicked}
        columns={this.state.columns}
        items={this.state.items}
        onEditItemClick={this.editRoute}
        onItemSelectionChanged={this.selectionHasChanged}
        sortByPropertyName={this.sortItems}
        isLoading={this.state.isLoading}
        loadingText="Routen werden geladen"
        useCommandbar={true}
        enableSearchBox={false}
        commandbarItems={this.state.commandbarItems}
      />
    );
  }
}
