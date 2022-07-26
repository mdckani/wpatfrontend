import React from "react";
import { useDispatch } from "react-redux";
import { toggleNavbar } from "actions/layout";

const Header = ({ title = "Page Title" , actions=["showMaps","showTable", "signOut"]}) => {
    const dispatch = useDispatch();

    const toogleNavbar = () => {
        return dispatch(toggleNavbar());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid pr-5">
                <button
                    type="button"
                    id="sidebarCollapse"
                    className="btn btn-info"
                    onClick={toogleNavbar}
                >
                    <i className="fas fa-align-justify"></i>
                </button>
                <h3>{title}</h3>
                {actions.map(({ name }) => (
                     <button
                     text={name}
                     type="button"
                     id="sidebarCollapse"
                     className="btn btn-info"
                   //  onClick={name}
                 >
                     <i className="fas fa-align-justify"></i>
                 </button>
                ))}
            </div>
        </nav>
    );
};

export default Header;
