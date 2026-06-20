/*
=========================================================

SMARTLOGIX

INCIDENT ENGINE

=========================================================
*/

import{

    shouldGenerateIncident,

    getRandomIncident

}from "../incidents";

export function buildIncidents(){

    const list=[];

    if(

        shouldGenerateIncident()

    ){

        const incident=

        getRandomIncident();

        list.push({

            ...incident,

            resolved:

            Math.random()>0.5,

            createdAt:

            new Date()

        });

    }

    return list;

}

export function hasIncidents(

incidents

){

    return incidents.length>0;

}

export function incidentCount(

incidents

){

    return incidents.length;

}

export default buildIncidents;