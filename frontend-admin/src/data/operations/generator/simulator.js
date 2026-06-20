/*
=========================================================

SMARTLOGIX

SIMULATOR ENGINE

Motor principal del Centro de Operaciones

=========================================================
*/

import buildTrace from "./traceBuilder";

import workflow from "../workflow";

const DEFAULT_OPERATIONS = 250;

let operations = [];

/*
=========================================================
INICIALIZAR EMPRESA
=========================================================
*/

export function initializeCompany(

    total = DEFAULT_OPERATIONS

) {

    operations = [];

    for (let i = 1; i <= total; i++) {

        operations.push(

            buildTrace(i)

        );

    }

    return operations;

}

/*
=========================================================
OBTENER TODOS
=========================================================
*/

export function getOperations() {

    return operations;

}

/*
=========================================================
BUSCAR POR TRACE
=========================================================
*/

export function getTrace(traceId) {

    return operations.find(

        operation =>

        operation.ids.traceId === traceId

    );

}

/*
=========================================================
BUSCAR POR PEDIDO
=========================================================
*/

export function getOrder(orderId){

    return operations.find(

        operation=>

        operation.ids.orderId===orderId

    );

}

/*
=========================================================
BUSCAR POR ENVÍO
=========================================================
*/

export function getShipment(shipmentId){

    return operations.find(

        operation=>

        operation.ids.shipmentId===shipmentId

    );

}

/*
=========================================================
FILTRAR POR MÓDULO
=========================================================
*/

export function getOperationsByModule(

    module

){

    return operations.filter(

        operation=>

        operation.shipment.currentModule===module

    );

}

/*
=========================================================
MOVER UN EXPEDIENTE
=========================================================
*/

export function advanceOperation(trace){

    const current=

    workflow.findIndex(

        step=>

        step.key===

        trace.shipment.currentModule

    );

    if(

        current===-1 ||

        current===workflow.length-1

    ){

        return trace;

    }

    const next=

    workflow[current+1];

    trace.shipment.currentModule=

    next.key;

    trace.shipment.status=

    next.name;

    trace.workflow.currentStep=

    next.key;

    trace.workflow.currentModule=

    next.name;

    trace.workflow.progress=

    Math.round(

        (

            (current+2)/

            workflow.length

        )*100

    );

    return trace;

}

/*
=========================================================
MOVER EXPEDIENTES ALEATORIOS

Simula actividad real.

=========================================================
*/

export function simulateTick(){

    if(

        operations.length===0

    ){

        return;

    }

    const totalMoves=

    Math.floor(

        Math.random()*10

    )+5;

    for(

        let i=0;

        i<totalMoves;

        i++

    ){

        const index=

        Math.floor(

            Math.random()*

            operations.length

        );

        advanceOperation(

            operations[index]

        );

    }

}

/*
=========================================================
ESTADÍSTICAS
=========================================================
*/

export function getStatistics(){

    const stats={

        total:

        operations.length,

        completed:0,

        inTransit:0,

        incidents:0,

        emails:0

    };

    operations.forEach(

        operation=>{

            if(

                operation.shipment.currentModule===

                "completed"

            ){

                stats.completed++;

            }

            if(

                operation.shipment.currentModule===

                "transit"

            ){

                stats.inTransit++;

            }

            if(

                operation.incidents.length>0

            ){

                stats.incidents++;

            }

            if(

                operation.notifications.emailSent

            ){

                stats.emails++;

            }

        }

    );

    return stats;

}

/*
=========================================================
BUSCADOR GLOBAL

=========================================================
*/

export function search(text){

    const query=

    text.toLowerCase();

    return operations.filter(

        operation=>{

            return(

                operation.ids.traceId

                .toLowerCase()

                .includes(query)

                ||

                operation.ids.orderId

                .toLowerCase()

                .includes(query)

                ||

                operation.ids.shipmentId

                .toLowerCase()

                .includes(query)

                ||

                operation.ids.trackingId

                .toLowerCase()

                .includes(query)

                ||

                operation.customer.fullName

                .toLowerCase()

                .includes(query)

            );

        }

    );

}

/*
=========================================================
RESETEAR

=========================================================
*/

export function resetSimulation(){

    operations=[];

    initializeCompany();

}

initializeCompany();

export default operations;