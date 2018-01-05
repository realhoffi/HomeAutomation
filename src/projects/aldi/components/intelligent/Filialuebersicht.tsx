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
import { IFilialeViewModel } from "../../../../interfaces/aldi";
import { filialOverviewColumns } from "../../configuration/routenColumns";
import { Fragment } from "react";

export interface IFilialuebersichtProps {
  items: IFilialeViewModel[];
  sortByPropertyName(
    propertyName: string,
    descending: boolean
  ): IFilialeViewModel[];
  onDeleteFilialeClicked(route: IFilialeViewModel[]): Promise<any>;
  selectionChanged(route: IFilialeViewModel[]): void;
  onEditFilialeClick(route: IFilialeViewModel): void;
}
export interface IFilialuebersichtState {
  columns: IColumn[];
  items: IFilialeViewModel[];
  showContextMenue: boolean;
  selectedItems: IFilialeViewModel[];
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
    prevProps: Readonly<IFilialuebersichtProps>,
    prevState: Readonly<IFilialuebersichtState>,
    prevContext: any
  ) {
    if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
      this._selection.getItems().forEach((e, i) => {
        this._selection.setIndexSelected(i, false, false);
      });
      this._selection.setItems(this.props.items as any, true);
      this.setState({ selectedItems: undefined, showContextMenue: false });
    }
  }
  private selectionHasChanged() {
    console.log("selectionHasChanged");
    this.props.selectionChanged(
      this._selection.getSelection() as IFilialeViewModel[]
    );
    this.forceUpdate();
  }
  private deleteFiliale() {
    this.props
      .onDeleteFilialeClicked(this.state.selectedItems)
      .then(() => {
        this._selection.setAllSelected(false);
        this.setState({ selectedItems: undefined, showContextMenue: false });
      })
      .catch(() => {
        alert("Es ist ein Fehler beim Löschen der Filiale aufgetreten");
      });
  }
  private editFiliale() {
    this.props.onEditFilialeClick(this.state.selectedItems[0]);
    this.setState({ selectedItems: undefined, showContextMenue: false });
  }
  private closeContextualMenue() {
    this.setState({ showContextMenue: false });
  }
  private showMoreClicked(event) {
    this._target = event.target;

    this.setState({
      showContextMenue: true,
      selectedItems: this._selection.getSelection() as IFilialeViewModel[]
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
    console.log("render Filialuebersicht");
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
