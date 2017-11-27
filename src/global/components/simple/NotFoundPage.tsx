import * as React from "react";
import { Link } from "react-router-dom";
import { Status } from "./routing";

export class NotFoundPage extends React.Component<{}, {}> {
    render() {
        return (
            <Status code={404}>
                <div className="not-found">
                    <h1>404</h1>
                    <h2>Page not found!</h2>
                    <p>
                        <Link to="/">Return to Main Page</Link>
                    </p>
                </div>
            </Status>
        );
    }
}