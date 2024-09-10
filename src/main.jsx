import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {MapProvider} from "react-map-gl";
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MapProvider>
            <App/>
        </MapProvider>
    </StrictMode>,
)
