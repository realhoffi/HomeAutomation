import * as React from "react";
import { Toggle, Slider, Label, Icon } from "office-ui-fabric-react";
import { IBaseWeatherSensor } from "../../../interfaces/xiaomi";
import { Panel } from "../../../global/components/simple/Panel";
import Axios from "axios";
import { Fragment } from "react";
import { Line, ChartData } from "react-chartjs-2";
import * as chartjs from "chart.js";
import { getGermanDateString, addDays } from "../../../helper/date";

const options = [
  <option value="1" key={"k1"}>
    Heute
  </option>,
  <option value="2" key={"k2"}>
    Letzte Woche
  </option>,
  <option value="3" key={"k3"}>
    Alle
  </option>,
  <option value="4" key={"k4"}>
    Letzten 2 Tage
  </option>
];

export interface IBaseWeatherSensorChartProps {
  sensorInformations: IBaseWeatherSensor;
}
export interface IBaseWeatherSensorChartState {
  sensorData: any[];
  temporarySensorData: ChartData<chartjs.ChartData>;
  isError: boolean;
  selectedRange: string;
}
export class BaseWeatherSensorChart extends React.Component<
  IBaseWeatherSensorChartProps,
  IBaseWeatherSensorChartState
> {
  constructor(props) {
    super(props);
    this.state = {
      sensorData: undefined,
      temporarySensorData: undefined,
      isError: false,
      selectedRange: "1"
    };
    this.dateRangeSelectionChanged = this.dateRangeSelectionChanged.bind(this);
  }
  filterDataBySelectedDateRange(itemArray: any[], selectedRange: string) {
    let items = [];

    itemArray.forEach(row => {
      if (!row.timestamp && !row.insertTime) return;

      let itemCreationDate = new Date(row.timestam || row.insertTime);
      let itemCreationDateString = getGermanDateString(itemCreationDate);

      let calculatedDate = new Date();
      switch (selectedRange) {
        case "1":
          if (getGermanDateString(new Date()) === itemCreationDateString) {
            items.push(row);
          }
          break;
        case "2":
          calculatedDate = addDays(calculatedDate, -7, true);
          if (itemCreationDate.getTime() >= calculatedDate.getTime()) {
            items.push(row);
          }
          break;
        case "3":
          items.push(row);
          break;
        case "4":
          calculatedDate = addDays(calculatedDate, -2, true);
          if (itemCreationDate.getTime() >= calculatedDate.getTime()) {
            items.push(row);
          }
          break;
        default:
          console.log(
            "getDataBySelectedDateRange",
            "value not found...",
            selectedRange
          );
      }
    });
    return items;
  }

  getChartData(defaultData: any[], selectedRange: string): chartjs.ChartData {
    let dataRows: any[] = defaultData;
    dataRows = this.filterDataBySelectedDateRange(dataRows, selectedRange);
    let data: chartjs.ChartData = { datasets: [], labels: [] };
    data.datasets.push({ label: "Temperatur", data: [] });
    data.datasets.push({ label: "Luftfeuchtigkeit", data: [] });
    if (this.props.sensorInformations.hasPressure) {
      data.datasets.push({ label: "Druck", data: [] });
    }
    let labels = [];
    let tempValues = [];
    let humidityValues = [];
    let pressureValues = [];

    dataRows.forEach(row => {
      if (!row.timestamp && !row.insertTime) return;

      labels.push(
        getGermanDateString(new Date(row.timestam || row.insertTime))
      );
      tempValues.push(row.temperature);
      humidityValues.push(row.humidity);
      pressureValues.push(row.pressure);
    });
    data.labels = labels;
    data.datasets = [
      {
        data: tempValues,
        label: "Temperatur",
        backgroundColor: "rgba(75,0,192,0.4)",
        borderColor: "rgba(75,0,192,1)",
        borderCapStyle: "butt",
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        lineTension: 0.3,
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        fill: false
      },
      {
        data: humidityValues,
        label: "Feuchtigkeit",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        lineTension: 0.3,
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        fill: false
      }
    ];
    if (this.props.sensorInformations.hasPressure) {
      data.datasets.push({
        data: pressureValues,
        label: "Druck",
        backgroundColor: "rgba(255,255,0,0.4)",
        borderColor: "rgba(255,255,0,1)",
        borderCapStyle: "butt",
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        lineTension: 0.3,
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        fill: false
      });
    }
    return data;
  }
  componentDidMount() {
    Axios.get("/api/sensors/" + this.props.sensorInformations.id + "/data")
      .then(dataResult => {
        if (!dataResult.data) {
          return;
        }
        if (!dataResult.data.items || dataResult.data.items.lenght === 0) {
          return;
        }
        let dataRows = this.getChartData(
          dataResult.data.items,
          this.state.selectedRange
        );
        this.setState({
          sensorData: dataResult.data.items,
          temporarySensorData: dataRows
        });
      })
      .catch(error => {
        this.setState({ isError: true });
      });
  }
  dateRangeSelectionChanged(event) {
    // debugger;
    let index = event.target.selectedIndex;
    let selectedOptionValue = event.target.options[index].value;
    let items = this.getChartData(this.state.sensorData, selectedOptionValue);
    this.setState({
      selectedRange: selectedOptionValue,
      temporarySensorData: items
    });
  }
  render() {
    console.log("BaseWeatherSensorChart render");
    if (!this.state.sensorData) return null;
    if (this.state.isError) {
      return (
        this.state.isError && (
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
              Es ist ein Fehler aufgetreten...
            </div>
          </div>
        )
      );
    }
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
              <Label>Zeitraum</Label>
              <select
                onChange={this.dateRangeSelectionChanged}
                value={this.state.selectedRange}
              >
                {options}
              </select>
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
              {!this.state.sensorData ? (
                "Keine Daten vorhanden..."
              ) : (
                <Line data={this.state.temporarySensorData} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
