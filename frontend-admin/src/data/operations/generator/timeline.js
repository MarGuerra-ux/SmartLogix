/*
=========================================================

SMARTLOGIX

TIMELINE ENGINE

=========================================================
*/

import workflow from "../workflow";

import {

    randomProcessingTime

} from "./random";

import {

    randomDate,

    addSeconds,

    formatTime

} from "./dates";

import {

    getRandomOperator

} from "../operators";

export function buildTimeline(){

    const events=[];

    let date=randomDate();

    workflow.forEach(step=>{

        const operator=

        getRandomOperator();

        date=addSeconds(

            date,

            randomProcessingTime()

        );

        events.push({

            id:step.id,

            module:step.key,

            step:step.name,

            service:step.service,

            operator:operator.name,

            operatorRole:operator.role,

            icon:operator.icon,

            color:step.color,

            description:step.description,

            success:true,

            time:formatTime(date),

            timestamp:date

        });

    });

    return events;

}

export function currentStep(timeline){

    return timeline[

        timeline.length-1

    ];

}

export function getTimelineByModule(

    timeline,

    module

){

    return timeline.filter(

        event=>

        event.module===module

    );

}

export function timelineDuration(

    timeline

){

    if(

        timeline.length===0

    ){

        return 0;

    }

    const start=

    timeline[0].timestamp;

    const end=

    timeline[

        timeline.length-1

    ].timestamp;

    return Math.floor(

        (

            end-start

        )/1000

    );

}

export default buildTimeline;