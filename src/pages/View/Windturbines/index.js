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
   { title: "Acquisition Status", nested:true,field: "acquisitionStatus.name", filterPlaceholder: "filter" },
    { title: "Windturbine Height", field: "windturbineHeight", filterPlaceholder: "filter" },
    { title: "Installation Date",    field: "installationDate", filterPlaceholder: "filter" }, 

     { title: "Company Name",  nested:true, field:"companyName", filterPlaceholder: "filter"},
    { title: "Company Phone Number", nested:true, field:"companyPhoneNumber", filterPlaceholder: "filter",hiddenByColumnsButton: true,},  
    { title: "Company Email",  nested:true, field: "companyEmailId", filterPlaceholder: "filter",hiddenByColumnsButton: true,},

    { title: "Company Street Name", nested:true, field: "companyStreetName", filterPlaceholder: "filter" ,hiddenByColumnsButton: true,},
    { title: "Company House Number",  nested:true, field: "companyHouseNumber", filterPlaceholder: "filter",hiddenByColumnsButton: true, },
    { title: "Company Zipcode",  nested:true, field: "companyPostalCode", filterPlaceholder: "filter",hiddenByColumnsButton: true,},
    { title: "Company City", nested:true, field: "companyCity", filterPlaceholder: "filter" ,hiddenByColumnsButton: true, },
    { title: "Company State (Bundesland)", nested:true, field: "companyState", filterPlaceholder: "filter",hiddenByColumnsButton: true },
    { title: "Rotor Diameter", field: "rotorDiameter", filterPlaceholder: "filter",hiddenByColumnsButton: true },
    { title: "Manufacturer",nested:true,field: "manufacturerName", filterPlaceholder: "filter"},
    { title: "Model Name",nested:true, field: "modelName", filterPlaceholder: "filter" ,hiddenByColumnsButton: true},
    { title: "OEM SA", field: "oemsa", filterPlaceholder: "filter",hiddenByColumnsButton: true },
    { title: "Visibility Meter", field: "visibilityMeter", filterPlaceholder: "filter" ,hiddenByColumnsButton: true},
    { title: "Scada PC", field: "scadaPc", filterPlaceholder: "filter", grouping: false ,hiddenByColumnsButton: true},
    { title: "Nacelle Light", field: "nacelleLight", filterPlaceholder: "filter", grouping: false ,hiddenByColumnsButton: true},
    { title: "VLAN", field: "vlan", filterPlaceholder: "filter", grouping: false,hiddenByColumnsButton: true },
    { title: "Tower Light Wireless Connection", field: "towerLightWirelessConnection", filterPlaceholder: "filter", grouping: false,hiddenByColumnsButton: true, },
    { title: "Nacelle Light Wireless Connection", field: "nacelleLightWirelessConnection", filterPlaceholder: "filter", grouping: false ,hiddenByColumnsButton: true,},
    { title: "QSI PAN ID", field: "qsiPanId", filterPlaceholder: "filter", grouping: false ,hiddenByColumnsButton: true,},
    { title: "QRT Binary Code", field: "qrtBinaryCode", filterPlaceholder: "filter", grouping: false,hiddenByColumnsButton: true, } 
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
