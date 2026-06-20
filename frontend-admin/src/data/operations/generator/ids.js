/*
=========================================================

SMARTLOGIX

ID GENERATOR

=========================================================
*/

const YEAR = 2026;

function pad(number, digits = 5) {

    return String(number).padStart(digits, "0");

}

export function generateTraceId(index) {

    return `SLX-${YEAR}-${pad(index)}`;

}

export function generateOrderId(index) {

    return `ORD-${YEAR}-${pad(index)}`;

}

export function generateShipmentId(index) {

    return `ENV-${YEAR}-${pad(index)}`;

}

export function generateTrackingId(index) {

    return `TRK-${YEAR}-${pad(index + 7000)}`;

}

export function generateInvoiceId(index) {

    return `BOL-${YEAR}-${pad(index)}`;

}

export function generateCreditNoteId(index) {

    return `NC-${YEAR}-${pad(index)}`;

}

export function generateShippingLabelId(index) {

    return `LBL-${YEAR}-${pad(index)}`;

}

export function generateUnifiedId(index){

    return `${generateOrderId(index)} · ${generateShipmentId(index)} · ${generateTrackingId(index)}`;

}