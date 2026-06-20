/*
=========================================================

 SMARTLOGIX

 OPERATIONS CENTER SERVICE

 Backend Simulado Oficial

 Este servicio es el único punto de acceso entre
 React y el motor de simulación.

=========================================================
*/

import workflow from "../data/operations/workflow";

import {

initializeCompany,

getOperations,

getTrace,

getOrder,

getShipment,

getOperationsByModule,

getStatistics,

advanceOperation,

simulateTick,

search,

resetSimulation

} from "../data/operations/generator";

/*
=========================================================

ESTADO INTERNO

=========================================================
*/

let simulationRunning = false;

let simulationTimer = null;

const listeners = [];

/*
=========================================================

INICIALIZAR

=========================================================
*/

initializeCompany();

/*
=========================================================

NOTIFICACIONES

=========================================================
*/

function notify(){

    listeners.forEach(

        listener=>listener()

    );

}

/*
=========================================================

SUSCRIPCIÓN

=========================================================
*/

export function subscribe(listener){

    listeners.push(listener);

}

export function unsubscribe(listener){

    const index=

    listeners.indexOf(listener);

    if(index!==-1){

        listeners.splice(index,1);

    }

}

/*
=========================================================

ESTADO SIMULACIÓN

=========================================================
*/

export function isSimulationRunning(){

    return simulationRunning;

}

/*
=========================================================

CONSULTAS GENERALES

=========================================================
*/

export function getDashboard() {

    return getStatistics();

}

export function getWorkflow() {

    return workflow;

}

export function getAllOperations() {

    return getOperations();

}

export function getOperation(traceId) {

    return getTrace(traceId);

}

export function getOrderById(orderId) {

    return getOrder(orderId);

}

export function getShipmentById(shipmentId) {

    return getShipment(shipmentId);

}

/*
=========================================================

MÓDULOS

=========================================================
*/

export function getModule(moduleKey){

    return getOperationsByModule(

        moduleKey

    );

}

export function getOrdersModule(){

    return getModule(

        "orders"

    );

}

export function getValidationModule(){

    return getModule(

        "validation"

    );

}

export function getCarrierModule(){

    return getModule(

        "carrier"

    );

}

export function getLabelModule(){

    return getModule(

        "label"

    );

}

export function getPickupModule(){

    return getModule(

        "pickup"

    );

}

export function getTransitModule(){

    return getModule(

        "transit"

    );

}

export function getDeliveryModule(){

    return getModule(

        "delivery"

    );

}

export function getCompletedModule(){

    return getModule(

        "completed"

    );

}

/*
=========================================================

BUSCADOR

=========================================================
*/

export function searchOperation(text){

    if(

        !text ||

        text.trim()===""

    ){

        return getOperations();

    }

    return search(text);

}

/*
=========================================================

CONTROL DE LA SIMULACIÓN

=========================================================
*/

export function startSimulation(interval = 2000){

    if(simulationRunning){

        return;

    }

    simulationRunning = true;

    simulationTimer = setInterval(()=>{

        simulateTick();

        notify();

    }, interval);

}

export function stopSimulation(){

    if(!simulationRunning){

        return;

    }

    clearInterval(simulationTimer);

    simulationTimer = null;

    simulationRunning = false;

}

export function toggleSimulation(){

    if(simulationRunning){

        stopSimulation();

    }
    else{

        startSimulation();

    }

    return simulationRunning;

}

/*
=========================================================

AVANZAR UN SOLO CICLO

=========================================================
*/

export function nextTick(){

    simulateTick();

    notify();

}

/*
=========================================================

AVANZAR UN EXPEDIENTE

=========================================================
*/

export function advanceTrace(traceId){

    const trace = getTrace(traceId);

    if(!trace){

        return null;

    }

    advanceOperation(trace);

    notify();

    return trace;

}

/*
=========================================================

REINICIAR EMPRESA

=========================================================
*/

export function restartSimulation(total = 250){

    stopSimulation();

    resetSimulation();

    initializeCompany(total);

    notify();

}

/*
=========================================================

ACTUALIZAR MANUALMENTE

=========================================================
*/

export function refresh(){

    notify();

}