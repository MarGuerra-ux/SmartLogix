/*
=========================================================

 SMARTLOGIX

 Operators Catalog

 Personas y sistemas que intervienen
 durante el flujo logístico.

=========================================================
*/

const operators = [

{
id:1,

type:"AI",

name:"SmartLogix AI",

role:"Motor de Decisión",

icon:"🤖",

color:"#6f42c1",

automatic:true,

active:true,

department:"Sistema"

},

{

id:2,

type:"SYSTEM",

name:"OrderService",

role:"Recepción de Pedidos",

icon:"🛒",

color:"#2563eb",

automatic:true,

active:true,

department:"Pedidos"

},

{

id:3,

type:"SYSTEM",

name:"InventoryService",

role:"Validación de Stock",

icon:"📦",

color:"#16a34a",

automatic:true,

active:true,

department:"Inventario"

},

{

id:4,

type:"SYSTEM",

name:"CarrierDecisionService",

role:"Asignación Inteligente",

icon:"🚚",

color:"#ea580c",

automatic:true,

active:true,

department:"Despacho"

},

{

id:5,

type:"SYSTEM",

name:"ShippingService",

role:"Generación de Etiquetas",

icon:"🏷️",

color:"#9333ea",

automatic:true,

active:true,

department:"Despacho"

},

{

id:6,

type:"SYSTEM",

name:"TrackingService",

role:"Seguimiento",

icon:"📍",

color:"#0891b2",

automatic:true,

active:true,

department:"Tracking"

},

{

id:7,

type:"SYSTEM",

name:"NotificationService",

role:"Notificaciones",

icon:"📧",

color:"#0f766e",

automatic:true,

active:true,

department:"Comunicaciones"

},

{

id:8,

type:"USER",

name:"Carlos Muñoz",

role:"Supervisor Logístico",

icon:"👨",

color:"#2563eb",

automatic:false,

active:true,

department:"Operaciones"

},

{

id:9,

type:"USER",

name:"Andrea Silva",

role:"Control de Calidad",

icon:"👩",

color:"#22c55e",

automatic:false,

active:true,

department:"Calidad"

},

{

id:10,

type:"USER",

name:"Roberto Díaz",

role:"Operador de Bodega",

icon:"👨‍🔧",

color:"#f59e0b",

automatic:false,

active:true,

department:"Bodega Central"

},

{

id:11,

type:"USER",

name:"Camila Torres",

role:"Operadora de Picking",

icon:"👩‍🔧",

color:"#ec4899",

automatic:false,

active:true,

department:"Picking"

},

{

id:12,

type:"ROBOT",

name:"Robot Picking A-12",

role:"Preparación Automática",

icon:"📦",

color:"#7c3aed",

automatic:true,

active:true,

department:"Picking"

},

{

id:13,

type:"ROBOT",

name:"Robot Sorting B-04",

role:"Clasificación",

icon:"⚙️",

color:"#4f46e5",

automatic:true,

active:true,

department:"Clasificación"

},

{

id:14,

type:"API",

name:"Chilexpress API",

role:"Generación Tracking",

icon:"🚚",

color:"#FFD100",

automatic:true,

active:true,

department:"Courier"

},

{

id:15,

type:"API",

name:"Blue Express API",

role:"Generación Tracking",

icon:"🚛",

color:"#0055A5",

automatic:true,

active:true,

department:"Courier"

},

{

id:16,

type:"API",

name:"Starken API",

role:"Generación Tracking",

icon:"🚚",

color:"#D50032",

automatic:true,

active:true,

department:"Courier"

},

{

id:17,

type:"SYSTEM",

name:"PDF Engine",

role:"Generación de Documentos",

icon:"🧾",

color:"#dc2626",

automatic:true,

active:true,

department:"Documentos"

},

{

id:18,

type:"SYSTEM",

name:"Mail Engine",

role:"Envío de Correos",

icon:"📨",

color:"#059669",

automatic:true,

active:true,

department:"Correo"

},

{

id:19,

type:"SYSTEM",

name:"RefundService",

role:"Notas de Crédito",

icon:"💸",

color:"#dc2626",

automatic:true,

active:true,

department:"Finanzas"

},

{

id:20,

type:"SYSTEM",

name:"Audit Engine",

role:"Auditoría",

icon:"📋",

color:"#374151",

automatic:true,

active:true,

department:"Sistema"

}

];

/*
=========================================================
UTILIDADES
=========================================================
*/

export function getOperators(){

return operators;

}

export function getOperator(id){

return operators.find(

operator=>operator.id===id

);

}

export function getRandomOperator(){

return operators[

Math.floor(

Math.random()*operators.length

)

];

}

export function getAutomaticOperators(){

return operators.filter(

operator=>operator.automatic

);

}

export function getHumanOperators(){

return operators.filter(

operator=>!operator.automatic

);

}

export default operators;