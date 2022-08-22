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

const DataTable = (props) => {
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
      console.log("AppConfig.backendApi");

      console.log(AppConfig.backendApi);

      Axios.get(AppConfig.backendApi + props.url)
        .then((resp) => {
          let result = resp.data;
          setItems(result);

          console.log(MaterialTable);
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

      <MaterialTable columns={props.columns} data={items}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setItems([...items, newRow])

            setTimeout(() => resolve(), 500)
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            const updatedData = [...items]
            updatedData[items.findIndex(x => x.id === oldRow.id)] = newRow
            setItems(updatedData)
            setTimeout(() => resolve(), 500)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...items]
            updatedData.splice(items.findIndex(x => x.id === selectedRow.id), 1)
            setItems(updatedData)
            setTimeout(() => resolve(), 1000)

          }),
          onRowDetail: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...items]
            updatedData.splice(items.findIndex(x => x.id === selectedRow.id), 1)
            setItems(updatedData)
            setTimeout(() => resolve(), 1000)

          })
        }}
        actions={[
          {
            icon: () => <GetAppIcon />,
            tooltip: "Click me",
            onClick: (e, data) => console.log(data),
            // isFreeAction:true
          }
        ]}
        onSelectionChange={(selectedRows) => {
          console.log(selectedRows);
          let data = sessionStorage.getItem(props.type);
          sessionStorage.setItem(props.type, JSON.stringify(selectedRows));
          selectedData = selectedRows.map((i) => { return i.id })
        }}
        options={{
          sorting: true, search: true,
          searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
          filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
          paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
          exportAllData: true, exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1, selection: true,
          showSelectAllCheckbox: true, showTextRowsSelected: false, selectionProps: rowData => ({
            disabled: rowData.id == null,
            // color:"primary"
          }),
          grouping: true, columnsButton: true,
          rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#f44336", color: "#fff" },
          selection: true,
          selectionProps: rowData => ({
            checked: !!selectedData.includes(rowData.id)
          })
        }}
        title={props.title}
        icons={{ Add: () => <AddIcon /> }} />
      {loader}
    </>
  );
};

export default DataTable;
