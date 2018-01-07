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
import { IFilialeViewModel, IFilialeModel } from "../../../../interfaces/aldi";
import { filialOverviewColumns } from "../../configuration/routenColumns";
import { Fragment } from "react";
import { BaseUebersicht } from "../../../../global/components/simple/BaseUebersicht";
import { sortArrayByProperty } from "../../../../helper/sorting";
import { promise_all_custom } from "../../../../helper/promise";

interface IPromiseFilialeResult {
  rawItems: IFilialeModel[];
  transformedItems: IFilialeViewModel[];
}
export interface IFilialuebersichtProps {
  onEditFilialeClick(route: IFilialeViewModel): void;
  commandbarItems: IContextualMenuItem[];
}
export interface IFilialuebersichtState {
  columns: IColumn[];
  items: IFilialeViewModel[];
  rawItems: IFilialeModel[];
  selectedItems: IFilialeViewModel[];
  isLoading: boolean;
  commandbarItems: IContextualMenuItem[];
}
export class Filialuebersicht extends React.Component<
  IFilialuebersichtProps,
  IFilialuebersichtState
> {
  private _selection: Selection;
  private _target: any;
  constructor(props) {
    super(props);

    this.selectionHasChanged = this.selectionHasChanged.bind(this);
    this.deleteAllFilialenClicked = this.deleteAllFilialenClicked.bind(this);
    this.deleteFilialeClicked = this.deleteFilialeClicked.bind(this);
    this.sortItems = this.sortItems.bind(this);
    this.deleteFiliale = this.deleteFiliale.bind(this);
    this.deleteFilialen = this.deleteFilialen.bind(this);
    this.editFiliale = this.editFiliale.bind(this);
    // let cols = filialOverviewColumns.map(col => {
    //   col.onColumnClick = this.onColumnClick;
    //   // if (col.fieldName === "ctx") {
    //   //   col.onRender = this.renderContext;
    //   // }
    //   return col;
    // });

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
      onClick: this.deleteAllFilialenClicked
    });
    this.state = {
      isLoading: true,
      columns: [], // cols,
      items: [],
      rawItems: [],
      selectedItems: [],
      commandbarItems: commardbarItems
    };
  }
  componentDidMount() {
    this.loadFilialen()
      .then((data: IPromiseFilialeResult) => {
        this.setState({
          rawItems: data.rawItems,
          items: data.transformedItems,
          isLoading: false
        });
        return null;
      })
      .catch(error => {
        alert("Fehler loadFilialen");
      });
  }
  private selectionHasChanged(selectedItems: IFilialeViewModel[]) {
    let newState = { ...this.state };
    newState.selectedItems = selectedItems;
    newState.commandbarItems.forEach(item => {
      if (item.key === "delete") {
        item.disabled = !selectedItems || selectedItems.length < 0;
      }
    });
    this.setState(newState);
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
  private loadFilialen(): Promise<IPromiseFilialeResult> {
    return new Promise((resolve, reject) => {
      this.loadFilialenRequest()
        .then((data: IFilialeModel[]) => {
          let items: IFilialeViewModel[] = this.getFilialViewModelByRouteModel(
            data
          );
          resolve({
            rawItems: data || [],
            transformedItems: items || []
          });
        })
        .catch(() => {
          alert("Fehler beim Laden der Filialen");
        });
    });
  }
  private deleteFilialen(filialElements: IFilialeViewModel[]) {
    return new Promise((resolve, reject) => {
      let promises = [];
      filialElements.forEach(filiale => {
        promises.push(this.deleteFilialeElementRequest(filiale));
      });
      promise_all_custom(promises)
        .then(() => {
          resolve();
        })
        .catch(() => {
          alert("Grober Fehler!");
          reject();
        });
    });
  }
  private loadFilialenRequest() {
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
  private deleteFilialeElementRequest(route: IFilialeViewModel) {
    return Axios.delete("/api/filialen/" + route._id);
  }
  private deleteFiliale(selectedItems: IFilialeViewModel[]) {
    return new Promise((resolve, reject) => {
      if (
        !selectedItems ||
        selectedItems.length === 0 ||
        selectedItems.length > 1
      ) {
        resolve();
        return null;
      }
      return this.deleteFilialen(selectedItems)
        .then(() => {
          return this.loadFilialen();
        })
        .then((data: IPromiseFilialeResult) => {
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
          alert("Fehler deleteFiliale");
          reject();
          return null;
        });
    });
  }
  private editFiliale(selectedFiliale: IFilialeViewModel) {
    if (selectedFiliale) {
      this.props.onEditFilialeClick(selectedFiliale);
    }
  }
  private sortItems(propertyName: string, descending: boolean) {
    return sortArrayByProperty(this.state.items, propertyName, descending);
  }
  private deleteFilialeClicked(selectedItems: IFilialeViewModel[]) {
    return this.deleteFiliale(selectedItems);
  }
  private deleteAllFilialenClicked() {
    return this.setState({ isLoading: true }, () => {
      this.deleteFilialen(this.state.selectedItems).then(() => {
        this.loadFilialen()
          .then((data: IPromiseFilialeResult) => {
            this.setState({
              rawItems: data.rawItems,
              items: data.transformedItems,
              isLoading: false
            });
            return null;
          })
          .catch(error => {
            alert("Fehler loadFilialen");
          });
      });
    });
  }
  render() {
    console.log("render Filialuebersicht");
    return (
      <BaseUebersicht
        onDeleteItemClicked={this.deleteFilialeClicked}
        columns={[]}
        items={this.state.items}
        onEditItemClick={this.editFiliale}
        onItemSelectionChanged={this.selectionHasChanged}
        sortByPropertyName={this.sortItems}
        isLoading={this.state.isLoading}
        loadingText="Filialen werden geladen"
        useCommandbar={true}
        enableSearchBox={false}
        commandbarItems={this.state.commandbarItems}
      />
    );
  }
}
