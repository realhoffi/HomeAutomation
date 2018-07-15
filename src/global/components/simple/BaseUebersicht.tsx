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
  DirectionalHint,
  CommandBar,
  Spinner,
  IContextualMenuItem
} from "office-ui-fabric-react";

import { Fragment } from "react";

export interface IBaseUebersichtProps {
  ctxTarget: any;
  ctxVisible: boolean;
  useCommandbar: boolean;
  commandbarItems: IContextualMenuItem[];
  isLoading: boolean;
  enableSearchBox: boolean;
  items: any[];
  columns: IColumn[];
  loadingText: string;
  sortByPropertyName(propertyName: string, descending: boolean): any[];
  onDeleteItemClicked(items: any[]): Promise<any>;
  onItemSelectionChanged(items: any[]): void;
  onEditItemClick(item: any): void;
  onCtxMenueVisible(visible: boolean): void;
}
export interface IBaseUebersichtState {
  columns: IColumn[];
  items: any[];
  ctxMenues: IContextualMenuItem[];
}
export class BaseUebersicht extends React.Component<IBaseUebersichtProps, IBaseUebersichtState> {
  private _selection: Selection;
  private _target: any;
  constructor(props) {
    super(props);

    this.selectionHasChanged = this.selectionHasChanged.bind(this);
    this.onColumnClick = this.onColumnClick.bind(this);
    this.closeContextualMenue = this.closeContextualMenue.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
    this.editClicked = this.editClicked.bind(this);
    this.callCtxVisible = this.callCtxVisible.bind(this);

    let commandItems = [
      {
        name: "Bearbeiten",
        key: "edit",
        icon: "edit",
        itemType: ContextualMenuItemType.Normal,
        onClick: this.editClicked
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
        onClick: this.deleteClicked
      }
    ];
    this.state = {
      ctxMenues: commandItems,
      columns: this.props.columns,
      items: this.props.items
    };
    this._selection = new Selection({
      onSelectionChanged: this.selectionHasChanged
    });
  }
  componentDidUpdate(prevProps: Readonly<IBaseUebersichtProps>, prevState: Readonly<IBaseUebersichtState>, prevContext: any) {
    if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
      this._selection["_onSelectionChanged"] = undefined;
      this._selection.getItems().forEach((e, i) => {
        this._selection.setIndexSelected(i, false, false);
      });
      this._selection.setAllSelected(false);
      this._selection["_onSelectionChanged"] = this.selectionHasChanged;
      this._selection.setItems(this.props.items as any, true);
      this.callCtxVisible(false);
      this.props.onItemSelectionChanged(this._selection.getSelection());
    }
  }
  private callCtxVisible(isVisible: boolean) {
    if (this.props.ctxVisible === isVisible) {
      return;
    }
    this.props.onCtxMenueVisible(isVisible);
  }
  private selectionHasChanged() {
    console.log("selectionHasChanged");
    let selection = this._selection.getSelection();
    this.props.onItemSelectionChanged(selection);
    if (!selection) {
      this.callCtxVisible(false);
    }
  }
  private deleteClicked() {
    this.props
      .onDeleteItemClicked(this._selection.getSelection())
      .then(() => {
        this._selection.setAllSelected(false);
        this.callCtxVisible(false);
      })
      .catch(() => {
        alert("Es ist ein Fehler beim Löschen der Aktion aufgetreten");
      });
  }
  private editClicked() {
    let selection = this._selection.getSelection();
    if (!selection || selection.length < 1) {
      return;
    }
    this.props.onEditItemClick(selection[0]);
  }
  private closeContextualMenue() {
    this.props.onCtxMenueVisible(false);
  }

  private onColumnClick(ev: React.MouseEvent<HTMLElement>, column: IColumn) {
    const { columns, items } = this.state;
    let newColumns: IColumn[] = columns.slice();
    let currColumn: IColumn = newColumns.filter((currCol: IColumn, idx: number) => {
      return column.key === currCol.key;
    })[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    this.props.sortByPropertyName(currColumn.fieldName, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns
    });
  }
  render() {
    console.log("render BaseUebersicht");

    return (
      <Fragment>
        {this.props.useCommandbar &&
          this.props.commandbarItems &&
          this.props.commandbarItems.length > 0 && (
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12">
                <CommandBar items={this.props.commandbarItems} />
              </div>
            </div>
          )}
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            {this.props.isLoading && <Spinner label={this.props.loadingText} />}
            {!this.props.isLoading && (
              <DetailsList
                selectionMode={SelectionMode.multiple}
                items={this.props.items}
                compact={false}
                columns={this.state.columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
                selection={this._selection}
                selectionPreservedOnEmptyClick={false}
                enterModalSelectionOnTouch={false}
              />
            )}
          </div>
        </div>
        {this.props.ctxVisible && (
          <ContextualMenu
            directionalHint={DirectionalHint.rightCenter}
            isBeakVisible={true}
            gapSpace={10}
            beakWidth={20}
            directionalHintFixed={true}
            target={this.props.ctxTarget}
            items={this.state.ctxMenues}
            onDismiss={this.closeContextualMenue}
          />
        )}
      </Fragment>
    );
  }
}
