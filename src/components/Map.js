import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

const Map = () => {
  const MapEl = useRef(null);

  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/widgets/Directions",
      "esri/config",
    ]).then(([Map, MapView, Directions, esriConfig]) => {
      // An authorization string used to access the basemap, geocoding and routing services
      esriConfig.apiKey = `${process.env.REACT_APP_ARC_KEY}`;

      const map = new Map({
        basemap: "arcgis-topographic",
      });

      const view = new MapView({
        zoom: 14,
        center: [-118.24, 34.05],
        container: "viewDiv",
        map: map,
      });

      let directionsWidget = new Directions({
        view: view,
      });

      // Add the Directions widget to the top right corner of the view
      view.ui.add(directionsWidget, {
        position: "top-right",
      });
    });
  }, []);

  return (
    <div
      id="viewDiv"
      style={{ height: "100vh", width: "100vw" }}
      ref={MapEl}
    ></div>
  );
};

export default Map;
