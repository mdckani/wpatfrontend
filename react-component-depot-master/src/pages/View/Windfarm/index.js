import React, { useEffect, useState, useMemo } from "react";
import Header from "components/Header";
import { TableHeader, Pagination, Search } from "components/DataTable";
import useFullPageLoader from "hooks/useFullPageLoader";
import ExternalInfo from "components/ExternalInfo";
import AppConfig from "App.config";
import axios from "axios";
import { NavLink } from "react-router-dom";
import DataTable from "pages/DataTable";
import { Route, Link, Routes, useParams } from "react-router-dom";
import Form from "pages/Form";

const Windfarm = () => {
  const headers = [
    { name: "No#", field: "id", sortable: true },
    { name: "Name", field: "name", sortable: true },
    { name: "Latitude", field: "latitude", sortable: true },
    { name: "Longitude", field: "longitude", sortable: true },
    { name: "Company", field: "company.name", sortable: true },
    { name: "", field: "", sortable: true },
  ];
  const params = useParams();
  const url = "windfarms/" + params.id;
  return (
    <>
      <Header title="Windfarm" />
      <Form url={url}></Form>
    </>
  );
};

export default Windfarm;
