import {
  registerAuditEvent
} from "./auditLogService";

const workflow = [

  {
    id: 1,
    title: "Pedido recibido",
    service: "OrderService",
    duration: 1000
  },

  {
    id: 2,
    title: "Validar Stock",
    service: "OrderValidationService",
    duration: 1200
  },

  {
    id: 3,
    title: "Seleccionar Courier",
    service: "CarrierDecisionService",
    duration: 1400
  },

  {
    id: 4,
    title: "Consultar Multicarrier",
    service: "MulticarrierService",
    duration: 1200
  },

  {
    id: 5,
    title: "Generar Etiqueta",
    service: "ShippingService",
    duration: 1300
  },

  {
    id: 6,
    title: "Registrar Tracking",
    service: "TrackingService",
    duration: 1200
  },

  {
    id: 7,
    title: "Enviar Notificación",
    service: "NotificationService",
    duration: 900
  }

];

export function getWorkflowSteps() {

  return workflow.map(step => ({

    ...step,

    status: "pending"

  }));

}

export async function runWorkflow(

  updateSteps,

  updateProgress,

  updateCurrentService,

  updateCurrentTitle,

  finishCallback

) {

  let steps = getWorkflowSteps();

  updateSteps([...steps]);

  for (let i = 0; i < steps.length; i++) {

    steps[i].status = "active";

    updateCurrentService(

      steps[i].service

    );

    updateCurrentTitle(

      steps[i].title

    );

    updateSteps([...steps]);

    await wait(

      steps[i].duration

    );

    registerAuditEvent(

      "ORDER",

      "ORD-2026-00015",

      {

        service:

          steps[i].service,

        title:

          steps[i].title,

        status:

          "SUCCESS"

      }

    );

    steps[i].status = "completed";

    updateSteps([...steps]);

    updateProgress(

      Math.round(

        ((i + 1) /

          steps.length) *

          100

      )

    );

  }

  updateCurrentService("");

  updateCurrentTitle("");

  finishCallback();

}

function wait(ms) {

  return new Promise(

    resolve =>

      setTimeout(

        resolve,

        ms

      )

  );

}