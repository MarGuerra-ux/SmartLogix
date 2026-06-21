// ============================================
// SMARTLOGIX
// CARRIER SIMULATION
// ============================================

import {

    getRandomRoute

} from "./routes";

const CARRIERS = [

    "Chilexpress",

    "Starken",

    "Blue Express"

];

function randomCarrier(){

    return CARRIERS[

        Math.floor(

            Math.random() *

            CARRIERS.length

        )

    ];

}

function randomOffset(radius){

    return (

        Math.random() * radius * 2

    ) - radius;

}

export function createCarrier(id){

    const route =

        getRandomRoute();

    return {

        id,

        carrier:

            randomCarrier(),

        title:

            `Transportista ${id}`,

        online: true,

        speed:

            0.00015 +

            Math.random() * 0.00025,

        lat:

            route.center.lat +

            randomOffset(route.radius),

        lng:

            route.center.lng +

            randomOffset(route.radius),

        direction:

            Math.random() * 360,

        route

    };

}

export function createFleet(

    total = 18

){

    return Array.from(

        {

            length: total

        },

        (

            _,

            index

        ) =>

            createCarrier(

                index + 1

            )

    );

}