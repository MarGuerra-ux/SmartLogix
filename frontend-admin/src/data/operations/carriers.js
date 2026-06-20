/*
=========================================================

 SMARTLOGIX

 Carriers Catalog

Motor de decisión logística

=========================================================
*/

const carriers = [

{
id:1,

code:"CHX",

name:"Chilexpress",

logo:"/carriers/chilexpress.png",

color:"#FFD100",

website:"https://www.chilexpress.cl",

priority:1,

active:true,

score:99.2,

sla:24,

maxDailyShipments:8000,

coverage:"Nacional",

supportsExpress:true,

supportsReturns:true,

pickupAvailable:true,

trackingAvailable:true,

baseCost:3490,

costPerKg:650,

maxWeight:50,

averageDeliveryHours:24,

regions:[
"Arica y Parinacota",
"Tarapacá",
"Antofagasta",
"Atacama",
"Coquimbo",
"Valparaíso",
"Región Metropolitana",
"O'Higgins",
"Maule",
"Ñuble",
"Biobío",
"La Araucanía",
"Los Ríos",
"Los Lagos",
"Aysén",
"Magallanes"
]

},

{

id:2,

code:"STK",

name:"Starken",

logo:"/carriers/starken.png",

color:"#D50032",

website:"https://www.starken.cl",

priority:2,

active:true,

score:97.8,

sla:48,

maxDailyShipments:6500,

coverage:"Nacional",

supportsExpress:false,

supportsReturns:true,

pickupAvailable:true,

trackingAvailable:true,

baseCost:2990,

costPerKg:590,

maxWeight:80,

averageDeliveryHours:36,

regions:[
"Valparaíso",
"Región Metropolitana",
"O'Higgins",
"Maule",
"Ñuble",
"Biobío",
"La Araucanía",
"Los Lagos"
]

},

{

id:3,

code:"BLU",

name:"Blue Express",

logo:"/carriers/blueexpress.png",

color:"#0055A5",

website:"https://www.blue.cl",

priority:3,

active:true,

score:98.1,

sla:24,

maxDailyShipments:5000,

coverage:"Nacional",

supportsExpress:true,

supportsReturns:true,

pickupAvailable:true,

trackingAvailable:true,

baseCost:3290,

costPerKg:610,

maxWeight:45,

averageDeliveryHours:24,

regions:[
"Coquimbo",
"Valparaíso",
"Región Metropolitana",
"O'Higgins",
"Maule",
"Biobío",
"La Araucanía"
]

},

{

id:4,

code:"DHL",

name:"DHL Express",

logo:"/carriers/dhl.png",

color:"#FFCC00",

website:"https://www.dhl.com",

priority:4,

active:true,

score:99.8,

sla:12,

maxDailyShipments:2500,

coverage:"Internacional",

supportsExpress:true,

supportsReturns:true,

pickupAvailable:true,

trackingAvailable:true,

baseCost:10990,

costPerKg:1450,

maxWeight:70,

averageDeliveryHours:12,

regions:[
"Internacional"
]

},

{

id:5,

code:"FED",

name:"FedEx",

logo:"/carriers/fedex.png",

color:"#4D148C",

website:"https://www.fedex.com",

priority:5,

active:true,

score:99.5,

sla:18,

maxDailyShipments:1800,

coverage:"Internacional",

supportsExpress:true,

supportsReturns:true,

pickupAvailable:true,

trackingAvailable:true,

baseCost:11990,

costPerKg:1590,

maxWeight:70,

averageDeliveryHours:18,

regions:[
"Internacional"
]

}

];

/*
=========================================================
UTILIDADES
=========================================================
*/

export function getCarriers(){

return carriers;

}

export function getCarrier(id){

return carriers.find(

carrier=>carrier.id===id

);

}

export function getCarrierByCode(code){

return carriers.find(

carrier=>carrier.code===code

);

}

export function getCarrierByName(name){

return carriers.find(

carrier=>carrier.name===name

);

}

export function getAvailableCarriers(){

return carriers.filter(

carrier=>carrier.active

);

}

export function getExpressCarriers(){

return carriers.filter(

carrier=>carrier.supportsExpress

);

}

export function getRandomCarrier(){

const available=

getAvailableCarriers();

return available[

Math.floor(

Math.random()*available.length

)

];

}

export default carriers;