/*
=========================================================

 SMARTLOGIX

 TRACE MODEL

 Modelo oficial utilizado por todo el
 Centro de Operaciones.

 Representa un expediente completo.

=========================================================
*/

export function createEmptyTrace() {

    return {

        /*
        =================================================
        IDENTIFICADORES
        =================================================
        */

        ids: {

            traceId: "",

            orderId: "",

            shipmentId: "",

            trackingId: "",

            invoiceId: "",

            creditNoteId: "",

            shippingLabelId: ""

        },



        /*
        =================================================
        CLIENTE
        =================================================
        */

        customer: {

            id: null,

            firstName: "",

            lastName: "",

            fullName: "",

            email: "",

            phone: "",

            address: "",

            commune: "",

            region: "",

            zipCode: ""

        },



        /*
        =================================================
        PRODUCTOS
        =================================================
        */

        products: [

            {

                id: null,

                sku: "",

                barcode: "",

                name: "",

                category: "",

                brand: "",

                quantity: 1,

                unitPrice: 0,

                discount: 0,

                tax: 19,

                total: 0,

                weight: 0,

                warehouse: ""

            }

        ],



        /*
        =================================================
        ENVÍO
        =================================================
        */

        shipment: {

            carrier: "",

            carrierCode: "",

            service: "",

            estimatedDelivery: "",

            shippingCost: 0,

            status: "",

            weight: 0,

            priority: "",

            pickupDate: "",

            deliveryDate: "",

            currentModule: ""

        },



        /*
        =================================================
        TRACKING
        =================================================
        */

        tracking: {

            trackingNumber: "",

            currentStatus: "",

            lastUpdate: "",

            latitude: null,

            longitude: null,

            currentLocation: "",

            history: []

        },



        /*
        =================================================
        DOCUMENTOS
        =================================================
        */

        documents: {

            invoice: {

                generated: false,

                generatedAt: "",

                pdf: null

            },

            creditNote: {

                generated: false,

                generatedAt: "",

                pdf: null

            },

            shippingLabel: {

                generated: false,

                generatedAt: "",

                pdf: null

            },

            pickingList: {

                generated: false,

                generatedAt: "",

                pdf: null

            }

        },



        /*
        =================================================
        NOTIFICACIONES
        =================================================
        */

        notifications: {

            emailSent: false,

            smsSent: false,

            whatsappSent: false,

            pushSent: false,

            lastNotification: ""

        },



        /*
        =================================================
        WORKFLOW
        =================================================
        */

        workflow: {

            currentStep: "",

            completedSteps: [],

            pendingSteps: [],

            progress: 0,

            startedAt: "",

            finishedAt: ""

        },



        /*
        =================================================
        TIMELINE
        =================================================
        */

        timeline: [



            /*
            {

                id,

                time,

                module,

                service,

                operator,

                icon,

                description,

                success

            }

            */

        ],



        /*
        =================================================
        INCIDENCIAS
        =================================================
        */

        incidents: [

            /*
            {

                code,

                title,

                severity,

                resolved

            }

            */

        ],



        /*
        =================================================
        MÉTRICAS
        =================================================
        */

        metrics: {

            totalProcessingSeconds: 0,

            waitingSeconds: 0,

            processingSeconds: 0,

            sla: 24,

            delayed: false

        },



        /*
        =================================================
        AUDITORÍA
        =================================================
        */

        audit: {

            createdBy: "SmartLogix",

            createdAt: "",

            updatedAt: "",

            version: 1

        }

    };

}



/*
=========================================================
CLONAR EXPEDIENTE
=========================================================
*/

export function cloneTrace(trace){

    return JSON.parse(

        JSON.stringify(trace)

    );

}



/*
=========================================================
VERIFICAR SI EL EXPEDIENTE ESTÁ COMPLETO
=========================================================
*/

export function isCompleted(trace){

    return trace.workflow.currentStep === "completed";

}



/*
=========================================================
OBTENER PORCENTAJE DE AVANCE
=========================================================
*/

export function getProgress(trace){

    return trace.workflow.progress;

}



/*
=========================================================
EXPORTACIÓN
=========================================================
*/

export default createEmptyTrace;