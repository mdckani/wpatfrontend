import React, { useEffect, useState, useMemo } from "react";
import Header from "components/Header";
import { TableHeader, Pagination, Search } from "components/DataTable";
import useFullPageLoader from "hooks/useFullPageLoader";
import ExternalInfo from "components/ExternalInfo";
import AppConfig from "App.config";
import axios from "axios";
import { NavLink } from "react-router-dom";

const DataTable = () => {
  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 50;

  const headers = [
    { name: "No#", field: "id", sortable: true },
    { name: "Name", field: "name", sortable: true },
    { name: "Latitude", field: "latitude", sortable: true },
    { name: "Longitude", field: "longitude", sortable: true },
    { name: "Company", field: "company.name", sortable: true },
    { name: "", field: "", sortable: true },
  ];

  useEffect(() => {
    const getData = () => {
      showLoader();
      const url = "http://localhost:8090/windturbines";
      const onSuccess = function (e) {
        console.log(e);
      };
      axios
        .get(url)
        .then((resp) => {
          let result = resp.data;
          setComments(result);
          hideLoader();
        })
        .catch((error) => {
          if (onSuccess) {
            setComments([]);
            hideLoader();
          }
        });
    };

    getData();
  }, []);

  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search, sorting]);

  return (
    <>
      <Header title="Building a data table in react" />

      <ExternalInfo page="datatable" />

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
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {commentsData.map((item) => (
                <tr>
                  <th scope="row" key={item.id}>
                    {item.id}
                  </th>
                  <td>{item.name}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                  <td>{item.company ? item.company.name : ""}</td>
                  <td>
                  <NavLink to={'/windfarms/' +  item.id}  element={<item />}  >Edit</NavLink> <> </>{"    "}<></>
                  <NavLink to={'/windfarms/' +  item.id}  element={<item />}  >Delete</NavLink> <> </>{"    "}<></>
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
