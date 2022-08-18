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
  const columns = [
   

    { title: "ID", field: "id", filterPlaceholder: "filter" },


    { title: "Name", field: "name", sorting: true, filtering: true, cellStyle: { background:"#009688" }, headerStyle: { color: "#fff" } },
   
    { title: "Latitude", field: "latitude", filterPlaceholder: "filter" },
    { title: "Longitude", field: "longitude", filterPlaceholder: "filter" },
   /* { title: "Serial Number", field: "serialNumber", filterPlaceholder: "filter" },
    { title: "Acquistiontion Status", field: "acquistiontionStatus", filterPlaceholder: "filter" },
   
    { title: "Windturbine Height", field: "windturbineHeight", filterPlaceholder: "filter" },
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
  useEffect(() => {
    const getData = () => {
      showLoader();     
      console.log("AppConfig.backendApi" );

      console.log(AppConfig.backendApi );

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

  const itemsData = useMemo(() => {
    let computedItems = items;

    if (search) {
      computedItems = computedItems.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedItems.length);

    //Sorting items
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedItems = computedItems.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedItems.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [items, currentPage, search, sorting]);

  return (
    <>


<MaterialTable columns={columns} data={items}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setItems([...items, newRow])

            setTimeout(() => resolve(), 500)
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            const updatedData = [...items]
            updatedData[oldRow.items.id] = newRow
            setItems(updatedData)
            setTimeout(() => resolve(), 500)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...items]
            updatedData.splice(selectedRow.items.id, 1)
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
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true, search: true,
          searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
          filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
          paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
          exportAllData: true, exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1, selection: true,
          showSelectAllCheckbox: false, showTextRowsSelected: false, selectionProps: rowData => ({
            disabled: rowData.age == null,
            // color:"primary"
          }),
          grouping: true, columnsButton: true,
          rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#f44336",color:"#fff"}
        }}
        title="Student Information"
        icons={{ Add: () => <AddIcon /> }} />

      <div className="row w-100">
        <div className="col mb-3 col-12 text-center">
          <div className="row">
            <div className="col-md-6">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="col-md-6 d-flex flex-row-reverse">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <table className="table table-striped">
            <TableHeader
              headers={props.headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {itemsData.map((item) => (
                <tr>
                  <th scope="row" key={item.id}>
                    {item.id}
                  </th>
                  <td>{item.name}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                  <td>{item.company ? item.company.name : ""}</td>
                  <td>
                    <NavLink to={"/windfarms/" + item.id} element={<item />}>
                      Edit
                    </NavLink>{" "}
                    <> </>
                    {"    "}
                    <></>
                    <NavLink to={"/windfarms/" + item.id} element={<item />}>
                      Delete
                    </NavLink>{" "}
                    <> </>
                    {"    "}
                    <></>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {loader}
    </>
  );
};

export default DataTable;
