import * as React from "react";

import {
  ActionButton,
  TextField,
  DatePicker,
  IDropdownOption,
  CommandBarButton,
  Link as OfficeLink,
  IIconProps,
  IButtonProps,
  Label
} from "office-ui-fabric-react";
import { PageType } from "../../../../enums/enums";
import { BasePage } from "../../../../global/components/container/basePage";
import { ButtonRow } from "../../../../global/components/simple/ButtonRow";
import { Panel } from "../../../../global/components/simple/Panel";
import { NumberTextField } from "../../../../global/components/simple/NumberTextField";
import {
  getGermanDateString,
  setDatePropertiesToZero
} from "../../../../helper/date";
import {
  IFilialeViewModel,
  IAusgabeModel,
  IRouteModel,
  ILinkModel,
  IFilialeModel
} from "../../../../interfaces/aldi";
import { Link } from "../stateless/Link";
import { Ausgabe } from "../stateless/Ausgabe";
import { Filiale } from "../stateless/Filiale";
import { Routenfahrt } from "../stateless/Routenfahrt";
import { v4 as generate_uuid } from "uuid";
import Axios from "axios";

export interface IManageRouteProps {
  pageType: PageType;
  onExitPage(): void;
}
export interface IManageRouteState {
  routenfahrten: Date[];
  filialen: IFilialeViewModel[];
  ausgaben: IAusgabeModel[];
  links: ILinkModel[];
}
export class ManageRoute extends React.Component<
  IManageRouteProps,
  IManageRouteState
> {
  constructor(props) {
    super(props);

    this.state = {
      filialen: [],
      routenfahrten: [],
      ausgaben: [],
      links: []
    };

    this.cancelClick = this.cancelClick.bind(this);
    this.saveClick = this.saveClick.bind(this);

    this.addLink = this.addLink.bind(this);
    this.deleteLink = this.deleteLink.bind(this);
    this.linkChanged = this.linkChanged.bind(this);

    this.addAusgabe = this.addAusgabe.bind(this);
    this.deleteAusgabe = this.deleteAusgabe.bind(this);
    this.ausgabeDescriptionChanged = this.ausgabeDescriptionChanged.bind(this);
    this.ausgabeValueChanged = this.ausgabeValueChanged.bind(this);

    this.deleteFiliale = this.deleteFiliale.bind(this);
    this.addFiliale = this.addFiliale.bind(this);
    this.pkzChanged = this.pkzChanged.bind(this);
    this.einnahmenChanged = this.einnahmenChanged.bind(this);
    this.ausgabenChanged = this.ausgabenChanged.bind(this);
    this.plzChanged = this.plzChanged.bind(this);
    this.testnummerChanged = this.testnummerChanged.bind(this);
    this.fahrdatumChanged = this.fahrdatumChanged.bind(this);
    this.ortChanged = this.ortChanged.bind(this);
    this.strasseChanged = this.strasseChanged.bind(this);

    this.addRoutenfahrt = this.addRoutenfahrt.bind(this);
    this.deleteRoutenfahrt = this.deleteRoutenfahrt.bind(this);
    this.changeRouteDate = this.changeRouteDate.bind(this);
  }
  componentDidMount() {
    let docTitle = "";
    switch (this.props.pageType) {
      case PageType.Display:
        docTitle = "Route anzeigen";
        break;
      case PageType.Edit:
        docTitle = "Route bearbeiten";
        break;
      case PageType.Add:
        docTitle = "Route hinzufügen";
        break;
      default:
        break;
    }
    document.title = docTitle;
  }
  private saveRoutes(routes: IRouteModel[]): Promise<IRouteModel[]> {
    return new Promise((resolve, reject) => {
      let promises = [];
      routes.forEach(route => {
        promises.push(Axios.post("/api/routen", { route }));
      });

      Promise.all(promises)
        .then(results => {
          console.log(JSON.stringify(results));
          let resultValue = [];
          results.forEach(p => {
            if (p.data.insertedObjects && p.data.insertedObjects.length > 0) {
              resultValue = resultValue.concat(p.data.insertedObjects);
            }
          });
          resolve(resultValue);
        })
        .catch(error => {
          console.log("saveRoutes", JSON.stringify(error));
          reject({ message: "Kein Einfügen", error: error });
        });
    });
  }
  private saveFilialen(filialen: IFilialeModel[]): Promise<IFilialeModel[]> {
    return new Promise((resolve, reject) => {
      let promises = [];
      filialen.forEach(filiale => {
        promises.push(Axios.post("/api/filialen", { filiale }));
      });

      Promise.all(promises)
        .then(results => {
          console.log(JSON.stringify(results));
          let resultValue = [];
          results.forEach(p => {
            if (p.data.insertedObjects && p.data.insertedObjects.length > 0) {
              resultValue = resultValue.concat(p.data.insertedObjects);
            }
          });
          resolve(resultValue);
        })
        .catch(error => {
          console.log("saveFilialen", JSON.stringify(error));
          reject({ message: "Kein Einfügen", error: error });
        });
    });
  }
  private saveClick() {
    console.log("Save Click");
    if (!this.state.routenfahrten || this.state.routenfahrten.length < 0) {
      return;
    }

    let routenModels: IRouteModel[] = [];
    this.state.routenfahrten.forEach(fahrt => {
      let route: IRouteModel = {
        route_timestamp: fahrt.getTime(),
        ausgaben: [],
        links: [],
        timestamp: Date.now()
      };
      this.state.ausgaben.forEach(ausgabe => {
        route.ausgaben.push({
          value: ausgabe.value,
          description: ausgabe.description,
          id: ausgabe.id
        });
      });
      this.state.links.forEach(link => {
        route.links.push({
          link: link.link,
          text: link.text,
          id: link.id
        });
      });
      routenModels.push(route);
    });
    this.saveRoutes(routenModels)
      .then(insertedRouten => {
        if (this.state.routenfahrten.length === insertedRouten.length) {
          console.log("ROUTES OK!");
        }
        let filialen: IFilialeModel[] = [];
        filialen = this.state.filialen.map(filiale => {
          let routeId = "";
          insertedRouten.forEach(route => {
            if (filiale.fahrdatum === route.route_timestamp) {
              routeId = route._id;
            }
          });
          return {
            ausgaben: filiale.ausgaben,
            einnahmen: filiale.einnahmen,
            ort: filiale.ort,
            pkz: filiale.pkz,
            plz: filiale.plz,
            strasse: filiale.strasse,
            testnummer: filiale.testnummer,
            timestamp: Date.now(),
            route_id: routeId
          } as IFilialeModel;
        });
        return this.saveFilialen(filialen);
      })
      .then(insertedFilialen => {
        if (this.state.filialen.length === insertedFilialen.length) {
          console.log("FILIALEN OK!");
        }
        //     this.props.onExitPage();
      })
      .catch(() => {});
  }
  private cancelClick() {
    console.log("cancel Click");
    this.props.onExitPage();
  }
  private getRouteSelectOptions(): JSX.Element | JSX.Element[] {
    if (!this.state.routenfahrten || this.state.routenfahrten.length < 1) {
      return <option value="">Bitte Fahrdaten anlegen</option>;
    }
    return this.state.routenfahrten.map((fahrt, index) => {
      return (
        <option value={index} key={"fahrt_opt_" + index}>
          {getGermanDateString(fahrt)}
        </option>
      );
    });
  }

  private addFiliale() {
    let ns = { ...this.state };
    ns.filialen.push({
      ausgaben: 0,
      einnahmen: 0,
      ort: "",
      pkz: 0,
      plz: 0,
      strasse: "",
      testnummer: 0,
      timestamp: Date.now(),
      fahrdatum:
        this.state.routenfahrten.length > 0
          ? this.state.routenfahrten[0].getTime()
          : setDatePropertiesToZero(new Date()).getTime()
    });
    this.setState(ns);
  }
  private deleteFiliale(id: string) {
    let ns = { ...this.state };
    ns.filialen.splice(parseInt(id), 1);
    this.setState(ns);
  }

  private ausgabenChanged(id: string, value: number) {
    let ns = { ...this.state };
    ns.filialen[parseInt(id)].ausgaben = value;
    this.setState(ns);
  }
  private einnahmenChanged(id: string, value: number) {
    let ns = { ...this.state };
    ns.filialen[parseInt(id)].einnahmen = value;
    this.setState(ns);
  }
  private pkzChanged(id: string, value: number) {
    let ns = { ...this.state };
    ns.filialen[parseInt(id)].pkz = value;
    this.setState(ns);
  }
  private plzChanged(id: string, value: number) {
    let ns = { ...this.state };
    ns.filialen[parseInt(id)].plz = value;
    this.setState(ns);
  }
  private testnummerChanged(id: string, value: number) {
    let ns = { ...this.state };
    ns.filialen[parseInt(id)].testnummer = value;
    this.setState(ns);
  }

  private fahrdatumChanged(id: string, value: number) {
    let ns = { ...this.state };
    ns.filialen[parseInt(id)].fahrdatum = value;
    this.setState(ns);
  }
  private strasseChanged(id: string, value: string) {
    let ns = { ...this.state };
    ns.filialen[parseInt(id)].strasse = value;
    this.setState(ns);
  }
  private ortChanged(id: string, value: string) {
    let ns = { ...this.state };
    ns.filialen[parseInt(id)].ort = value;
    this.setState(ns);
  }

  private addAusgabe() {
    let ns = { ...this.state };
    ns.ausgaben.push({
      description: "",
      value: 0,
      id: generate_uuid()
    });
    this.setState(ns);
  }
  private deleteAusgabe(id: string) {
    let ns = { ...this.state };
    ns.ausgaben.splice(parseInt(id), 1);
    this.setState(ns);
  }
  private ausgabeValueChanged(id: string, value: number) {
    let ns = { ...this.state };
    ns.ausgaben[parseInt(id)].value = value;
    this.setState(ns);
  }
  private ausgabeDescriptionChanged(id: string, value: string) {
    let ns = { ...this.state };
    ns.ausgaben[parseInt(id)].description = value;
    this.setState(ns);
  }

  private addLink() {
    let ns = { ...this.state };
    ns.links.push({
      link: "",
      text: "",
      id: generate_uuid()
    });
    this.setState(ns);
  }
  private deleteLink(id: string) {
    let ns = { ...this.state };
    ns.links.splice(parseInt(id), 1);
    this.setState(ns);
  }
  private linkChanged(id: string, value: string) {
    let ns = { ...this.state };
    ns.links[parseInt(id)].link = value;
    this.setState(ns);
  }

  private addRoutenfahrt() {
    let fahrten = this.state.routenfahrten.concat([new Date()]);
    this.setState({
      routenfahrten: fahrten
    });
  }
  private deleteRoutenfahrt(id: string) {
    let ns = { ...this.state };
    ns.routenfahrten.splice(parseInt(id), 1);
    this.setState(ns);
  }
  private changeRouteDate(id: string, value: Date) {
    let d = value || new Date();
    let ns = { ...this.state };
    let newFahrten = [];
    ns.routenfahrten.forEach((element, index) => {
      newFahrten.push(index === parseInt(id) ? value : element);
    });
    ns.routenfahrten = newFahrten;
    this.setState(ns);
  }
  render() {
    console.log("render ManageRoute");
    return (
      <BasePage
        IncludeFabricElement={false}
        Body={
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12">
                <Panel
                  headerText="Routenlinks"
                  className="custom-padding-bottom-10px"
                  headerControls={
                    <ActionButton
                      data-automation-id="Add Link"
                      iconProps={{ iconName: "Add" }}
                      onClick={this.addLink}
                    />
                  }
                >
                  {this.state.links.map((link, index) => {
                    return (
                      <Link
                        key={"link_" + index}
                        linkId={index.toString()}
                        linkModel={link}
                        title={"Link " + (index + 1)}
                        onDeleteClick={this.deleteLink}
                        onLinkHrefChanged={this.linkChanged}
                      />
                    );
                  })}
                </Panel>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12">
                <Panel
                  headerText="Globale Ausgaben"
                  className="custom-padding-bottom-10px"
                  headerControls={
                    <ActionButton
                      data-automation-id="Add Ausgabe"
                      iconProps={{ iconName: "Add" }}
                      onClick={this.addAusgabe}
                    />
                  }
                >
                  {(!this.state.ausgaben || this.state.ausgaben.length < 1) && (
                    <div className="ms-font-xl ms-fontColor-themePrimary">
                      Es wurden bisher keine globalen Ausgaben erfasst
                    </div>
                  )}
                  {this.state.ausgaben.map((ausgabe, index) => {
                    return (
                      <Ausgabe
                        key={"ausgabe_" + index}
                        ausgabeId={index.toString()}
                        onDeleteClick={this.deleteAusgabe}
                        title={"Ausgabe " + (index + 1)}
                        ausgabeModel={ausgabe}
                        onDescriptionChanged={this.ausgabeDescriptionChanged}
                        onValueChanged={this.ausgabeValueChanged}
                      />
                    );
                  })}
                </Panel>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12">
                <Panel
                  headerText="Routenfahrdaten verwalten"
                  className="custom-padding-bottom-10px"
                  headerControls={
                    <ActionButton
                      data-automation-id="Add Routenfahrt"
                      iconProps={{ iconName: "Add" }}
                      onClick={this.addRoutenfahrt}
                    />
                  }
                >
                  {(!this.state.routenfahrten ||
                    this.state.routenfahrten.length < 1) && (
                    <div className="ms-font-xl ms-fontColor-themePrimary">
                      Es wurden bisher keine Routenfahrdaten erfasst
                    </div>
                  )}
                  {this.state.routenfahrten.map((fahrt, index) => {
                    return (
                      <Routenfahrt
                        key={"routnefahrt_" + index}
                        onDateChanged={this.changeRouteDate}
                        onDeleteClick={this.deleteRoutenfahrt}
                        routenfahrtId={index.toString()}
                        title={"Routenfahrt " + (index + 1)}
                        value={fahrt}
                      />
                    );
                  })}
                </Panel>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12">
                <Panel
                  headerText="Fahrten verwalten"
                  className="custom-padding-bottom-10px"
                  headerControls={
                    <ActionButton
                      data-automation-id="Add Ausgabe"
                      iconProps={{ iconName: "Add" }}
                      onClick={this.addFiliale}
                    />
                  }
                >
                  {(!this.state.filialen || this.state.filialen.length < 1) && (
                    <div className="ms-font-xl ms-fontColor-themePrimary">
                      Es wurden bisher keine Filialen erfasst
                    </div>
                  )}
                  {this.state.filialen.map((filiale, index) => {
                    return (
                      <Filiale
                        key={"route_" + index}
                        id={index.toString()}
                        title={"Fahrt " + (index + 1)}
                        filiale={filiale}
                        fahrdaten={this.state.routenfahrten}
                        onDeleteClick={this.deleteFiliale}
                        onAusgabenChanged={this.ausgabenChanged}
                        onEinnahmenChanged={this.einnahmenChanged}
                        onFahrdatumChanged={this.fahrdatumChanged}
                        onOrtChanged={this.ortChanged}
                        onPkzChanged={this.pkzChanged}
                        onPlzChanged={this.plzChanged}
                        onStrasseChanged={this.strasseChanged}
                        onTestnummerChanged={this.testnummerChanged}
                      />
                    );
                  })}
                </Panel>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12">
                <ButtonRow
                  saveButtonProps={{
                    checked: false,
                    disabled: false,
                    text: "Speichern",
                    onClickFunc: this.saveClick
                  }}
                  cancelButtonProps={{
                    checked: true,
                    disabled: false,
                    text: "Abbrechen",
                    onClickFunc: this.cancelClick
                  }}
                />
              </div>
            </div>
          </div>
        }
        Header={
          <div className="ms-font-xxl ms-textAlignCenter">
            {"Fahrten verwalten"}
          </div>
        }
      />
    );
  }
}

// this.state.routenfahrten.map(
//   (fahrt, index) => {
//     return (
//       <option
//         key={index}
//         value={fahrt.getTime().toString()}
//       >
//         {getGermanDateString(fahrt)}
//       </option>
//     );
//   }
// )
