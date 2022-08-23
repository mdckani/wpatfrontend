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
  const treeData = [
    {
      key: "0",
      label: "Documents",
      icon: "fa fa-folder",
      title: "Documents Folder",
      children: [
        {
          key: "0-0",
          label: "Document 1-1",
          icon: "fa fa-folder",
          title: "Documents Folder",
          children: [
            {
              key: "0-1-1",
              label: "Document-0-1.doc",
              icon: "fa fa-file",
              title: "Documents Folder",
            },
            {
              key: "0-1-2",
              label: "Document-0-2.doc",
              icon: "fa fa-file",
              title: "Documents Folder",
            },
            {
              key: "0-1-3",
              label: "Document-0-3.doc",
              icon: "fa fa-file",
              title: "Documents Folder",
            },
            {
              key: "0-1-4",
              label: "Document-0-4.doc",
              icon: "fa fa-file",
              title: "Documents Folder",
            },
          ],
        },
      ],
    },
    {
      key: "1",
      label: "Desktop",
      icon: "fa fa-desktop",
      title: "Desktop Folder",
      children: [
        {
          key: "1-0",
          label: "document1.doc",
          icon: "fa fa-file",
          title: "Documents Folder",
        },
        {
          key: "0-0",
          label: "documennt-2.doc",
          icon: "fa fa-file",
          title: "Documents Folder",
        },
      ],
    },
    {
      key: "2",
      label: "Downloads",
      icon: "fa fa-download",
      title: "Downloads Folder",
      children: [],
    },
  ];
  return (
    <nav id="sidebar" className={!isNavbarVisible ? "active" : ""}>
      <Scrollbars style={{ width: "100%", height: "100%" }}>
        
        <div className="sidebar-header">
          <h3>
            <Link to="/">WPAT</Link>
          </h3>
        </div>

        <Tree data={treeData} />

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
