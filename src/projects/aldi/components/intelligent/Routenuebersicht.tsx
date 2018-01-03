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
  deleteRoute(route: IRouteViewModel): void;
  editRoute(route: IRouteViewModel): void;
}
export interface IRoutenuebersichtState {
  columns: IColumn[];
  items: IRouteViewModel[];
  showContextMenue: boolean;
  selectedItem: IRouteViewModel;
}
export class Routenuebersicht extends React.Component<
  IRoutenuebersichtProps,
  IRoutenuebersichtState
> {
  private _selection: Selection;
  private _target: any;
  constructor(props) {
    super(props);

    this._selection = new Selection({});
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
      items: this.props.items,
      showContextMenue: false,
      selectedItem: undefined
    };
  }
  private deleteRoute() {
    this.props.deleteRoute(this.state.selectedItem);
    this.setState({ selectedItem: undefined, showContextMenue: false });
  }
  private editRoute() {
    this.props.editRoute(this.state.selectedItem);
    this.setState({ selectedItem: undefined, showContextMenue: false });
  }
  private closeContextualMenue() {
    this.setState({ showContextMenue: false });
  }
  private showMoreClicked(event) {
    this._target = event.target;

    this.setState({
      showContextMenue: true,
      selectedItem: this._selection.getSelection()[0] as IRouteViewModel
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
    const { columns, items } = this.state;
    let newItems: IRouteViewModel[] = items.slice();
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
    newItems = this.props.sortByPropertyName(
      currColumn.fieldName,
      currColumn.isSortedDescending
    );
    this.setState({
      columns: newColumns,
      items: newItems
    });
  }
  render() {
    console.log("render Routenuebersicht");
    return (
      <Fragment>
        <MarqueeSelection selection={this._selection} isEnabled={false}>
          <DetailsList
            selectionMode={SelectionMode.none}
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
        </MarqueeSelection>
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
