/**
 * Motor de Selección Inteligente
 *
 * Mock inicial.
 *
 * Futuro:
 * Datos obtenidos desde:
 * - Pedidos entregados
 * - Reclamos
 * - SLA
 * - API Multicarrier
 * - Encuestas satisfacción
 */

const carrierRanking = [
  {
    carrier: "Chilexpress",
    score: 9.2,
    avgCost: 4900,
    sla: 99,
    incidents: 1
  },
  {
    carrier: "Blue Express",
    score: 8.7,
    avgCost: 4800,
    sla: 97,
    incidents: 4
  },
  {
    carrier: "Starken",
    score: 6.1,
    avgCost: 4500,
    sla: 92,
    incidents: 12
  }
];

export function getCarrierRanking() {
  return carrierRanking;
}

export function getRecommendedCarrier() {
  return carrierRanking[0];
}

/*

====================================================
IMPLEMENTACIÓN FUTURA
====================================================

export async function getCarrierRanking() {

  const shipments =
    await getCompletedShipments();

  const complaints =
    await getCarrierComplaints();

  const quotes =
    await getCurrentQuotes();

  return calculateScores(
    shipments,
    complaints,
    quotes
  );
}

====================================================
FIN IMPLEMENTACIÓN FUTURA
====================================================

*/