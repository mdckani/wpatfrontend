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

const Radars = () => {
  const url = "radars";
  const columns = [ 
   

      { title: "ID", field: "id", filterPlaceholder: "filter" },
  
  
      { title: "Name", field: "name", sorting: true, filtering: true, cellStyle: { background:"#009688" }, headerStyle: { color: "#fff" } },
     
      { title: "Latitude", field: "latitude", filterPlaceholder: "filter" },
      { title: "Longitude", field: "longitude", filterPlaceholder: "filter" },
     /* { title: "Serial Number", field: "serialNumber", filterPlaceholder: "filter" },
      { title: "Acquistiontion Status", field: "acquistiontionStatus", filterPlaceholder: "filter" },
     
      { title: "Radar Height", field: "radarHeight", filterPlaceholder: "filter" },
      { title: "Installation Date", field: "installationDate", filterPlaceholder: "filter" },
      { title: "Company Name", field: "companyName", filterPlaceholder: "filter" },
      { title: "Company Phone Number", field: "companyPhoneNumber", filterPlaceholder: "filter" },
      { title: "Company Email", field: "companyEmail", filterPlaceholder: "filter" },
      { title: "Company Street Name", field: "companyAddress", filterPlaceholder: "filter" },
      { title: "Company House Number", field: "companyHouseNumber", filterPlaceholder: "filter" },
      { title: "Company Zipcode", field: "companyZipcode", filterPlaceholder: "filter" },
      { title: "Company City", field: "companyCity", filterPlaceholder: "filter" },
      { title: "Company State (Bundesland)", field: "companyState", filterPlaceholder: "filter", grouping: false }, 
  
      { title: "Rotor Diameter", field: "rotorDiameter", filterPlaceholder: "filter" },
      { title: "Manufacturer", field: "manufacturer", filterPlaceholder: "filter" },
      { title: "Model Name", field: "modelName", filterPlaceholder: "filter" },
      { title: "OEM SA", field: "oemsa", filterPlaceholder: "filter" },
      { title: "Visibility Meter", field: "visibilityMeter", filterPlaceholder: "filter" }, 
      { title: "Scada PC", field: "scadaPc", filterPlaceholder: "filter", grouping: false },
      { title: "Nacelle Light", field: "nacelleLight", filterPlaceholder: "filter", grouping: false }, 
      { title: "VLAN", field: "vlan", filterPlaceholder: "filter", grouping: false }, 
      { title: "Tower Light Wireless Connection", field: "towerLightWirelessConnection", filterPlaceholder: "filter", grouping: false }, 
      { title: "Nacelle Light Wireless Connection", field: "nacelleLightWirelessConnection", filterPlaceholder: "filter", grouping: false }, 
      { title: "QSI PAN ID", field: "qsiPanId", filterPlaceholder: "filter", grouping: false }, 
      { title: "QRT Binary Code", field: "qrtBinaryCode", filterPlaceholder: "filter", grouping: false } */
    ];

  const actions = [{ text: "Show Map", path: "/" }];
  const subActions = [
    { text: "Windturbines", path: "/windturbines" },
    { text: "Lcus", path: "/lcus" },
    { text: "Receivers", path: "/receivers" },
    { text: "Substations", path: "/substations" },
    { text: "Comments", path: "/comments" }
  ];

  const rowActions = [
     { text: "showTable", path: "/data-table" },
  ];
  return (
    <>
      <Header title="Radars" actions={actions} />
      <SubHeader title="" actions={subActions} />
      <DataTable url={url} columns={columns} actions={rowActions} title="Radars" />
    </>
  );
};

export default Radars;
