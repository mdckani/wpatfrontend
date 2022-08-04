import React, { useState, useEffect, useRef } from "react";
import Header from "components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePasswordToggle from "hooks/usePasswordToggle";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import AppConfig from "App.config";
import useButtonLoader from "hooks/useButtonLoader";
import Axios from "axios";
import ExternalInfo from "components/ExternalInfo";
import useFullPageLoader from "hooks/useFullPageLoader";
import "./Form.css";
import classes from "./Form.css";

const Form = (props) => {
  const [item, setItem] = useState(props.item);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [error, setError] = useState("");

  const [element, setLoading] = useButtonLoader("Save", "Saving");
  const nameInputRef = useRef();
  const unusedGlassFiberInputRef = useRef();
  const noOfGlassFiberInputRef = useRef();
  const glassFiberInputRef = useRef();
  const bothLightConnectionInputRef = useRef();
  const companyNameInputRef = useRef();
  //  const companyPhoneNumberInputRef = useRef();
  // const compamyEmailInputRef = useRef();
  const companyAddressInputRef = useRef();
  const companyZipCodeInputRef = useRef();
  const companyCityInputRef = useRef();
  const acquisitionStatusInputRef = useRef();
  const latitudeInputRef = useRef();
  const longitudeInputRef = useRef();
  /*
  useEffect(() => {
    const getData = () => {
      showLoader();

      console.log(AppConfig.backendApi);
      Axios.get(AppConfig.backendApi + props.url)
        .then((resp) => {
          let result = resp.data;
          setItem(result);
        })
        .catch(({ response }) => {
          console.log(response);
          setItem([]);
        })
        .finally(() => {
          hideLoader();
        });
    };
    getData();
  }, []);*/

  const onSave = () => {};
  const onCancel = () => {};
  const handleChange = (e) => {
    setItem((prevState) => {
      prevState["name"] = e.target.value;
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const newData = {
      id: item.id,
      acquisitionStatus: (item.acquisitionStatus)?item.acquisitionStatus.id:null,
      company:  (item.company)?item.company.id:null,
      errorStatus: (item.errorStatus)?item.errorStatus.id:null,
      installationStatus: (item.installationStatus)?item.installationStatus.id:null,
      latitude: item.latitude,
      longitude: item.longitude,
      name: item.name,
      bothLightConnection: item.longitude,
      glassFiber: item.glassFiber,
      numberOfGlassFiber: item.numberOfGlassFiber,
      unusedGlassFiber: item.unusedGlassFiber,
      geoCoOrdinate: item.geoCoOrdinate,
    };

    showLoader();
    console.log(AppConfig.backendApi);

/*
    Axios.post(AppConfig.backendApi + "windfarms", newData)
      .then((resp) => {
        let result = resp.data;
        setItem(result);
      })
      .catch(({ response }) => {
        console.log(response);
        setItem([]);
      })
      .finally(() => {
        hideLoader();
      });*/
     Axios.post( AppConfig.backendApi + "windfarms",{
         
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
   newData,
    })
      .then((resp) => {
        let result = resp.data;
        setItem(result);
      })
      .catch(({ response }) => {
        console.log(response);
        setItem([]);
      })
      .finally(() => {
        hideLoader();
      }); 
  };

  const onChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <table class="container">
        <tr>
          <td class="right">
            <div className="card bg-light">
              <article className="card-body mx-auto">
                <h4 className="card-title mt-3 text-center">Create Account</h4>
                <p className="text-center">Windfarm with Id : {item.name}</p>

                <form>
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Name
                      </span>
                    </div>
                    <input
                      value={item.name}
                      name="name"
                      ref={nameInputRef}
                      className="form-control"
                      type="text"
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Unused Glass Fiber
                      </span>
                    </div>
                    <input
                      value={item.unusedGlassFiber}
                      ref={unusedGlassFiberInputRef}
                      className="form-control"
                      type="text"
                      name="unusedGlassFiber"
                      onChange={onChange}
                      /*    onChange={(e) =>
                        onTodoChange("unusedGlassFiber", e.target.value)
                      }*/
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Number of Glass Fiber
                      </span>
                    </div>
                    <input
                      name="noOfGlassFiber"
                      ref={noOfGlassFiberInputRef}
                      className="form-control"
                      type="text"
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Glass Fiber
                      </span>
                    </div>
                    <input
                      name="glassFiber"
                      ref={glassFiberInputRef}
                      className="form-control"
                      type="text"
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Both Light Connection
                      </span>
                    </div>
                    <input
                      name="bothLightConnection"
                      ref={bothLightConnectionInputRef}
                      className="form-control"
                      type="text"
                      onChange={onChange}
                    />
                  </div>
                </form>
              </article>
            </div>
          </td>
          <td class="left">
            <div className="card bg-light">
              <article className="card-body mx-auto">
                <h4 className="card-title mt-3 text-center">Create Account</h4>
                <p className="text-center">Windfarm with Id : {item.name}</p>

                <form>
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Company Name
                      </span>
                    </div>
                    <input
                      name="companyName"
                      ref={companyNameInputRef}
                      className="form-control"
                      type="text"
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Company Address
                      </span>
                    </div>
                    <input
                      name="companyZipCode"
                      ref={companyAddressInputRef}
                      className="form-control"
                      type="text"
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Company Zip Code
                      </span>
                    </div>
                    <input
                      name="companyZipCode"
                      ref={companyZipCodeInputRef}
                      className="form-control"
                      type="text"
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Company City
                      </span>
                    </div>
                    <input
                      name="companyCity"
                      //    value={item.company.name}
                      ref={companyCityInputRef}
                      className="form-control"
                      type="text"
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Acquisition Status
                      </span>
                    </div>
                    <input
                      name="acquisitionStatus"
                      //   value={item.acquisitionStatus.id}
                      ref={acquisitionStatusInputRef}
                      className="form-control"
                      type="text"
                      onChange={onChange}
                    />
                  </div>
                </form>
              </article>
            </div>
          </td>
        </tr>
      </table>

      <div className="card bg-light">
        <article className="card-body mx-auto">
          <button
            type="button"
            className="btn btn-outline-info mr-2"
            onClick={submitHandler}
            ref={element}
          >
            <i className="fas fa-save mr-2"></i>
            Save
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={onCancel}
          >
            <i className="fas fa-trash mr-2"></i>
            Cancel
          </button>
        </article>
      </div>
    </>
  );
};

export default Form;
