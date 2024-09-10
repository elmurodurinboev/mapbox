import Map, {GeolocateControl, Layer, Marker, NavigationControl, Source, useMap} from 'react-map-gl';
import {useEffect, useState} from "react";

import mbxDirections from '@mapbox/mapbox-sdk/services/directions';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWxtdXJvZDgxMiIsImEiOiJjbHpzOWJ2YW0yM3ptMmxxdWFrcXVid2R2In0.PVkyuVTk9URyPdmvJQZLVw'; // Replace with your Mapbox token

const directionsClient = mbxDirections({ accessToken: "pk.eyJ1IjoiZWxtdXJvZDgxMiIsImEiOiJjbHpzOWJ2YW0yM3ptMmxxdWFrcXVid2R2In0.PVkyuVTk9URyPdmvJQZLVw" });

function App() {
  const [route, setRoute] = useState(null);  // State to hold the route data
  const [viewport, setViewport] = useState({
    latitude: 41.55811826,  // Center of the map (source location)
    longitude: 60.6203538,
    zoom: 14,
    bearing: 0
  });

  // useEffect(() => {
  //   const fetchCarRoute = async () => {
  //     try {
  //       const response = await directionsClient
  //         .getDirections({
  //           profile: 'driving',  // Use the "driving" profile for car routes
  //           waypoints: [
  //             { coordinates: [60.6203538, 41.55811826] }, // Source
  //             { coordinates: [60.6056448, 41.5510189] },  // Destination
  //           ],
  //           geometries: 'geojson', // We want the geometry in GeoJSON format
  //         })
  //         .send();
  //
  //       const routeData = response.body.routes[0].geometry;
  //       setRoute(routeData); // Set the fetched route data to state
  //     } catch (error) {
  //       console.error('Error fetching route: ', error);
  //     }
  //   };
  //
  //   fetchCarRoute();  // Fetch the route when the component mounts
  // }, []);

  useEffect(() => {
    // Fetch route from OSRM
    const fetchRoute = async () => {
      const response = await fetch('https://router.project-osrm.org/route/v1/driving/60.6203538,41.55811826;60.6056448,41.5510189?geometries=geojson&overview=full');
      const data = await response.json();
      const routeData = data.routes[0].geometry;
      setRoute(routeData);
    };

    fetchRoute();
  }, []);

  const routeLayer = {
    id: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#ff7e5f',
      'line-width': 4,
    },
  };

  return (
    <div>
      <Map
        {...viewport}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{width: '100%', height: '100vh', overflow: 'hidden'}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={(evt) => setViewport({...evt.viewState, bearing: 0})}
      >
        <Marker longitude={60.62035381793976} latitude={41.55811826919}>
          <img src={"./car-marker.png"} alt={"Car"}/>
        </Marker>
        <NavigationControl position="bottom-right" showCompass={false}/>
        <GeolocateControl position="bottom-right"/>
        {route && (  // Render route only if it's fetched
          <Source id="car-route" type="geojson" data={route}>
            <Layer {...routeLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
}

export default App