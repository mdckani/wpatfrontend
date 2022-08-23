import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import routes from "routes";
import { Scrollbars } from "react-custom-scrollbars";
import useThemeSwitcher from "hooks/useThemeSwitcher";
import ReactGA from "react-ga";
import Tree from "components/Tree";

export const Navbar = () => {
  const ThemeSwitcher = useThemeSwitcher();

  const isNavbarVisible = useSelector((state) => state.layout.navbar);

  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };
  const nodes = [
    {
      value: "mars2",
      label: "Mars",
      children: [
        {
          value: "masrs2",
          label: "Ph24obos",
          children: [
            { value: "ma2rseds", label: "Phobos" },
            { value: "ma2rhs", label: "Deimos" }
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


  return (
    <nav id="sidebar" className={!isNavbarVisible ? "active" : ""}>
      <Scrollbars style={{ width: "100%", height: "100%" }}>        
        <div className="sidebar-header">
          <h3>
            <Link to="/">WPAT</Link>
          </h3>
        </div>
        <Tree url={"tree/manager"} nodes={nodes} /> 
        <ul className="list-unstyled components">
          {routes
            .filter((route) => route.navbar !== "")
            .map((route, index) => {
              //If has child, render sub list
              return route.child ? (
                <li key={index}>
                  <a
                    href={`#pageSubmenu${index}`}
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    {route.navbar}
                  </a>
                  <ul
                    className="collapse list-unstyled"
                    id={`pageSubmenu${index}`}
                  >
                    {route.child.map((child, idx) => {
                      return (
                        <li key={idx} className={getNavLinkClass(child.path)}>
                          <NavLink to={child.path} activeClassName="active">
                            {child.name}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ) : (
                <li key={index} className={getNavLinkClass(route.path)}>
                  <Link to={route.path}>{route.navbar}</Link>
                </li>
              );
            })}
        </ul>
      </Scrollbars>
    </nav>
  );
};
