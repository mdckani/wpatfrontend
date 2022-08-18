import React, { useState } from "react";
import Header from "components/Header";
import L from "leaflet";
import { Map, TileLayer, FeatureGroup } from "react-leaflet";

import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});
const PolygonMap = () => {
  const [center, setCenter] = useState({ lat: 53.621992, lng: 10.129395 });
  const [mapLayers, setMapLayers] = useState([]);

  const ZOOM_LEVEL = 8;
  const mapRef = useRef();

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
          </Map>
          {/* <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre> -->
          */}
        </div>
      </div>
    </>
  );
};

export default PolygonMap;
