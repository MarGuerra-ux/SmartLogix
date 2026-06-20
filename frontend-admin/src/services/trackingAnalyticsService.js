import {
  getTrackingShipments
} from "./trackingService";

export function getTrackingStats() {

  const shipments =
    getTrackingShipments();

  return {
    inTransit:
      shipments.filter(
        s => s.status === "En tránsito"
      ).length,

    onDelivery:
      shipments.filter(
        s => s.status === "En reparto"
      ).length,

    delivered: 278,

    incidents: 4
  };
}

export function getRecentActivity() {

  const shipments =
    getTrackingShipments();

  return shipments.map(
    shipment => ({
      id: shipment.id,
      orderNumber:
        shipment.orderNumber,
      status:
        shipment.status,
      lastUpdate:
        shipment.lastUpdate
    })
  );
}

export function getCourierPerformance() {

  return [
    {
      carrier: "Chilexpress",
      sla: 99.1
    },
    {
      carrier: "Blue Express",
      sla: 97.8
    },
    {
      carrier: "Starken",
      sla: 92.3
    }
  ];
}

export function getTrackingDistribution() {

  return {
    delivered: 278,
    inTransit: 34,
    onDelivery: 12,
    preparing: 18
  };
}

export function getTrackingAlerts() {

  return [
    {
      id: 1,
      message:
        "Pedido PED-2026-00118 con dirección incompleta."
    },

    {
      id: 2,
      message:
        "Pedido PED-2026-00119 presenta retraso superior a 24 horas."
    }
  ];
}