/*
============================================================

 SMARTLOGIX
 Workflow Engine

 Este archivo define el flujo oficial del
 procesamiento logístico.

 Todas las vistas utilizarán esta definición.

============================================================
*/

const workflow = [

  {
    id: 1,

    key: "orders",

    name: "Pedido recibido",

    service: "OrderService",

    icon: "🛒",

    color: "#3b82f6",

    description:
      "Recepción del pedido desde el canal de ventas.",

    next: "validation",

    estimatedSeconds: 8,

    documents: [],

    allowDetails: true,

    allowLog: true,

    allowIncidents: false
  },

  {
    id: 2,

    key: "validation",

    name: "Validar Stock",

    service: "OrderValidationService",

    icon: "📦",

    color: "#22c55e",

    description:
      "Verificación automática del inventario.",

    next: "carrier",

    estimatedSeconds: 12,

    documents: [],

    allowDetails: true,

    allowLog: true,

    allowIncidents: true
  },

  {
    id: 3,

    key: "carrier",

    name: "Seleccionar Courier",

    service: "CarrierDecisionService",

    icon: "🚚",

    color: "#f59e0b",

    description:
      "Asignación inteligente del transportista.",

    next: "label",

    estimatedSeconds: 6,

    documents: [],

    allowDetails: true,

    allowLog: true,

    allowIncidents: true
  },

  {
    id: 4,

    key: "label",

    name: "Generar Etiqueta",

    service: "ShippingService",

    icon: "🏷️",

    color: "#8b5cf6",

    description:
      "Generación de etiqueta logística.",

    next: "pickup",

    estimatedSeconds: 5,

    documents: [
      "shippingLabel"
    ],

    allowDetails: true,

    allowLog: true,

    allowIncidents: false
  },

  {
    id: 5,

    key: "pickup",

    name: "Retiro por Courier",

    service: "CarrierService",

    icon: "📥",

    color: "#14b8a6",

    description:
      "El transportista retira el pedido.",

    next: "transit",

    estimatedSeconds: 30,

    documents: [],

    allowDetails: true,

    allowLog: true,

    allowIncidents: true
  },

  {
    id: 6,

    key: "transit",

    name: "En Tránsito",

    service: "TrackingService",

    icon: "🚛",

    color: "#06b6d4",

    description:
      "Seguimiento durante el transporte.",

    next: "delivery",

    estimatedSeconds: 180,

    documents: [],

    allowDetails: true,

    allowLog: true,

    allowIncidents: true
  },

  {
    id: 7,

    key: "delivery",

    name: "En Reparto",

    service: "TrackingService",

    icon: "📍",

    color: "#0ea5e9",

    description:
      "Distribución hacia el domicilio.",

    next: "completed",

    estimatedSeconds: 120,

    documents: [],

    allowDetails: true,

    allowLog: true,

    allowIncidents: true
  },

  {
    id: 8,

    key: "completed",

    name: "Entregado",

    service: "NotificationService",

    icon: "✅",

    color: "#16a34a",

    description:
      "Pedido entregado exitosamente.",

    next: null,

    estimatedSeconds: 0,

    documents: [
      "invoice"
    ],

    allowDetails: true,

    allowLog: true,

    allowIncidents: false
  }

];

/*
============================================================
UTILIDADES
============================================================
*/

export function getWorkflow() {
  return workflow;
}

export function getWorkflowStep(key) {
  return workflow.find(
    step => step.key === key
  );
}

export function getWorkflowById(id) {
  return workflow.find(
    step => step.id === id
  );
}

export function getNextStep(key) {

  const current =
    getWorkflowStep(key);

  if (!current) {
    return null;
  }

  return getWorkflowStep(
    current.next
  );

}

export function isLastStep(key) {

  const current =
    getWorkflowStep(key);

  return current?.next === null;

}

export default workflow;