import React, { useEffect, useState, useMemo, useRef } from "react";

import { Map, TileLayer, FeatureGroup, Marker, Popup } from "react-leaflet";

import useFullPageLoader from "hooks/useFullPageLoader";
import Header from "components/Header";
import L from "leaflet";

import cities from "./cities.json";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
delete L.Icon.Default.prototype._getIconUrl;
const markerIcon = new L.Icon({
  iconUrl: require("resources/images/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});



const PolygonMap = () => {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const [mapLayers, setMapLayers] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const ZOOM_LEVEL = 8;
  const mapRef = useRef();
  const [windfarm, setWindfarm] = useState({});
  const [windturbine, setWindturbine] = useState({});
  const [lcu, setLcu] = useState({});
  const [receiver, setReceiver] = useState({});
  const [substation, setSubstation] = useState({});
  const [radar, setRadar] = useState({});
  const [comment, setComment] = useState({});
  const getItemData = (type) => {
    let itemData = sessionStorage.getItem(type);
    if (itemData && itemData.length > 0) {
      itemData = (itemData.length > 0) ? JSON.parse(itemData) : [];
    }
    return itemData;
  };
  useEffect(() => {
    const getData = () => {
      showLoader();
      setWindfarm("windfarm");
      setWindfarm("windturbine");
      setWindfarm("lcu");
      setWindfarm("receiver");
      setWindfarm("substation");
      setWindfarm("radar");
      setWindfarm("comment");
      hideLoader();
    };
    getData();
  }, []);


  const _onCreate = (e) => {
    console.log(e);

    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  const actions = [//{ text: "showMaps", path: "/" },
    { text: "Show Table", path: "/windturbines" }];
  return (
    <>
      <Header title="" actions={actions} />

      <div className="row">
        <div className="col">
          <Map center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
            <FeatureGroup>
              <EditControl
                position="topright"
                onCreated={_onCreate}
                onEdited={_onEdited}
                onDeleted={_onDeleted}
                draw={{
                  rectangle: true,
                  circle: true,
                  circlemarker: true,
                  marker: true,
                  polyline: true,
                }}
              />
            </FeatureGroup>

            <TileLayer
              url={osm.maptiler.url}
              attribution={osm.maptiler.attribution}
            />
       
            {Object.keys(windturbine).map((item) => (
              <Marker
                position={[windturbine[item].latitude, windturbine[item].longitude]}
                icon={markerIcon}
                key={windturbine[item].id}
              >
                <Popup>
                  <b>
                    {windturbine[item].label}
                    Latitude :  {windturbine[item].latitude}
                    Latitude :  {windturbine[item].longitude}
                  </b>
                </Popup>
              </Marker>
            ))}


          </Map>
          {/* <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre> -->
          */}
        </div>
      </div>
    </>
  );
};

export default PolygonMap;
