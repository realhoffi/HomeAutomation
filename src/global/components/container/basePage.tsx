import * as React from "react";
import { Fabric } from "office-ui-fabric-react";
export interface IBasePageProps {
    Header?: JSX.Element;
    Footer?: JSX.Element;
    Body: JSX.Element;
    Navigation?: JSX.Element;
}
export class BasePage extends React.PureComponent<IBasePageProps, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return <Fabric>
            <div className="ms-Grid">
                {
                    this.props.Header &&
                    <div className="ms-Grid-row">
                        {this.props.Header}
                    </div>
                }
                <div className="ms-Grid-row">
                    {
                        this.props.Navigation && [
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg4 ms-xl2" key="navigation">
                                {this.props.Navigation}
                            </div>,
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg8 ms-xl10" key="content">
                                {this.props.Body}
                            </div>
                        ]
                    }
                    {
                        !this.props.Navigation &&
                        <div className="ms-Grid-col ms-sm12">
                            {this.props.Body}
                        </div>
                    }
                </div>
                {
                    this.props.Footer &&
                    <div className="ms-Grid-row">
                        {this.props.Footer}
                    </div>
                }
            </div>
        </Fabric>;
    }
}