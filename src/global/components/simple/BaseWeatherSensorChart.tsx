import * as React from "react";
import { Toggle, Slider, Label, Icon, Spinner, SpinnerSize } from "office-ui-fabric-react";
import { IBaseWeatherSensor } from "../../../interfaces/xiaomi";
import { Panel } from "../../../global/components/simple/Panel";
import Axios from "axios";
import { Fragment } from "react";
import { Line, ChartData } from "react-chartjs-2";
import * as chartjs from "chart.js";
import { getGermanDateString, addDays, setDatePropertiesToZero, getGermanDateTimeString } from "../../../helper/date";
import { ChartOptions } from "chart.js";

const options = [
  <option value="1" key={"k1"}>
    Heute
  </option>,
  <option value="2" key={"k2"}>
    Letzten 2 Tage
  </option>,
  <option value="3" key={"k3"}>
    Letzte Woche
  </option>,
  <option value="4" key={"k4"}>
    Alle
  </option>
];

export interface IBaseWeatherSensorChartProps {
  sensorInformations: IBaseWeatherSensor;
}
export interface IBaseWeatherSensorChartState {
  options: chartjs.ChartOptions;
  rawSensorData: number[];
  sensorData: ChartData<chartjs.ChartData>;
  isError: boolean;
  isLoadingSensorData: boolean;
  selectedRange: string;
}
export class BaseWeatherSensorChart extends React.Component<IBaseWeatherSensorChartProps, IBaseWeatherSensorChartState> {
  constructor(props) {
    super(props);
    this.state = {
      sensorData: undefined,
      rawSensorData: [],
      isError: false,
      isLoadingSensorData: true,
      selectedRange: "1",
      options: undefined
    };
    this.dateRangeSelectionChanged = this.dateRangeSelectionChanged.bind(this);
    this.getTooltipTitle = this.getTooltipTitle.bind(this);
  }
  getChartData(defaultData: any[]): chartjs.ChartData {
    let dataRows: any[] = defaultData;
    // dataRows = this.filterDataBySelectedDateRange(dataRows, selectedRange);
    let data: chartjs.ChartData = {
      datasets: [],
      labels: []
    };

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
      if (!row.timestamp) return;
      labels.push(row.timestamp);
      // labels.push(getGermanDateString(new Date(row.timestamp)));
      if (row.temperature && row.temperature < 100) {
        tempValues.push(row.temperature);
      }
      if (row.humidity && row.humidity >= 0) {
        humidityValues.push(row.humidity);
      }
      if (row.pressure && row.pressure >= 0) {
        pressureValues.push(row.pressure);
      }
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
        pointRadius: 1,
        pointHitRadius: 3,
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
        pointRadius: 1,
        pointHitRadius: 3,
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
        pointRadius: 1,
        pointHitRadius: 3,
        fill: false
      });
    }
    return data;
  }
  querySensorDataByDateRange(from: number, to: number) {
    return Axios.get("/api/sensors/" + this.props.sensorInformations.id + "/between/" + from + "/" + to);
  }
  queryAllSensorData() {
    return Axios.get("/api/sensors/" + this.props.sensorInformations.id + "/data");
  }
  getDateTickRangeBySelection(selectedOption: string) {
    let from = -1;
    let to = -1;
    switch (selectedOption) {
      case "1":
        from = setDatePropertiesToZero(new Date()).getTime();
        to = Date.now();
        break;
      case "2":
        from = addDays(new Date(), -2, true).getTime();
        to = Date.now();
        break;
      case "3":
        from = addDays(new Date(), -7, true).getTime();
        to = Date.now();
        break;
      case "4":
        break;
      default:
        console.log("getDateTickRangeBySelection", "value not found...", selectedOption);
    }
    return {
      from: from,
      to: to
    };
  }
  queryLiveDate(selectedOption: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let dateRange = this.getDateTickRangeBySelection(selectedOption);
      this.querySensorDataByDateRange(dateRange.from, dateRange.to)
        .then(dataResult => {
          if (!dataResult.data) {
            resolve([]);
          }
          if (!dataResult.data.items || dataResult.data.items.lenght === 0) {
            resolve([]);
          }

          resolve(dataResult.data.items);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  getTooltipTitle(tooltipItem, data) {
    let returnValue = undefined;
    if (this.state.rawSensorData && this.state.rawSensorData.length >= tooltipItem[0].index) {
      let sensorTimeStamp: any = this.state.rawSensorData[tooltipItem[0].index];
      if (sensorTimeStamp) {
        let timestamp = sensorTimeStamp.timestamp;
        returnValue = getGermanDateTimeString(new Date(timestamp));
      }
    }
    if (!returnValue) {
      returnValue = data.labels[tooltipItem[0].index];
    }
    return returnValue;
  }
  doSensorQueryNow() {
    this.queryLiveDate(this.state.selectedRange)
      .then(result => {
        let chartData = this.getChartData(result);
        let options: chartjs.ChartOptions = { tooltips: {} };

        options.tooltips.callbacks = {
          title: this.getTooltipTitle
          //  function() {

          //   // data.labels[tooltipItem[0].index];
          // }
          // label: function(tooltipItem, data) {
          //   let amount =
          //     data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          //   return "huhu";
          // }
          // footer: function(tooltipItem, data) { return 'Total: 100 planos.'; }
        };
        if (chartData && chartData.labels && chartData.labels.length > 0) {
          chartData.labels = chartData.labels.map(label => {
            label = getGermanDateString(new Date(parseFloat(label.toString())));
            return label;
          });
        }
        this.setState({
          rawSensorData: result,
          options: options,
          sensorData: chartData,
          isLoadingSensorData: false
        });
      })
      .catch(error => {
        this.setState({
          isError: true,
          isLoadingSensorData: false
        });
      });
  }
  componentDidMount() {
    this.doSensorQueryNow();
  }

  dateRangeSelectionChanged(event) {
    let index = event.target.selectedIndex;
    let selectedOptionValue = event.target.options[index].value;
    this.setState(
      {
        isLoadingSensorData: true,
        selectedRange: selectedOptionValue
      },
      () => {
        this.doSensorQueryNow();
      }
    );
  }
  render() {
    console.log("BaseWeatherSensorChart render");
    if (!this.state.sensorData) return null;
    if (this.state.isError) {
      return (
        this.state.isError && (
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">Es ist ein Fehler aufgetreten...</div>
          </div>
        )
      );
    }
    let sensorDataContent = null;
    if (this.state.isLoadingSensorData) {
      sensorDataContent = <Spinner size={SpinnerSize.large} label="Lade Sensor-Daten..." />;
    } else {
      if (!this.state.sensorData) {
        sensorDataContent = "Keine Daten vorhanden...";
      } else {
        sensorDataContent = <Line datasetKeyProvider={undefined} data={this.state.sensorData} options={this.state.options} height={400} width={400} />;
      }
    }
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
              <Label>Zeitraum</Label>
              <select onChange={this.dateRangeSelectionChanged} value={this.state.selectedRange}>
                {options}
              </select>
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">{sensorDataContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
