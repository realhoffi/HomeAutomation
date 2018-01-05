import * as React from "react";

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
  DirectionalHint
} from "office-ui-fabric-react";
import { IRouteViewModel } from "../../../../interfaces/aldi";
import { routeOverviewColumns } from "../../configuration/routenColumns";
import { Fragment } from "react";

export interface IRoutenuebersichtProps {
  items: IRouteViewModel[];
  sortByPropertyName(
    propertyName: string,
    descending: boolean
  ): IRouteViewModel[];
  onDeleteRouteClicked(route: IRouteViewModel[]): Promise<any>;
  selectionChanged(route: IRouteViewModel[]): void;
  onEditRouteClick(route: IRouteViewModel): void;
}
export interface IRoutenuebersichtState {
  columns: IColumn[];
  showContextMenue: boolean;
  selectedItems: IRouteViewModel[];
}
export class Routenuebersicht extends React.Component<
  IRoutenuebersichtProps,
  IRoutenuebersichtState
> {
  private _selection: Selection;
  private _target: any;
  constructor(props) {
    super(props);

    this.selectionHasChanged = this.selectionHasChanged.bind(this);

    this.selectionHasChanged = this.selectionHasChanged.bind(this);
    this.onColumnClick = this.onColumnClick.bind(this);
    this.renderContext = this.renderContext.bind(this);
    this.showMoreClicked = this.showMoreClicked.bind(this);
    this.closeContextualMenue = this.closeContextualMenue.bind(this);
    this.deleteRoute = this.deleteRoute.bind(this);
    this.editRoute = this.editRoute.bind(this);
    let cols = routeOverviewColumns.map(col => {
      col.onColumnClick = this.onColumnClick;
      if (col.fieldName === "ctx") {
        col.onRender = this.renderContext;
      }
      return col;
    });
    this.state = {
      columns: cols,
      showContextMenue: false,
      selectedItems: undefined
    };
    this._selection = new Selection({
      onSelectionChanged: this.selectionHasChanged
    });
  }
  componentDidUpdate(
    prevProps: Readonly<IRoutenuebersichtProps>,
    prevState: Readonly<IRoutenuebersichtState>,
    prevContext: any
  ) {
    if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
      // console.log("update items");
      // let s = this._selection.getSelection();
      // console.log("selection count: " + s.length);
      this._selection.getItems().forEach((e, i) => {
        this._selection.setIndexSelected(i, false, false);
      });
      this._selection.setItems(this.props.items as any, true);
      this._selection.setAllSelected(false);
      console.log("isAllSelected", this._selection.isAllSelected());
      if (this._selection.isAllSelected()) {
        this._selection.toggleAllSelected();
        this._selection.setAllSelected(false);
      }
      this.setState({ selectedItems: undefined, showContextMenue: false });
      //  this._selection.setAllSelected(false);
      // this._selection.getItems().forEach(item => {
      //   // debugger;
      //   let n = "";
      // });
    } else {
      console.log("NO update items");
    }
  }
  private selectionHasChanged() {
    console.log("selectionHasChanged");
    console.log("count: " + this._selection.getSelectedCount());
    this.props.selectionChanged(
      this._selection.getSelection() as IRouteViewModel[]
    );
  }
  private deleteRoute() {
    this.props
      .onDeleteRouteClicked(this.state.selectedItems)
      .then(() => {
        this._selection.setAllSelected(false);
        this.setState({ selectedItems: undefined, showContextMenue: false });
      })
      .catch(() => {
        alert("Es ist ein Fehler beim Löschen der Route aufgetreten");
      });
  }
  private editRoute() {
    this.props.onEditRouteClick(this.state.selectedItems[0]);
    this.setState({ selectedItems: undefined, showContextMenue: false });
  }
  private closeContextualMenue() {
    this.setState({ showContextMenue: false });
  }
  private showMoreClicked(event) {
    this._target = event.target;

    this.setState({
      showContextMenue: true,
      selectedItems: this._selection.getSelection() as IRouteViewModel[]
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
  private onColumnClick(ev: React.MouseEvent<HTMLElement>, column: IColumn) {
    const { columns } = this.state;
    let newItems: IRouteViewModel[] = [];
    let newColumns: IColumn[] = columns.slice();
    let currColumn: IColumn = newColumns.filter(
      (currCol: IColumn, idx: number) => {
        return column.key === currCol.key;
      }
    )[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    // newItems = this.props.sortByPropertyName(
    //   currColumn.fieldName,
    //   currColumn.isSortedDescending
    // );
    this.setState({
      columns: newColumns
    });
  }
  render() {
    console.log("render Routenuebersicht");
    return (
      <Fragment>
        <DetailsList
          selectionMode={SelectionMode.multiple}
          items={this.props.items}
          compact={false}
          columns={this.state.columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          selection={this._selection}
          selectionPreservedOnEmptyClick={true}
          enterModalSelectionOnTouch={true}
        />
        {this.state.showContextMenue && (
          <ContextualMenu
            directionalHint={DirectionalHint.rightCenter}
            isBeakVisible={true}
            gapSpace={10}
            beakWidth={20}
            directionalHintFixed={true}
            target={this._target}
            items={[
              {
                name: "Bearbeiten",
                key: "edit",
                icon: "edit",
                itemType: ContextualMenuItemType.Normal
              },
              {
                key: "divider_1",
                itemType: ContextualMenuItemType.Divider
              },
              {
                name: "Löschen",
                key: "delete",
                icon: "Delete",
                itemType: ContextualMenuItemType.Normal,
                onClick: this.deleteRoute
              }
            ]}
            onDismiss={this.closeContextualMenue}
          />
        )}
      </Fragment>
    );
  }
}
