import * as React from "react";
import { ActionButton, TextField, DatePicker, IDropdownOption, CommandBarButton, Link, IIconProps, IButtonProps, Label } from "office-ui-fabric-react";
import { PageType } from "../../../../data/enums";
import { BasePage } from "../../../../global/components/container/basePage";
import { ButtonRow } from "../../../../global/components/simple/ButtonRow";
import { Panel } from "../../../../global/components/simple/Panel";
import { NumberTextField } from "../../../../global/components/simple/NumberTextField";
import { getGermanDateString } from "../../../../helper/date";

export interface IAusgabe {
    value: number;
    title: string;
}
export interface IFilialenModel {
    Plz: number;
    Ort: string;
    Straße: string;
    Pkz: number;
    Testnummer: number;
    Einnahmen: number;
    Ausgaben: number;
}
export interface IManageRouteProps {
    pageType: PageType;
    onExitPage(): void;
}
export interface IManageRouteState {
    routenfahrten: Date[];
    filialen: IFilialenModel[];
    ausgaben: IAusgabe[];
    googleMapsLink: string;
}
export class ManageRoute extends React.Component<IManageRouteProps, IManageRouteState> {
    constructor(props) {
        super(props);

        this.state = { filialen: [], routenfahrten: [], ausgaben: [], googleMapsLink: "" };

        this.cancelClick = this.cancelClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
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
    private saveClick() {
        console.log("Save Click");
        this.props.onExitPage();
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
            return <option value={index} key={"fahrt_opt_" + index}>{getGermanDateString(fahrt)}</option>;
        });
    }
    render() {
        console.log("render ManageRoute");
        return <BasePage IncludeFabricElement={false} Body={
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                        <Panel headerText="Routeninformationen" className="custom-padding-bottom-10px">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm2 ms-lg1">
                                    <Label>
                                        <Link href={this.state.googleMapsLink} disabled={!this.state.googleMapsLink} target="_blank">Maps</Link>
                                    </Label>
                                </div>
                                <div className="ms-Grid-col ms-sm10">
                                    <TextField placeholder="Link zu Google Maps" value={this.state.googleMapsLink} onChanged={(text: string) => {
                                        this.setState({ googleMapsLink: text });
                                    }} />
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                        <Panel headerText="Ausgaben" className="custom-padding-bottom-10px" headerControls={
                            <ActionButton
                                data-automation-id="Add Ausgabe"
                                iconProps={{ iconName: "Add" }}
                                onClick={() => {
                                    let ns = { ...this.state };
                                    ns.ausgaben.push({ title: "", value: 0 });
                                    this.setState(ns);
                                }}
                            />
                        } >
                            {
                                (!this.state.ausgaben || this.state.ausgaben.length < 1) &&
                                <div className="ms-font-xl ms-fontColor-themePrimary">Es wurden bisher keine Ausgaben erfasst</div>
                            }
                            {
                                this.state.ausgaben.map((ausgabenWert, index) => {
                                    return <Panel key={"ausgabe_" + index} headerText={"Ausgabe " + (index + 1)} className="custom-padding-bottom-10px" headerControls={
                                        <ActionButton data-info-title={"Ausgabe " + (index + 1)} data-info-desc={"Ausgabe " + (index + 1)}
                                            iconProps={{ iconName: "Delete", className: "img-font-size-large" }}
                                            onClick={() => {
                                                let ns = { ...this.state };
                                                ns.ausgaben.splice(index, 1);
                                                this.setState(ns);
                                            }}
                                        />
                                    }>
                                        {
                                            <div className="ms-Grid-row">
                                                <div className="ms-Grid-col ms-sm12 ms-lg6 ">
                                                    <TextField placeholder="Ausgabenbeschreibung"
                                                        required={true}
                                                        label="Beschreibung der Ausgabe"
                                                        value={ausgabenWert.title} />
                                                </div>
                                                <div className="ms-Grid-col ms-sm12 ms-lg6" >
                                                    <NumberTextField placeholder="Ausgaben in Euro"
                                                        label="Wert der Ausgabe"
                                                        required={true}
                                                        numberValue={ausgabenWert.value}
                                                        suffix=" Euro" />
                                                </div>
                                            </div>
                                        }
                                    </Panel>;

                                })
                            }
                        </Panel>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                        <Panel headerText="Routenfahr-Daten verwalten" className="custom-padding-bottom-10px" headerControls={
                            <ActionButton
                                data-automation-id="Add Routenfahrt"
                                iconProps={{ iconName: "Add" }}
                                onClick={() => {
                                    let fahrten = this.state.routenfahrten.concat([new Date()]);
                                    this.setState({ routenfahrten: fahrten });
                                }}
                            />
                        }>
                            {
                                (!this.state.routenfahrten || this.state.routenfahrten.length < 1) &&
                                <div className="ms-font-xl ms-fontColor-themePrimary">Es wurden bisher keine Fahrdaten erfasst</div>
                            }
                            {
                                this.state.routenfahrten.map((fahrt, index) => {
                                    return <div className="ms-Grid-row" key={"route_" + index}>
                                        <div className="ms-Grid-col ms-sm2 ms-md1 ms-lg1">
                                            <Label className="ms-fontSize-l ms-textAlignCenter">{index + 1}</Label>
                                        </div>
                                        <div className="ms-Grid-col ms-sm8 ms-md5 ms-lg3">
                                            <DatePicker placeholder="Bitte Fahrdatum auswählen"
                                                showWeekNumbers={true}
                                                showMonthPickerAsOverlay={true}
                                                allowTextInput={false}
                                                formatDate={getGermanDateString}
                                                firstDayOfWeek={1}
                                                key={"fahrt" + index}
                                                value={fahrt}
                                                onSelectDate={(date: Date | null | undefined) => {
                                                    let ns = { ...this.state };
                                                    ns.routenfahrten[index] = date;
                                                    this.setState(ns);
                                                }} />
                                        </div>
                                        <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg1">
                                            <ActionButton data-info-title="Fahrdatum entfernen" data-info-desc="Löscht das Fahrdatum"
                                                iconProps={{ iconName: "Delete", className: "img-font-size-large" }}
                                                onClick={() => {
                                                    let ns = { ...this.state };
                                                    ns.routenfahrten.splice(index, 1);
                                                    this.setState(ns);
                                                }}
                                            />
                                        </div>
                                    </div>;
                                })
                            }
                        </Panel>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                        <Panel headerText="Fahrten verwalten" className="custom-padding-bottom-10px" headerControls={
                            <ActionButton
                                data-automation-id="Add Ausgabe"
                                iconProps={{ iconName: "Add" }}
                                onClick={() => {
                                    let ns = { ...this.state };
                                    ns.filialen.push({ Ausgaben: 0, Einnahmen: 0, Ort: "", Pkz: 0, Plz: 0, Straße: "", Testnummer: 0 });
                                    this.setState(ns);
                                }}
                            />
                        }>
                            {
                                (!this.state.filialen || this.state.filialen.length < 1) &&
                                <div className="ms-font-xl ms-fontColor-themePrimary">Es wurden bisher keine Filialen erfasst</div>
                            }
                            {
                                this.state.filialen.map((filiale, index) => {
                                    return <div className="ms-Grid-row" key={"fahrt_" + index} >
                                        <div className="ms-Grid-col ms-sm12">
                                            <Panel headerText={"Fahrt " + (index + 1)} headerControls={
                                                <ActionButton data-info-title="Filiale entfernen"
                                                    data-info-desc="Löscht die Filiale"
                                                    iconProps={{ iconName: "Delete" }}
                                                    onClick={() => {
                                                        let ns = { ...this.state };
                                                        ns.filialen.splice(index, 1);
                                                        this.setState(ns);
                                                    }}
                                                />
                                            }>
                                                <div className="ms-Grid-row">
                                                    <div className="ms-Grid-col ms-sm12 ">
                                                        <select style={{ padding: "10px", width: "100%" }}>
                                                            {
                                                                this.getRouteSelectOptions()
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="ms-Grid-col ms-sm12 ms-lg5">
                                                        <TextField required={true} placeholder="Straße" label="Straße" value={filiale.Straße} />
                                                    </div>
                                                    <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg2">
                                                        <NumberTextField required={true} placeholder="Plz" label="Plz" numberValue={filiale.Plz} />
                                                    </div>
                                                    <div className="ms-Grid-col ms-sm9 ms-md9 ms-lg5">
                                                        <TextField required={true} placeholder="Ort" label="Ort" value={filiale.Ort} />
                                                    </div>
                                                    <div className="ms-Grid-col ms-sm9 ms-md10">
                                                        <NumberTextField required={true} placeholder="Testnummer" label="Testnummer" numberValue={filiale.Testnummer} />
                                                    </div>
                                                    <div className="ms-Grid-col ms-sm3 ms-md2">
                                                        <NumberTextField required={true} placeholder="Prüfkennziffer" label="Pkz." numberValue={filiale.Pkz} />
                                                    </div>
                                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                                        <NumberTextField placeholder="Einnahmen" label="Einnahmen" numberValue={filiale.Einnahmen} suffix=" €" />
                                                    </div>
                                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                                        <NumberTextField placeholder="Ausgaben" label="Ausgaben" numberValue={filiale.Ausgaben} suffix=" €" />
                                                    </div>
                                                </div>
                                            </Panel>
                                        </div>
                                    </div>;
                                })
                            }
                        </Panel>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                        <ButtonRow saveButtonProps={{ checked: false, disabled: false, text: "Speichern", onClickFunc: this.saveClick }}
                            cancelButtonProps={{ checked: true, disabled: false, text: "Abbrechen", onClickFunc: this.cancelClick }} />
                    </div>
                </div>
            </ div>
        } Header={
            <div className="ms-font-xxl ms-textAlignCenter">
                {"Route verwalten"}
            </div>
        } />;
    }
}
