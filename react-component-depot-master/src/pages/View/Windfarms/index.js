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

const Windfarms = () => {
  const url = "http://localhost:8090/windturbines";
  const headers = [
    { name: "No#", field: "id", sortable: true },
    { name: "Name", field: "name", sortable: true },
    { name: "Latitude", field: "latitude", sortable: true },
    { name: "Longitude", field: "longitude", sortable: true },
    { name: "Company", field: "company.name", sortable: true },
    { name: "", field: "", sortable: true },
  ];

  const actions = [{ text: "Show Map", path: "/" }];

  const subActions = [
    //{ text: "showMaps", path: "/" },
    { text: "Windturbines", path: "/windturbines" },
    { text: "Lcus", path: "/lcus" },
    { text: "Receivers", path: "/receivers" },
    { text: "Substations", path: "/substations" },
    { text: "Radars", path: "/radars" },
    { text: "Comments", path: "/comments" },
  ];

  const rowActions = [
    //{ text: "showMaps", path: "/" },
    { text: "showTable", path: "/data-table" },
  ];
  return (
    <>
      <Header title="Windfarms" actions={actions} />
      <SubHeader title="" actions={subActions} />
      <DataTable url={url} headers={headers} actions={rowActions} />
    </>
  );
};

export default Windfarms;
