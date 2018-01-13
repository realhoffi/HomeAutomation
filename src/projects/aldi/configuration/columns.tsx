import { IColumn } from "office-ui-fabric-react";
import { IRouteViewModel, IFilialeViewModel } from "../../../interfaces/aldi";
import * as React from "react";
import {
  getGermanDateString,
  getGermanDateTimeString
} from "../../../helper/date";

export const defaultColumns: IColumn[] = [];

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
    isResizable: false,
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
    isResizable: false,
    isCollapsable: false,
    data: "string",
    onRender: (item: IRouteViewModel) => {
      return <span>{getGermanDateTimeString(new Date(item.created))}</span>;
    }
  }
];
export const filialOverviewColumns: IColumn[] = [
  {
    key: "column1",
    name: "#",
    fieldName: "index",
    minWidth: 30,
    maxWidth: 60,
    isResizable: true,
    isCollapsable: true,
    data: "number",
    onRender: (item: IFilialeViewModel) => {
      return <span>{item.index}</span>;
    }
  },
  {
    key: "column2",
    name: "",
    fieldName: "ctx",
    minWidth: 30,
    maxWidth: 60,
    isResizable: false,
    isCollapsable: false,
    onRender: (item: IRouteViewModel) => {
      return <span>{"..."}</span>;
    }
  },
  {
    key: "column7",
    name: "Straße",
    fieldName: "strasse",
    minWidth: 150,
    maxWidth: 200,
    isResizable: true,
    isCollapsable: true,
    data: "string",
    onRender: (item: IFilialeViewModel) => {
      return <span>{item.strasse}</span>;
    }
  },
  {
    key: "column5",
    name: "Plz",
    fieldName: "plz",
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    isCollapsable: true,
    data: "string",
    onRender: (item: IFilialeViewModel) => {
      return <span>{item.plz}</span>;
    }
  },
  {
    key: "column6",
    name: "Ort",
    fieldName: "ort",
    minWidth: 100,
    maxWidth: 120,
    isResizable: true,
    isCollapsable: true,
    data: "string",
    onRender: (item: IFilialeViewModel) => {
      return <span>{item.ort}</span>;
    }
  },
  {
    key: "column8",
    name: "Testnummer",
    fieldName: "testnummer",
    minWidth: 100,
    maxWidth: 120,
    isResizable: true,
    isCollapsable: true,
    data: "string",
    onRender: (item: IFilialeViewModel) => {
      return <span>{item.testnummer}</span>;
    }
  },
  {
    key: "column9",
    name: "Pkz",
    fieldName: "pkz",
    minWidth: 30,
    maxWidth: 40,
    isResizable: true,
    isCollapsable: true,
    data: "string",
    onRender: (item: IFilialeViewModel) => {
      return <span>{item.pkz}</span>;
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
    onRender: (item: IFilialeViewModel) => {
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
    isResizable: false,
    isCollapsable: false,
    data: "string",
    onRender: (item: IFilialeViewModel) => {
      return <span>{getGermanDateTimeString(new Date(item.created))}</span>;
    }
  }
];
