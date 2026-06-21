import { AdvancedMarker } from "@vis.gl/react-google-maps";

import "../../styles/CarrierMarker.css";

export default function CarrierMarker({

    carrier

}) {

    if (!carrier) return null;

    return (

        <AdvancedMarker

            position={{

                lat: carrier.lat,

                lng: carrier.lng

            }}

        >

            <div

                className={`carrier-marker ${

                    carrier.online === false

                        ? "offline"

                        : ""

                }`}

            >

                <div className="carrier-pulse"></div>

                <div className="carrier-dot"></div>

            </div>

        </AdvancedMarker>

    );

}