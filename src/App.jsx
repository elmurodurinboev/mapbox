import Map, {FullscreenControl, GeolocateControl, Marker, NavigationControl, useControl} from 'react-map-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import "./App.css"

function DrawControl(props) {
    useControl(() => new MapboxDraw(props), {
        position: props.position
    });

    return null;
}

function App() {
    return (
        <Map
            mapboxAccessToken="pk.eyJ1IjoiZWxtdXJvZDgxMiIsImEiOiJjbHpzOWJ2YW0yM3ptMmxxdWFrcXVid2R2In0.PVkyuVTk9URyPdmvJQZLVw"
            initialViewState={{
                longitude: 60.62035381793976,
                latitude: 41.55811826919,
                zoom: 18
            }}
            style={{width: '100%', height: '100vh', overflow: 'hidden'}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker longitude={60.62035381793976} latitude={41.55811826919}>
                <img src={"./car-marker.png"} alt={"Car"} className={"car-marker"}/>
            </Marker>

            <GeolocateControl position="top-right" />
            <NavigationControl position="top-right" />
        </Map>
    );
}

export default App