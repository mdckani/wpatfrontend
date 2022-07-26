import React from "react";
import { useDispatch } from "react-redux";
import { toggleNavbar } from "actions/layout";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

const Header = ({
  title = "",
  actions = ["showMaps", "showTable", "signOut"],
}) => {
  const dispatch = useDispatch();
  const defaultActions = ["convertKML", "account"];
  const toogleNavbar = () => {
    return dispatch(toggleNavbar());
  };

  return (
    <nav>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid pr-5">
            <button
              type="button"
              id="sidebarCollapse"
              className="navbar-brand  btn btn-info"
              onClick={toogleNavbar}
            >
              <i className="fas fa-align-justify"></i>
            </button>
            <h3>{title}</h3>
            <ul className="navbar-nav ">
              {actions.map((name) => (
                <li  className="nav-link">
                  <NavLink to="/" activeClassName="active">
                    {name}
                  </NavLink>
                </li>
              ))}
              {defaultActions.map((name) => (
                <li  className="nav-link">
                  <NavLink to="/" activeClassName="active">
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul> 
          </div>
        </nav>
     </nav>
  );
};

export default Header;
