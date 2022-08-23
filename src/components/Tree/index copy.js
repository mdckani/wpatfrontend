 import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 



import React, { useEffect, useState, useMemo } from "react";
import Header from "components/Header";
import { TableHeader, Pagination, Search } from "components/DataTable";
import useFullPageLoader from "hooks/useFullPageLoader";
import ExternalInfo from "components/ExternalInfo";
import AppConfig from "App.config";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import MaterialTable from 'material-table';
import GetAppIcon from '@material-ui/icons/GetApp';
import AddIcon from '@material-ui/icons/Add';

const Tree = (props) => {

  const nodes = [
    {
      value: "mars2",
      label: "Mars",
      children: [
        {
          value: "mars2",
          label: "Ph24obos",
          children: [
            { value: "ma2rs", label: "Phobos" },
            { value: "ma2rs", label: "Deimos" }
          ]
        },
        {
          value: "deim23os",
          label: "Deim5os",
          children: [
            { value: "phobos", label: "Phobos" },
            { value: "deimos", label: "Deimos" }
          ]
        }
      ]
    }
  ];
  const [items, setItems] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 50;

  useEffect(() => {
    const getData = () => {
      showLoader();
 

     console.log(AppConfig.backendApi);

       Axios.get(AppConfig.backendApi + props.url)
        .then((resp) => {
          let result = resp.data;
          setItems(result);
        })
        .catch(({ response }) => {
          console.log(response);
          setItems([]);
        })
        .finally(() => {
          hideLoader();
        }); 
    };
    getData();
  }, []);

  let selectedData = sessionStorage.getItem(props.type);
  if (selectedData && selectedData.length > 0) {
    selectedData = JSON.parse(selectedData);
  } else {
    selectedData = [];
  }

  selectedData = selectedData.map((i) => { return i.id })
  return (
    <>
 <CheckboxTree  iconsClass="fa5"
        nodes={nodes}
     
      />
      {loader}
    </>
  );
}; 

export default Tree;
 