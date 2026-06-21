import {
    APIProvider,
    Map
} from "@vis.gl/react-google-maps";

import CarrierMarker from "./CarrierMarker";

import {
    GOOGLE_MAPS_API_KEY,
    DEFAULT_CENTER,
    DEFAULT_ZOOM,
    MAP_OPTIONS,
    MAP_ID
} from "../../config/maps";

import "../../styles/GoogleMap.css";

export default function GoogleMap({

    center = DEFAULT_CENTER,
    zoom = DEFAULT_ZOOM,
    markers = [],
    height = "500px",
    onMapClick = null,
    children

}) {

    return (

        <div
            className="google-map-container"
            style={{ height }}
        >

            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>

                <Map
                    mapId={MAP_ID}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    gestureHandling={MAP_OPTIONS.gestureHandling}
                    disableDefaultUI={MAP_OPTIONS.disableDefaultUI}
                    clickableIcons={MAP_OPTIONS.clickableIcons}
                    streetViewControl={MAP_OPTIONS.streetViewControl}
                    fullscreenControl={MAP_OPTIONS.fullscreenControl}
                    mapTypeControl={MAP_OPTIONS.mapTypeControl}
                    onClick={onMapClick}
                >

                    {

                        markers.map(marker => (

                            <CarrierMarker

                                key={marker.id}

                                carrier={marker}

                            />

                        ))

                    }

                    {children}

                </Map>

            </APIProvider>

        </div>

    );

}