import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import { useSelector } from "react-redux";
import YoutubePlayer from "components/YoutubePlayer";
import useThemeSwitcher from "hooks/useThemeSwitcher";

import ReactGA from "react-ga";
import { withRouter } from "react-router-dom";
import AppConfig from "App.config";
 
ReactGA.initialize(AppConfig.GOOGLE.GA_TRACKING_CODE);

const Home = ({ children }) => {
    const ThemeSwitcher = useThemeSwitcher();

    const isNavbarVisible = useSelector((state) => state.layout.navbar);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    });

    return (
        <>  
            <div className="wrapper"> 
                <Navbar /> 
                <div id="content" className={!isNavbarVisible ? "active" : ""}> 
                    {children}
                </div>
                <YoutubePlayer />
            </div>
 
         
          {ThemeSwitcher}
       
        </>
    );
};

export default withRouter(Home);
