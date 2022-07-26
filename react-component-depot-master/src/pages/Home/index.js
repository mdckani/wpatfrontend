import React from "react";
import YoutubeLogo from "resources/images/yt-logo.png";
import AppConfig from "App.config";
import "../../pages/Leaflet/index.css";
const PolygonMap = React.lazy(() => import("../../pages/Leaflet/polygon"));
const Home = () => {
  return <PolygonMap />;
};

export default Home;
