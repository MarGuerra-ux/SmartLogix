/*
=========================================================

SMARTLOGIX

DATES ENGINE

=========================================================
*/

import { random } from "./random";

export function now(){

    return new Date();

}

export function randomDate(hoursBack=72){

    const date=new Date();

    date.setHours(

        date.getHours()-random(1,hoursBack)

    );

    return date;

}

export function addSeconds(date,seconds){

    return new Date(

        date.getTime()+

        seconds*1000

    );

}

export function addMinutes(date,minutes){

    return new Date(

        date.getTime()+

        minutes*60000

    );

}

export function addHours(date,hours){

    return new Date(

        date.getTime()+

        hours*3600000

    );

}

export function formatDate(date){

    return date.toLocaleDateString(

        "es-CL"

    );

}

export function formatTime(date){

    return date.toLocaleTimeString(

        "es-CL",

        {

            hour:"2-digit",

            minute:"2-digit",

            second:"2-digit"

        }

    );

}

export function formatDateTime(date){

    return `${

        formatDate(date)

    } ${

        formatTime(date)

    }`;

}

export function estimatedDelivery(service){

    const date=new Date();

    if(service==="Express"){

        date.setDate(

            date.getDate()+1

        );

    }

    else{

        date.setDate(

            date.getDate()+3

        );

    }

    return formatDate(date);

}

export function calculateSLA(service){

    return service==="Express"

        ?24

        :72;

}