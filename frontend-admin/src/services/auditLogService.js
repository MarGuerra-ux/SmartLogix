import auditLogs from "../data/auditLogs";

export function getAuditLogs() {

    return auditLogs;

}

export function getAuditLog(entityType, entityId) {

    return auditLogs.find(

        (log) =>

            log.entityType === entityType &&

            log.entityId === entityId

    );

}

export function getOrderLog(orderId) {

    return getAuditLog(

        "ORDER",

        orderId

    );

}

export function getShipmentLog(shipmentId) {

    return getAuditLog(

        "SHIPMENT",

        shipmentId

    );

}

export function getRefundLog(refundId) {

    return getAuditLog(

        "REFUND",

        refundId

    );

}

export function registerAuditEvent(

    entityType,

    entityId,

    event

) {

    const log = getAuditLog(

        entityType,

        entityId

    );

    if (!log) return;

    log.events.push({

        id: Date.now(),

        time: new Date().toLocaleTimeString(),

        ...event

    });

}

export function registerDocument(

    entityType,

    entityId,

    document,

    value = true

) {

    const log = getAuditLog(

        entityType,

        entityId

    );

    if (!log) return;

    log.documents[document] = value;

}

export function registerNotification(

    entityType,

    entityId,

    notification,

    value = true

) {

    const log = getAuditLog(

        entityType,

        entityId

    );

    if (!log) return;

    log.notifications[notification] = value;

}
