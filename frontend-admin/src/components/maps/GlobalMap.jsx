import GoogleMap from "./GoogleMap";

import useCarrierSimulation from "../../hooks/useCarrierSimulation";

import {

    DEFAULT_CENTER,

    GLOBAL_MAP_ZOOM

} from "../../config/maps";

export default function GlobalMap() {

    const carriers =

        useCarrierSimulation(

            18,

            1200

        );

    return (

        <GoogleMap

            center={DEFAULT_CENTER}

            zoom={GLOBAL_MAP_ZOOM}

            markers={carriers}

            height="450px"

        />

    );

}