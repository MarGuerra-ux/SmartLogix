/*
=========================================================

 SMARTLOGIX

 Customers Catalog

=========================================================
*/

const customers = [

{
id:1,
firstName:"María",
lastName:"González",
email:"maria.gonzalez@email.cl",
phone:"+56984112511",
address:"Av. Apoquindo 1520",
commune:"Las Condes",
region:"Región Metropolitana",
zipCode:"7550000"
},

{
id:2,
firstName:"Juan",
lastName:"Pérez",
email:"juan.perez@email.cl",
phone:"+56999887711",
address:"Los Carrera 455",
commune:"Maipú",
region:"Región Metropolitana",
zipCode:"9250000"
},

{
id:3,
firstName:"Fernanda",
lastName:"Rojas",
email:"fernanda.rojas@email.cl",
phone:"+56974123698",
address:"Av. Alemania 155",
commune:"Temuco",
region:"La Araucanía",
zipCode:"4780000"
},

{
id:4,
firstName:"Carlos",
lastName:"Muñoz",
email:"carlos.munoz@email.cl",
phone:"+56963214587",
address:"O'Higgins 520",
commune:"Concepción",
region:"Biobío",
zipCode:"4030000"
},

{
id:5,
firstName:"Camila",
lastName:"Torres",
email:"camila.torres@email.cl",
phone:"+56978451236",
address:"Pedro de Valdivia 105",
commune:"Providencia",
region:"Región Metropolitana",
zipCode:"7500000"
},

{
id:6,
firstName:"Pedro",
lastName:"Soto",
email:"pedro.soto@email.cl",
phone:"+56965412369",
address:"San Martín 140",
commune:"Viña del Mar",
region:"Valparaíso",
zipCode:"2520000"
},

{
id:7,
firstName:"Valentina",
lastName:"Araya",
email:"valentina.araya@email.cl",
phone:"+56971236548",
address:"Blanco Encalada 250",
commune:"Antofagasta",
region:"Antofagasta",
zipCode:"1240000"
},

{
id:8,
firstName:"Ricardo",
lastName:"Silva",
email:"ricardo.silva@email.cl",
phone:"+56969854125",
address:"Balmaceda 188",
commune:"La Serena",
region:"Coquimbo",
zipCode:"1710000"
},

{
id:9,
firstName:"Daniela",
lastName:"Contreras",
email:"daniela.contreras@email.cl",
phone:"+56988995412",
address:"Prat 450",
commune:"Rancagua",
region:"O'Higgins",
zipCode:"2820000"
},

{
id:10,
firstName:"Felipe",
lastName:"Vargas",
email:"felipe.vargas@email.cl",
phone:"+56977744125",
address:"Independencia 980",
commune:"Talca",
region:"Maule",
zipCode:"3460000"
},

{
id:11,
firstName:"Constanza",
lastName:"Morales",
email:"constanza.morales@email.cl",
phone:"+56996325874",
address:"Los Pinos 140",
commune:"Puerto Montt",
region:"Los Lagos",
zipCode:"5480000"
},

{
id:12,
firstName:"Ignacio",
lastName:"Fuentes",
email:"ignacio.fuentes@email.cl",
phone:"+56965236985",
address:"Chacabuco 100",
commune:"Osorno",
region:"Los Lagos",
zipCode:"5310000"
},

{
id:13,
firstName:"Andrea",
lastName:"Castillo",
email:"andrea.castillo@email.cl",
phone:"+56974125896",
address:"Los Aromos 550",
commune:"Ñuñoa",
region:"Región Metropolitana",
zipCode:"7760000"
},

{
id:14,
firstName:"Cristóbal",
lastName:"Navarro",
email:"cristobal.navarro@email.cl",
phone:"+56988885236",
address:"Macul 3250",
commune:"Macul",
region:"Región Metropolitana",
zipCode:"7810000"
},

{
id:15,
firstName:"Paula",
lastName:"Herrera",
email:"paula.herrera@email.cl",
phone:"+56977441122",
address:"Brasil 850",
commune:"Valdivia",
region:"Los Ríos",
zipCode:"5090000"
},

{
id:16,
firstName:"Sebastián",
lastName:"Cortés",
email:"sebastian.cortes@email.cl",
phone:"+56999981254",
address:"Freire 102",
commune:"Chillán",
region:"Ñuble",
zipCode:"3780000"
},

{
id:17,
firstName:"Natalia",
lastName:"Pizarro",
email:"natalia.pizarro@email.cl",
phone:"+56971458741",
address:"San Diego 522",
commune:"Santiago",
region:"Región Metropolitana",
zipCode:"8330000"
},

{
id:18,
firstName:"Matías",
lastName:"Leiva",
email:"matias.leiva@email.cl",
phone:"+56974147852",
address:"Colón 250",
commune:"Quilicura",
region:"Región Metropolitana",
zipCode:"8700000"
},

{
id:19,
firstName:"Josefa",
lastName:"Ortega",
email:"josefa.ortega@email.cl",
phone:"+56974125814",
address:"Los Leones 150",
commune:"Providencia",
region:"Región Metropolitana",
zipCode:"7510000"
},

{
id:20,
firstName:"Tomás",
lastName:"Reyes",
email:"tomas.reyes@email.cl",
phone:"+56985214763",
address:"Pajaritos 640",
commune:"Estación Central",
region:"Región Metropolitana",
zipCode:"9160000"
}

];

/*
=========================================================
UTILIDADES
=========================================================
*/

export function getCustomers(){

return customers;

}

export function getCustomer(id){

return customers.find(

customer=>customer.id===id

);

}

export function getRandomCustomer(){

return customers[

Math.floor(

Math.random()*customers.length

)

];

}

export default customers;