import React, { useEffect, useState, useMemo } from "react";
import Header from "components/Header";
import SubHeader from "components/SubHeader";
import { TableHeader, Pagination, Search } from "components/DataTable";
import useFullPageLoader from "hooks/useFullPageLoader";
import ExternalInfo from "components/ExternalInfo";
import AppConfig from "App.config";
import axios from "axios";
import { NavLink } from "react-router-dom";
import DataTable from "pages/DataTable";

const Windturbines = () => {
  const url = "windturbines";
  const columns = [


    { title: "ID", field: "id", filterPlaceholder: "filter" },


    { title: "Name", field: "name", sorting: true, filtering: true, cellStyle: { background: "#009688" }, headerStyle: { color: "#fff" } },

    { title: "Latitude", field: "latitude", filterPlaceholder: "filter" },
    { title: "Longitude", field: "longitude", filterPlaceholder: "filter" },
    { title: "Serial Number", field: "serialNumber", filterPlaceholder: "filter" },
    { title: "Acquisition Status", render: rowData => rowData.acquisitionStatus.name, filterPlaceholder: "filter", customFilterAndSearch: (term, rowData) => rowData.acquisitionStatus.name.indexOf(term) >= 0 },
    { title: "Windturbine Height", field: "windturbineHeight", filterPlaceholder: "filter" },
    { title: "Installation Date", field: "installationDate", filterPlaceholder: "filter" },
    { title: "Company Name", render: rowData => rowData.company.name, filterPlaceholder: "filter", customFilterAndSearch: (term, rowData) => !(!rowData.company ||  !rowData.company.name || rowData.company.name.indexOf(term) < 0)  },
    { title: "Company Phone Number", render: rowData => rowData.company.phoneNumber, filterPlaceholder: "filter", customFilterAndSearch: (term, rowData) => rowData.company.phoneNumber.indexOf(term) >= 0 },
    { title: "Company Email", render: rowData => rowData.company.emailId, filterPlaceholder: "filter", customFilterAndSearch: (term, rowData) => term == rowData.company.emailId },
    { title: "Company Street Name", render: rowData => rowData.company.streetName, filterPlaceholder: "filter", customFilterAndSearch: (term, rowData) => term == rowData.company.streetName },
    { title: "Company House Number", render: rowData => rowData.company.houseNumber, filterPlaceholder: "filter", customFilterAndSearch: (term, rowData) => term == rowData.company.houseNumber },
    { title: "Company Zipcode", render: rowData => rowData.company.postalCode, filterPlaceholder: "filter", customFilterAndSearch: (term, rowData) => term == rowData.company.postalCode },
    { title: "Company City", render: rowData => rowData.company.city, filterPlaceholder: "filter", customFilterAndSearch: (term, rowData) => term == rowData.company.city },
    { title: "Company State (Bundesland)", render: rowData => rowData.company.state, filterPlaceholder: "filter", customFilterAndSearch: (term, rowData) => term == rowData.company.state },

    { title: "Rotor Diameter", field: "rotorDiameter", filterPlaceholder: "filter" },
    { title: "Manufacturer", render: rowData => rowData.manufacturer.name, filterPlaceholder: "filter", customFilterAndSearch: (term, rowData) => term == rowData.manufacturer.name.indexOf(term) >= 0 },

    { title: "Model Name", field: "modelName", filterPlaceholder: "filter" },
    { title: "OEM SA", field: "oemsa", filterPlaceholder: "filter" },
    { title: "Visibility Meter", field: "visibilityMeter", filterPlaceholder: "filter" },
    { title: "Scada PC", field: "scadaPc", filterPlaceholder: "filter", grouping: false },
    { title: "Nacelle Light", field: "nacelleLight", filterPlaceholder: "filter", grouping: false },
    { title: "VLAN", field: "vlan", filterPlaceholder: "filter", grouping: false },
    { title: "Tower Light Wireless Connection", field: "towerLightWirelessConnection", filterPlaceholder: "filter", grouping: false },
    { title: "Nacelle Light Wireless Connection", field: "nacelleLightWirelessConnection", filterPlaceholder: "filter", grouping: false },
    { title: "QSI PAN ID", field: "qsiPanId", filterPlaceholder: "filter", grouping: false },
    { title: "QRT Binary Code", field: "qrtBinaryCode", filterPlaceholder: "filter", grouping: false }
  ];

  const actions = [{ text: "Show Map", path: "/" }];

  const subActions = [
    { text: "Lcus", path: "/lcus" },
    { text: "Receivers", path: "/receivers" },
    { text: "Substations", path: "/substations" },
    { text: "Radars", path: "/radars" },
    { text: "Comments", path: "/comments" }
  ];

  const rowActions = [
    { text: "showTable", path: "/data-table" },
  ];
  return (
    <>
      <Header title="Windturbines" actions={actions} />
      <SubHeader title="" actions={subActions} />
      <DataTable url={url} columns={columns} actions={rowActions} title="Windturbines" />
    </>
  );
};

export default Windturbines;
