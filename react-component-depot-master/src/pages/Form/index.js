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
  const [item, setItem] = useState({});
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [error, setError] = useState("");

  const [element, setLoading] = useButtonLoader("Save", "Saving");
  const nameInputRef = useRef();
  const unusedGlassFiberInputRef = useRef();
  const noOfFlassFiberInputRef = useRef();
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
  }, []);

  const onSave = () => {};
  const onCancel = () => {};

  const submitHandler= (event) =>  {
    event.preventDefault(); 

    const newData = {
      acquisitionStatus: { id: 1, name: "Verloren" },
      company: { id: 1, name: "Oseter" },
      errorStatus: { id: 1, name: "Offline" },
      id: item.id,
      installationStatus: { id: 3, name: "commisioned" },
      latitude: latitudeInputRef.current.value,
      longitude: longitudeInputRef.current.value,
      name: nameInputRef.current.value,
    };

    showLoader();
    console.log(AppConfig.backendApi);
    Axios.update(AppConfig.backendApi + props.url, newData)
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
  }
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
                      ref={nameInputRef}
                      className="form-control"
                      type="text"
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Unused Glass Fiber
                      </span>
                    </div>
                    <input
                      ref={unusedGlassFiberInputRef}
                      className="form-control"
                      type="text"
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Number of Glass Fiber
                      </span>
                    </div>
                    <input
                      ref={unusedGlassFiberInputRef}
                      className="form-control"
                      type="text"
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Glass Fiber
                      </span>
                    </div>
                    <input
                      ref={glassFiberInputRef}
                      className="form-control"
                      type="text"
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Both Light Connection
                      </span>
                    </div>
                    <input
                      ref={bothLightConnectionInputRef}
                      className="form-control"
                      type="text"
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
                      ref={companyNameInputRef}
                      className="form-control"
                      type="text"
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Company Address
                      </span>
                    </div>
                    <input
                      ref={companyAddressInputRef}
                      className="form-control"
                      type="text"
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Company Zip Code
                      </span>
                    </div>
                    <input
                      ref={companyZipCodeInputRef}
                      className="form-control"
                      type="text"
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Company City
                      </span>
                    </div>
                    <input
                  //    value={item.company.name}
                      ref={companyCityInputRef}
                      className="form-control"
                      type="text"
                    />
                  </div>

                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="form-control input-group-text">
                        Acquisition Status
                      </span>
                    </div>
                    <input
                   //   value={item.acquisitionStatus.id}
                      ref={acquisitionStatusInputRef}
                      className="form-control"
                      type="text"
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
