import React from "react";
import { useDispatch } from "react-redux";
import { toggleNavbar } from "actions/layout";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import expandLeft from "resources/images/expandleft.ico";

const SubHeader = ({
  title = "",
  actions = [
    { text: "showMaps", path: "/" },
    { text: "showTable", path: "/data-table" },
    { text: "signOut", path: "/signOut" },
  ],
}) => {
  const dispatch = useDispatch();
  const defaultActions = [
    { text: "convertKML", path: "/" },
    { text: "signOut", path: "/signOut" },
  ];
  const toogleNavbar = () => {
    return dispatch(toggleNavbar());
  };

  return (
    <nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid pr-5">
         <h4>{title}</h4>
          <ul className="navbar-nav ">
            {actions.map((item) => (
              <li className="nav-link">
                <NavLink to={item.path} activeClassName="active">
                  {item.text}
                </NavLink>
              </li>
            ))}
           
          </ul>
        </div>
      </nav>
    </nav>
  );
};

export default SubHeader;
