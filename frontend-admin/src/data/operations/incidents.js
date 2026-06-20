/*
=========================================================

 SMARTLOGIX

 Incidents Catalog

 Posibles incidencias que pueden ocurrir durante
 el procesamiento logístico.

=========================================================
*/

const incidents = [

{
id:1,

code:"STOCK_EMPTY",

title:"Stock insuficiente",

description:"El inventario disponible no permite completar el pedido.",

severity:"Alta",

color:"#ef4444",

icon:"❌",

module:"validation",

probability:3,

requiresManualReview:true

},

{

id:2,

code:"INVALID_ADDRESS",

title:"Dirección inválida",

description:"La dirección ingresada por el cliente no pudo ser validada.",

severity:"Alta",

color:"#ef4444",

icon:"📍",

module:"carrier",

probability:2,

requiresManualReview:true

},

{

id:3,

code:"PAYMENT_PENDING",

title:"Pago pendiente",

description:"El pago aún no ha sido confirmado por la pasarela.",

severity:"Media",

color:"#f59e0b",

icon:"💳",

module:"orders",

probability:2,

requiresManualReview:false

},

{

id:4,

code:"COURIER_REJECTED",

title:"Courier rechazó el envío",

description:"El transportista rechazó temporalmente el retiro.",

severity:"Alta",

color:"#dc2626",

icon:"🚚",

module:"pickup",

probability:1,

requiresManualReview:true

},

{

id:5,

code:"TRACKING_DELAY",

title:"Demora en actualización",

description:"El courier no ha enviado nuevos eventos de seguimiento.",

severity:"Media",

color:"#f97316",

icon:"⌛",

module:"transit",

probability:4,

requiresManualReview:false

},

{

id:6,

code:"DAMAGED_PACKAGE",

title:"Paquete dañado",

description:"El paquete sufrió daños durante el transporte.",

severity:"Crítica",

color:"#991b1b",

icon:"📦",

module:"transit",

probability:1,

requiresManualReview:true

},

{

id:7,

code:"CUSTOMER_ABSENT",

title:"Cliente ausente",

description:"No fue posible realizar la entrega.",

severity:"Media",

color:"#eab308",

icon:"🏠",

module:"delivery",

probability:5,

requiresManualReview:false

},

{

id:8,

code:"RETURN_REQUEST",

title:"Solicitud de devolución",

description:"El cliente solicitó devolución del producto.",

severity:"Media",

color:"#2563eb",

icon:"↩️",

module:"completed",

probability:2,

requiresManualReview:true

},

{

id:9,

code:"EMAIL_ERROR",

title:"Correo no enviado",

description:"Falló el envío del correo automático.",

severity:"Baja",

color:"#6366f1",

icon:"📧",

module:"notifications",

probability:3,

requiresManualReview:false

},

{

id:10,

code:"PDF_ERROR",

title:"Error al generar PDF",

description:"La boleta o etiqueta no pudo ser generada.",

severity:"Alta",

color:"#b91c1c",

icon:"🧾",

module:"documents",

probability:1,

requiresManualReview:true

}

];

/*
=========================================================
UTILIDADES
=========================================================
*/

export function getIncidents(){

return incidents;

}

export function getIncident(id){

return incidents.find(

incident=>incident.id===id

);

}

export function getIncidentByCode(code){

return incidents.find(

incident=>incident.code===code

);

}

export function getRandomIncident(){

const probabilityPool=[];

incidents.forEach(incident=>{

for(let i=0;i<incident.probability;i++){

probabilityPool.push(incident);

}

});

return probabilityPool[

Math.floor(

Math.random()*probabilityPool.length

)

];

}

export function shouldGenerateIncident(){

/*
Aproximadamente un 12% de los expedientes
tendrán alguna incidencia.
*/

return Math.random()<0.12;

}

export default incidents;