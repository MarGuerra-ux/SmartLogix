/*
=========================================================

SMARTLOGIX

SHIPMENT ENGINE

=========================================================
*/

import {

    getRandomCarrier

} from "../carriers";

import {

    randomShippingService,

    randomPriority

} from "./random";

import {

    estimatedDelivery,

    calculateSLA,

    formatDateTime,

    now

} from "./dates";

export function buildShipment(weight=1){

    const carrier=

    getRandomCarrier();

    const service=

    randomShippingService();

    const shippingCost=

        carrier.baseCost+

        (

            carrier.costPerKg*

            weight

        );

    return{

        carrierId:carrier.id,

        carrier:carrier.name,

        carrierCode:carrier.code,

        logo:carrier.logo,

        color:carrier.color,

        trackingAvailable:

        carrier.trackingAvailable,

        pickupAvailable:

        carrier.pickupAvailable,

        service,

        priority:

        randomPriority(),

        weight,

        shippingCost:

        Math.round(shippingCost),

        estimatedDelivery:

        estimatedDelivery(service),

        estimatedHours:

        calculateSLA(service),

        pickupDate:

        formatDateTime(now()),

        status:"Preparando envío",

        currentModule:"pickup"

    };

}

export function advanceShipment(

shipment,

module

){

    shipment.currentModule=

    module;

    switch(module){

        case "pickup":

            shipment.status=

            "Retiro Programado";

        break;

        case "transit":

            shipment.status=

            "En Tránsito";

        break;

        case "delivery":

            shipment.status=

            "En Reparto";

        break;

        case "completed":

            shipment.status=

            "Entregado";

        break;

        default:

            shipment.status=

            "Procesando";

    }

    return shipment;

}

export default buildShipment;