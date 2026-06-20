const auditLogs = [

  {
    entityType: "ORDER",
    entityId: "ORD-2026-00015",

    summary: {
      status: "Procesado correctamente",
      totalTime: "3.8 s",
      services: 7
    },

    events: [

      {
        id: 1,
        time: "09:14:02",
        service: "OrderService",
        title: "Pedido recibido",
        status: "SUCCESS"
      },

      {
        id: 2,
        time: "09:14:04",
        service: "OrderValidationService",
        title: "Stock validado",
        status: "SUCCESS"
      },

      {
        id: 3,
        time: "09:14:06",
        service: "CarrierDecisionService",
        title: "Courier seleccionado",
        detail: "Chilexpress",
        status: "SUCCESS"
      },

      {
        id: 4,
        time: "09:14:08",
        service: "ShippingService",
        title: "Etiqueta PDF generada",
        status: "SUCCESS"
      },

      {
        id: 5,
        time: "09:14:09",
        service: "NotificationService",
        title: "Correo enviado",
        status: "SUCCESS"
      },

      {
        id: 6,
        time: "09:14:12",
        service: "TrackingService",
        title: "Tracking iniciado",
        detail: "TRK-548221",
        status: "SUCCESS"
      }

    ],

    documents: {

      invoicePdf: true,

      creditNotePdf: false,

      shippingLabel: true

    },

    notifications: {

      emailCustomer: true,

      courierNotified: true,

      smsSent: false

    },

    technical: {

      user: "Sistema",

      response: "200 OK",

      retries: 1

    }

  },

  {

    entityType: "SHIPMENT",

    entityId: "ENV-2026-00008",

    summary: {

      status: "En tránsito",

      totalTime: "2 días",

      services: 5

    },

    events: [

      {

        id: 1,

        time: "10:22",

        service: "ShippingService",

        title: "Envío creado",

        status: "SUCCESS"

      },

      {

        id: 2,

        time: "10:24",

        service: "CarrierDecisionService",

        title: "Courier asignado",

        detail: "Blue Express",

        status: "SUCCESS"

      },

      {

        id: 3,

        time: "10:31",

        service: "TrackingService",

        title: "En tránsito",

        status: "SUCCESS"

      }

    ],

    documents: {

      shippingLabel: true

    },

    notifications: {

      emailCustomer: true

    },

    technical: {

      user: "Sistema",

      response: "200 OK",

      retries: 1

    }

  },

  {

    entityType: "REFUND",

    entityId: "REF-2026-00004",

    summary: {

      status: "Reembolso completado",

      totalTime: "4 min",

      services: 4

    },

    events: [

      {

        id: 1,

        time: "11:02",

        service: "RefundService",

        title: "Solicitud creada",

        status: "SUCCESS"

      },

      {

        id: 2,

        time: "11:04",

        service: "RefundService",

        title: "Nota de crédito PDF",

        status: "SUCCESS"

      },

      {

        id: 3,

        time: "11:05",

        service: "NotificationService",

        title: "Correo enviado",

        status: "SUCCESS"

      }

    ],

    documents: {

      creditNotePdf: true

    },

    notifications: {

      emailCustomer: true

    },

    technical: {

      user: "Sistema",

      response: "200 OK",

      retries: 1

    }

  }

];

export default auditLogs;