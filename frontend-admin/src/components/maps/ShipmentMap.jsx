import GoogleMap from "./GoogleMap";

import {

    MODAL_MAP_ZOOM

} from "../../config/maps";

export default function ShipmentMap({

    shipment

}) {

    if (!shipment) return null;

    const marker = {

        id: shipment.id,

        title: shipment.orderNumber,

        lat: shipment.lat ?? -33.4489,

        lng: shipment.lng ?? -70.6693,

        online: true

    };

    return (

        <GoogleMap

            center={{

                lat: marker.lat,

                lng: marker.lng

            }}

            zoom={MODAL_MAP_ZOOM}

            markers={[marker]}

            height="500px"

        />

    );

}