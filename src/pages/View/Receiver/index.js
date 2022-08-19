import React, { useEffect, useState } from "react";
import Header from "components/Header";
import useFullPageLoader from "hooks/useFullPageLoader";
import AppConfig from "App.config";
import { useParams } from "react-router-dom";
import Form from "pages/Form";
import useButtonLoader from "hooks/useButtonLoader";
import Axios from "axios";
const Receiver = () => {
  const headers = [
    { name: "No#", field: "id", sortable: true },
    { name: "Name", field: "name", sortable: true },
    { name: "Latitude", field: "latitude", sortable: true },
    { name: "Longitude", field: "longitude", sortable: true },
    { name: "Company", field: "company.name", sortable: true },
    { name: "", field: "", sortable: true },
  ];
  const params = useParams();
  const url = "receivers/" + params.id;

  const [item, setItem] = useState( );
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = () => {
      showLoader();
      console.log(AppConfig.backendApi);
      Axios.get(AppConfig.backendApi + url)
        .then((resp) => {
          let result = resp.data;
          setItem(result);
        })
        .catch(({ response }) => {
          console.log(response);
          setItem(null);
        })
        .finally(() => {
          hideLoader();
        });
    };
    getData();
  }, []);
  return (
    <>
      <Header title="Receiver" />
      {item &&  <Form item={item} props=""></Form>}
    </>
  );
};

export default Receiver;
