import * as React from "react";
import Axios from "axios";
import {
  IFilialeModel,
  IFilialeViewModel,
  IRouteModel
} from "../../../../interfaces/aldi";
import { Panel } from "../../../../global/components/simple/Panel";
import { PageType } from "../../../../enums/enums";
import { Filiale as FilialForm } from "../stateless/Filiale";
import { promise_all_custom } from "../../../../helper/promise";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import { Fragment } from "react";
import { ButtonRow } from "../../../../global/components/simple/ButtonRow";

export interface IFilialProps {
  filialeId: string;
  pageType: PageType;
  headerText: string;
  ok_clicked(): void;
  cancel_clicked(): void;
}
export interface IFilialState {
  isInitilized: boolean;
  routes: IRouteModel[];
  dbEntry: IFilialeModel;
  viewModel: IFilialeViewModel;
  availableRouteDates: Date[];
}
export class Filiale extends React.Component<IFilialProps, IFilialState> {
  constructor(props) {
    super(props);
    this.state = {
      dbEntry: undefined,
      routes: [],
      viewModel: undefined,
      isInitilized: false,
      availableRouteDates: []
    };

    this.onAusgabenChanged = this.onAusgabenChanged.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEinnahmenChanged = this.onEinnahmenChanged.bind(this);
    this.onFahrdatumChanged = this.onFahrdatumChanged.bind(this);
    this.onOrtChanged = this.onOrtChanged.bind(this);
    this.onPkzChanged = this.onPkzChanged.bind(this);
    this.onPlzChanged = this.onPlzChanged.bind(this);
    this.onStrasseChanged = this.onStrasseChanged.bind(this);
    this.onTestnummerChanged = this.onTestnummerChanged.bind(this);

    this.saveClicked = this.saveClicked.bind(this);
  }

  componentDidMount() {
    promise_all_custom([
      Axios.get("api/routen"),
      Axios.get("api/filialen/" + this.props.filialeId)
    ])
      .then(data => {
        if (data[0].isError || data[1].isError) {
          alert("Fehler beim Abfragen der Daten...");
          return;
        }
        let routes: IRouteModel[] = data[0].data.data || [];
        let filiale: IFilialeModel = data[1].data.data.filiale || undefined;
        if (!routes || routes.length === 0) {
          alert("Keine Routen gefunden...");
          return;
        }
        if (!filiale) {
          alert("Keine Filiale gefunden...");
          return;
        }

        routes = routes.sort((a, b) => {
          return a.route_timestamp > b.route_timestamp
            ? 1
            : a.route_timestamp < b.route_timestamp ? -1 : 0;
        });
        let dates = routes.map(route => {
          return new Date(route.route_timestamp);
        });
        let vm: IFilialeViewModel = {
          _id: filiale._id,
          ausgaben: filiale.ausgaben,
          einnahmen: filiale.einnahmen,
          index: 1,
          ort: filiale.ort,
          pkz: filiale.pkz,
          timestamp: filiale.timestamp,
          testnummer: filiale.testnummer,
          strasse: filiale.strasse,
          plz: filiale.plz,
          fahrdatum: null
        };

        routes.forEach(route => {
          if (filiale.route_id === route._id) {
            vm.fahrdatum = route.route_timestamp;
          }
        });
        this.setState({
          isInitilized: true,
          availableRouteDates: dates,
          routes: routes,
          dbEntry: filiale,
          viewModel: vm
        });
      })
      .catch(() => {
        alert("Fehler beim Laden");
      });
  }
  private saveClicked() {
    let f = "";
    this.state.routes.forEach(route => {
      if (route.route_timestamp === this.state.viewModel.fahrdatum) {
        f = route._id;
      }
    });
    let data: IFilialeModel = {
      _id: this.state.viewModel._id,
      ausgaben: this.state.viewModel.ausgaben,
      einnahmen: this.state.viewModel.einnahmen,
      ort: this.state.viewModel.ort,
      pkz: this.state.viewModel.pkz,
      plz: this.state.viewModel.plz,
      strasse: this.state.viewModel.strasse,
      testnummer: this.state.viewModel.testnummer,
      timestamp: this.state.viewModel.timestamp,
      route_id: f
    };
    Axios.put("/api/filialen/" + this.state.dbEntry._id, { filiale: data })
      .then(response => {
        this.props.ok_clicked();
        return null;
      })
      .catch(e => {
        console.log("Fehler", JSON.stringify(e));
        alert("Fehler");
      });
  }
  private onDeleteClick(id: string): void {
    alert("Löschen nicht erlaubt");
  }
  private onFahrdatumChanged(id: string, value: number): void {
    let vm = { ...this.state };
    vm.viewModel.fahrdatum = value;
    this.setState(vm);
  }
  private onPkzChanged(id: string, value: number): void {
    let vm = { ...this.state };
    vm.viewModel.pkz = value;
    this.setState(vm);
  }
  private onTestnummerChanged(id: string, value: number): void {
    let vm = { ...this.state };
    vm.viewModel.testnummer = value;
    this.setState(vm);
  }
  private onAusgabenChanged(id: string, value: number): void {
    let vm = { ...this.state };
    vm.viewModel.ausgaben = value;
    this.setState(vm);
  }
  private onEinnahmenChanged(id: string, value: number): void {
    let vm = { ...this.state };
    vm.viewModel.einnahmen = value;
    this.setState(vm);
  }
  private onOrtChanged(id: string, value: string): void {
    let vm = { ...this.state };
    vm.viewModel.ort = value;
    this.setState(vm);
  }
  private onStrasseChanged(id: string, value: string): void {
    let vm = { ...this.state };
    vm.viewModel.strasse = value;
    this.setState(vm);
  }
  private onPlzChanged(id: string, value: number): void {
    let vm = { ...this.state };
    vm.viewModel.plz = value;
    this.setState(vm);
  }

  render() {
    console.log("render Filiale");
    if (!this.state.isInitilized) {
      return <Spinner label="Lade Filiale..." size={SpinnerSize.large} />;
    }
    return (
      <Fragment>
        <FilialForm
          filiale={this.state.viewModel}
          id={this.state.dbEntry._id}
          key={"_1"}
          fahrdaten={this.state.availableRouteDates}
          title={this.props.headerText}
          onAusgabenChanged={this.onAusgabenChanged}
          onDeleteClick={this.onDeleteClick}
          onEinnahmenChanged={this.onEinnahmenChanged}
          onFahrdatumChanged={this.onFahrdatumChanged}
          onOrtChanged={this.onOrtChanged}
          onPkzChanged={this.onPkzChanged}
          onPlzChanged={this.onPlzChanged}
          onStrasseChanged={this.onStrasseChanged}
          onTestnummerChanged={this.onTestnummerChanged}
          enableDeleteBtn={false}
        />
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <ButtonRow
              saveButtonProps={{
                text: "Speichern",
                disabled: false,
                checked: false,
                onClickFunc: this.saveClicked
              }}
              cancelButtonProps={{
                text: "Abbrechen",
                disabled: false,
                checked: false,
                onClickFunc: this.props.cancel_clicked
              }}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
