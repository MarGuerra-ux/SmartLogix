/*
=========================================================

SMARTLOGIX

TRACE BUILDER

Construye un expediente completo (SLX Trace)

=========================================================
*/

import createEmptyTrace from "../traceModel";

import { getRandomCustomer } from "../customers";
import { getRandomProduct } from "../products";

import buildShipment from "./shipment";
import buildTimeline from "./timeline";
import buildNotifications from "./notifications";
import buildDocuments from "./documentsEngine";
import buildIncidents from "./incidentEngine";
import buildWorkflow from "./workflowEngine";

import {

generateTraceId,
generateOrderId,
generateShipmentId,
generateTrackingId,
generateInvoiceId,
generateCreditNoteId,
generateShippingLabelId

} from "./ids";

import {

randomQuantity,
randomDiscount

} from "./random";



export function buildTrace(index){

    const trace=createEmptyTrace();

    const customer=getRandomCustomer();

    const product=getRandomProduct();

    const quantity=randomQuantity();

    const discount=randomDiscount();

    const subtotal=

        product.price*

        quantity;

    const discountValue=

        subtotal*

        (discount/100);

    const total=

        subtotal-

        discountValue;

    const shipment=

        buildShipment(

            product.weight*

            quantity

        );



    /*
    =====================================================
    IDS
    =====================================================
    */

    trace.ids.traceId=

    generateTraceId(index);

    trace.ids.orderId=

    generateOrderId(index);

    trace.ids.shipmentId=

    generateShipmentId(index);

    trace.ids.trackingId=

    generateTrackingId(index);

    trace.ids.invoiceId=

    generateInvoiceId(index);

    trace.ids.creditNoteId=

    generateCreditNoteId(index);

    trace.ids.shippingLabelId=

    generateShippingLabelId(index);



    /*
    =====================================================
    CLIENTE
    =====================================================
    */

    trace.customer={

        ...customer,

        fullName:

        `${customer.firstName} ${customer.lastName}`

    };



    /*
    =====================================================
    PRODUCTOS
    =====================================================
    */

    trace.products=[

        {

            ...product,

            quantity,

            discount,

            subtotal,

            total

        }

    ];



    /*
    =====================================================
    ENVÍO
    =====================================================
    */

    trace.shipment=shipment;
    trace.shipment.currentModule="orders";

    trace.workflow.currentStep="orders";

    trace.workflow.progress=5;



    /*
    =====================================================
    TRACKING
    =====================================================
    */

    trace.tracking={

        trackingNumber:

        trace.ids.trackingId,

        currentStatus:

        shipment.status,

        currentLocation:

        shipment.carrier,

        latitude:null,

        longitude:null,

        history:[]

    };



    /*
    =====================================================
    DOCUMENTOS
    =====================================================
    */

    trace.documents=

    buildDocuments(index);



    /*
    =====================================================
    NOTIFICACIONES
    =====================================================
    */

    trace.notifications=

    buildNotifications();



    /*
    =====================================================
    WORKFLOW
    =====================================================
    */

    trace.workflow=

    buildWorkflow();



    /*
    =====================================================
    TIMELINE
    =====================================================
    */

    trace.timeline=

    buildTimeline();



    /*
    =====================================================
    INCIDENCIAS
    =====================================================
    */

    trace.incidents=

    buildIncidents();



    /*
    =====================================================
    MÉTRICAS
    =====================================================
    */

    trace.metrics={

        totalProcessingSeconds:

        0,

        waitingSeconds:

        0,

        processingSeconds:

        0,

        sla:

        shipment.estimatedHours,

        delayed:false

    };



    /*
    =====================================================
    AUDITORÍA
    =====================================================
    */

    trace.audit={

        createdBy:

        "SmartLogix",

        createdAt:

        new Date(),

        updatedAt:

        new Date(),

        version:1

    };



    return trace;

}



export default buildTrace;