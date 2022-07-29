import React, { useEffect, useState, useMemo } from "react";
import Header from "components/Header";
import { TableHeader, Pagination, Search } from "components/DataTable";
import useFullPageLoader from "hooks/useFullPageLoader";
import ExternalInfo from "components/ExternalInfo";
import AppConfig from "App.config";
import Axios from "axios";
import { NavLink } from "react-router-dom";

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
