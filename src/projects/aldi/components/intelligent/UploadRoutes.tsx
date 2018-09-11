import * as React from "react";
import Axios from "axios";
import { IRouteModel } from "../../../../interfaces/aldi";
import { Fragment } from "react";
import { ButtonRow } from "../../../../global/components/simple/ButtonRow";

export interface IUploadRoutesProps {
  uploadClick(routes: IRouteModel[]): void;
  cancelClick(): void;
}
export class UploadRoutes extends React.Component<IUploadRoutesProps, {}> {
  textareaElement: HTMLTextAreaElement = undefined;
  constructor(props) {
    super(props);

    this.uploadClick = this.uploadClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.setRef = this.setRef.bind(this);
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
  private createRoutes(value: string): IRouteModel[] {
    let returnValues: IRouteModel[] = [];
    if (!value) {
      return returnValues;
    }
    let routes = value.split("\n");
    routes.forEach(route => {
      let rows = route.split("\t");
      let r: IRouteModel = {
        timestamp: Date.now(),
        route_timestamp: Date.now(),
        ausgaben: [],
        links: []
      };

      returnValues.push(r);
    });
    return;
  }
  private uploadClick() {
    let routes = this.createRoutes(this.textareaElement ? this.textareaElement.value : "");
    this.props.uploadClick(routes);
  }
  private cancelClick() {
    this.props.cancelClick();
  }
  private setRef(element) {
    this.textareaElement = element;
  }
  render() {
    console.log("render UploadRoutes");
    return (
      <Fragment>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <textarea cols={100} rows={40} ref={this.setRef} />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <ButtonRow
              saveButtonProps={{
                text: "Upload",
                disabled: false,
                checked: false,
                onClickFunc: this.uploadClick
              }}
              cancelButtonProps={{
                text: "Abbrechen",
                disabled: false,
                checked: false,
                onClickFunc: this.cancelClick
              }}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
