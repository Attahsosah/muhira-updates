"use client";

import React, { useContext, useEffect, useState } from "react";
import ReactMapGl, { Layer, Marker, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: -3.3830556,
        longitude: 29.36577777777778,
        zoom: 15,
      });
  return (
    <ReactMapGl
      className="z-0 absolute"
      {...viewport}
      initialViewState={viewport}
      mapStyle={process.env.NEXT_PUBLIC_MAP_STYLE}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      
    >

    </ReactMapGl>
    )
}

export default Map