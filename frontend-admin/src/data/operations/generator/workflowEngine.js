/*
=========================================================

SMARTLOGIX

WORKFLOW ENGINE

=========================================================
*/

import workflow from "../workflow";

export function buildWorkflow(){

    return{

        currentStep:

        workflow[

            workflow.length-1

        ].key,

        currentModule:

        workflow[

            workflow.length-1

        ].name,

        progress:100,

        completedSteps:

        workflow.map(

            step=>step.key

        ),

        pendingSteps:[],

        totalSteps:

        workflow.length,

        started:true,

        finished:true

    };

}

export function workflowProgress(

stepIndex

){

    return Math.round(

        (

            stepIndex/

            8

        )*100

    );

}

export function currentWorkflowStep(

key

){

    return workflow.find(

        step=>step.key===key

    );

}

export default buildWorkflow;