import { IColumn } from "office-ui-fabric-react";
import { IRouteViewModel } from "../../../interfaces/aldi";
import * as React from "react";
import {
  getGermanDateString,
  getGermanDateTimeString
} from "../../../helper/date";

export const routeOverviewColumns: IColumn[] = [
  {
    key: "column1",
    name: "#",
    fieldName: "index",
    minWidth: 30,
    maxWidth: 60,
    isResizable: true,
    isCollapsable: true,
    data: "number",
    onRender: (item: IRouteViewModel) => {
      return <span>{item.index}</span>;
    }
  },
  {
    key: "column2",
    name: "",
    fieldName: "ctx",
    minWidth: 30,
    maxWidth: 60,
    isResizable: true,
    isCollapsable: false,
    onRender: (item: IRouteViewModel) => {
      return <span>{"..."}</span>;
    }
  },
  {
    key: "column5",
    name: "Fahrdatum",
    fieldName: "route_timestamp",
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    isCollapsable: true,
    data: "string",
    onRender: (item: IRouteViewModel) => {
      return <span>{getGermanDateString(new Date(item.route_timestamp))}</span>;
    }
  },
  {
    key: "column3",
    name: "Bearbeitet am",
    fieldName: "modified",
    minWidth: 100,
    maxWidth: 150,
    isResizable: true,
    data: "string",
    onRender: (item: IRouteViewModel) => {
      return <span>{getGermanDateTimeString(new Date(item.modified))}</span>;
    },
    isPadded: true
  },
  {
    key: "column4",
    name: "Erstellt am",
    fieldName: "created",
    minWidth: 100,
    maxWidth: 150,
    isResizable: true,
    isCollapsable: true,
    data: "string",
    onRender: (item: IRouteViewModel) => {
      return <span>{getGermanDateTimeString(new Date(item.created))}</span>;
    },
    isPadded: true
  }
];
