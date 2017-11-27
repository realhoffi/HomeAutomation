import * as ReactDOM from "react-dom";
import * as React from "react";
import { GlobalApplication } from "./globalApplication";
import { HashRouter } from "react-router-dom";
import { initializeIcons } from "@uifabric/icons";
initializeIcons();
window.onload = () => {
    ReactDOM.render(<HashRouter>
        <GlobalApplication requestUrl="" />
    </HashRouter>, document.getElementById("reactRoot"));
};
