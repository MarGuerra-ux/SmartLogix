import {
  carrierAnalyticsMock
} from "../data/carrierAnalyticsMock";

export function getSystemHealth() {

  return carrierAnalyticsMock.systemHealth;
}

export function getCarrierRanking() {

  return carrierAnalyticsMock.ranking;
}

export function getCarrierPrediction() {

  return carrierAnalyticsMock.prediction;
}

export function getCarrierSimulation() {

  return carrierAnalyticsMock.simulation;
}

export function getCarrierTrends() {

  return carrierAnalyticsMock.trends;
}

/*

=========================================
FUTURA INTEGRACIÓN REAL
=========================================

import {
  getShipments
} from "./shippingService";

import {
  getCarrierDecision
} from "./carrierDecisionService";

import {
  getShippingQuotes
} from "./multicarrierService";

export async function getSystemHealth() {

  const shipments =
    await getShipments();

  return {
    status: "Operación Saludable",
    ordersToday:
      shipments.length,
    ...
  };
}

export async function getCarrierRanking() {

  const carriers =
    await getCarrierDecision();

  return carriers;
}

export async function getCarrierPrediction() {

  // IA / análisis histórico

}

export async function getCarrierSimulation() {

  // cálculo real de impacto

}

=========================================
FIN IMPLEMENTACIÓN
=========================================

*/