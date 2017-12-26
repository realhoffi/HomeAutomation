import * as React from "react";
import { ActionButton } from "office-ui-fabric-react";
import { PageType } from "../../../../enums/enums";
import { BasePage } from "../../../../global/components/container/basePage";
import { ButtonRow } from "../../../../global/components/simple/ButtonRow";

export interface IRouteProps {
  pageType: PageType;
  onExitPage(): void;
}

export class Route extends React.Component<IRouteProps, {}> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <BasePage
        IncludeFabricElement={false}
        Body={
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12" />
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12" />
            </div>
          </div>
        }
      />
    );
  }
}
