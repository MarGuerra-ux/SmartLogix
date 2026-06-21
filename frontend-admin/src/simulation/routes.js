// ============================================
// SMARTLOGIX
// TRACKING ROUTES
// ============================================

export const TRACKING_ROUTES = [

    {

        id: "providencia",

        name: "Providencia",

        center: {

            lat: -33.4258,

            lng: -70.6152

        },

        radius: 0.012

    },

    {

        id: "las-condes",

        name: "Las Condes",

        center: {

            lat: -33.4083,

            lng: -70.5671

        },

        radius: 0.014

    },

    {

        id: "nunoa",

        name: "Ñuñoa",

        center: {

            lat: -33.4567,

            lng: -70.5979

        },

        radius: 0.011

    },

    {

        id: "santiago-centro",

        name: "Santiago Centro",

        center: {

            lat: -33.4489,

            lng: -70.6693

        },

        radius: 0.013

    },

    {

        id: "maipu",

        name: "Maipú",

        center: {

            lat: -33.5109,

            lng: -70.7582

        },

        radius: 0.016

    },

    {

        id: "la-florida",

        name: "La Florida",

        center: {

            lat: -33.5225,

            lng: -70.5968

        },

        radius: 0.015

    },

    {

        id: "quilicura",

        name: "Quilicura",

        center: {

            lat: -33.3648,

            lng: -70.7288

        },

        radius: 0.016

    },

    {

        id: "puente-alto",

        name: "Puente Alto",

        center: {

            lat: -33.6118,

            lng: -70.5755

        },

        radius: 0.018

    }

];

export function getRandomRoute(){

    return TRACKING_ROUTES[

        Math.floor(

            Math.random() *

            TRACKING_ROUTES.length

        )

    ];

}