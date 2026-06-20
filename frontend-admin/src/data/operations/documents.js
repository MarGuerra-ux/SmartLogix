/*
=========================================================

 SMARTLOGIX

 Documents Catalog

 Todos los documentos que puede generar
 el sistema durante el flujo logístico.

=========================================================
*/

const documents = [

{
id:1,

code:"INVOICE",

name:"Boleta Electrónica",

shortName:"Boleta",

icon:"🧾",

color:"#2563eb",

module:"completed",

extension:"pdf",

generatedAutomatically:true,

required:true,

downloadable:true,

printable:true,

email:true,

description:"Documento tributario enviado al cliente."

},

{

id:2,

code:"CREDIT_NOTE",

name:"Nota de Crédito",

shortName:"NC",

icon:"💸",

color:"#dc2626",

module:"refund",

extension:"pdf",

generatedAutomatically:true,

required:false,

downloadable:true,

printable:true,

email:true,

description:"Documento emitido en procesos de devolución."

},

{

id:3,

code:"SHIPPING_LABEL",

name:"Etiqueta Logística",

shortName:"Etiqueta",

icon:"🏷️",

color:"#16a34a",

module:"label",

extension:"pdf",

generatedAutomatically:true,

required:true,

downloadable:true,

printable:true,

email:false,

description:"Etiqueta utilizada por el transportista."

},

{

id:4,

code:"PICKING_LIST",

name:"Picking List",

shortName:"Picking",

icon:"📦",

color:"#f59e0b",

module:"validation",

extension:"pdf",

generatedAutomatically:true,

required:false,

downloadable:true,

printable:true,

email:false,

description:"Listado de preparación del pedido."

},

{

id:5,

code:"DELIVERY_PROOF",

name:"Comprobante de Entrega",

shortName:"Entrega",

icon:"✅",

color:"#10b981",

module:"completed",

extension:"pdf",

generatedAutomatically:false,

required:false,

downloadable:true,

printable:true,

email:true,

description:"Documento firmado al entregar el pedido."

},

{

id:6,

code:"AUDIT_LOG",

name:"Registro de Auditoría",

shortName:"Auditoría",

icon:"📋",

color:"#6b7280",

module:"system",

extension:"log",

generatedAutomatically:true,

required:true,

downloadable:false,

printable:false,

email:false,

description:"Registro interno del procesamiento."

}

];

/*
=========================================================
UTILIDADES
=========================================================
*/

export function getDocuments(){

return documents;

}

export function getDocument(id){

return documents.find(

document=>document.id===id

);

}

export function getDocumentByCode(code){

return documents.find(

document=>document.code===code

);

}

export function getDocumentsByModule(module){

return documents.filter(

document=>document.module===module

);

}

export function generateDocumentStatus(){

return{

invoice:Math.random()>0.05,

creditNote:Math.random()>0.96,

shippingLabel:Math.random()>0.03,

pickingList:Math.random()>0.08,

deliveryProof:Math.random()>0.35,

audit:true

};

}

export default documents;