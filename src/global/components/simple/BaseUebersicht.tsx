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
import { filialOverviewColumns } from "../../../projects/aldi/configuration/routenColumns";

export interface IBaseUebersichtProps {
  useCommandbar: boolean;
  commandbarItems: IContextualMenuItem[];
  isLoading: boolean;
  enableSearchBox: boolean;
  items: Array<any>;
  columns: IColumn[];
  loadingText: string;
  sortByPropertyName(propertyName: string, descending: boolean): any[];
  onDeleteItemClicked(items: Array<any>): Promise<any>;
  onItemSelectionChanged(items: Array<any>): void;
  onEditItemClick(item: any): void;
}
export interface IBaseUebersichtState {
  columns: IColumn[];
  items: Array<any>;
  showContextMenue: boolean;
  selectedItems: Array<any>;
}
export class BaseUebersicht extends React.Component<
  IBaseUebersichtProps,
  IBaseUebersichtState
> {
  private _selection: Selection;
  private _target: any;
  constructor(props) {
    super(props);

    this.selectionHasChanged = this.selectionHasChanged.bind(this);
    this.onColumnClick = this.onColumnClick.bind(this);
    this.renderContext = this.renderContext.bind(this);
    this.showMoreClicked = this.showMoreClicked.bind(this);
    this.closeContextualMenue = this.closeContextualMenue.bind(this);
    this.deleteFiliale = this.deleteFiliale.bind(this);
    this.editFiliale = this.editFiliale.bind(this);
    let cols = filialOverviewColumns.map(col => {
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
      selectedItems: undefined
    };
    this._selection = new Selection({
      onSelectionChanged: this.selectionHasChanged
    });
  }
  componentDidUpdate(
    prevProps: Readonly<IBaseUebersichtProps>,
    prevState: Readonly<IBaseUebersichtState>,
    prevContext: any
  ) {
    if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
      this._selection["_onSelectionChanged"] = undefined;
      this._selection.getItems().forEach((e, i) => {
        this._selection.setIndexSelected(i, false, false);
      });
      this._selection.setAllSelected(false);
      this._selection["_onSelectionChanged"] = this.selectionHasChanged;
      this._selection.setItems(this.props.items as any, true);
      this.setState({ selectedItems: undefined, showContextMenue: false });
    }
  }
  private selectionHasChanged() {
    console.log("selectionHasChanged");
    this.props.onItemSelectionChanged(this._selection.getSelection());
    this.forceUpdate();
  }
  private deleteFiliale() {
    this.props
      .onDeleteItemClicked(this.state.selectedItems)
      .then(() => {
        this._selection.setAllSelected(false);
        this.setState({ selectedItems: undefined, showContextMenue: false });
      })
      .catch(() => {
        alert("Es ist ein Fehler beim Löschen der Filiale aufgetreten");
      });
  }
  private editFiliale() {
    this.props.onEditItemClick(this.state.selectedItems[0]);
    this.setState({ selectedItems: undefined, showContextMenue: false });
  }
  private closeContextualMenue() {
    this.setState({ showContextMenue: false });
  }
  private showMoreClicked(event) {
    this._target = event.target;

    this.setState({
      showContextMenue: true,
      selectedItems: this._selection.getSelection() || []
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
    // let newItems: IFilialeViewModel[] = items.slice();
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
    //  newItems =
    this.props.sortByPropertyName(
      currColumn.fieldName,
      currColumn.isSortedDescending
    );
    this.setState({
      columns: newColumns
      // items: newItems
    });
  }
  render() {
    console.log("render BaseUebersicht");
    if (this.props.isLoading) {
      return <Spinner label={this.props.loadingText} />;
    }
    return (
      <Fragment>
        {this.props.useCommandbar &&
          this.props.commandbarItems &&
          this.props.commandbarItems.length > 0 && (
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12">
                <CommandBar
                  isSearchBoxVisible={this.props.enableSearchBox}
                  items={this.props.commandbarItems}
                />
              </div>
            </div>
          )}
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
                itemType: ContextualMenuItemType.Normal,
                onClick: this.editFiliale
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
                onClick: this.deleteFiliale
              }
            ]}
            onDismiss={this.closeContextualMenue}
          />
        )}
      </Fragment>
    );
  }
}
