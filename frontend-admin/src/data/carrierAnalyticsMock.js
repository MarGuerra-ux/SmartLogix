export const carrierAnalyticsMock = {

  systemHealth: {
    status: "Operación Saludable",

    ordersToday: 128,

    activeShipments: 34,

    incidentsToday: 2,

    slaAverage: 98.4
  },

  ranking: [

    {
      carrier: "Chilexpress",

      score: 9.2,

      sla: 99.1,

      incidents: 1,

      avgCost: 5200,

      avgDays: 1.7,

      trend: "up"
    },

    {
      carrier: "Blue Express",

      score: 8.7,

      sla: 97.8,

      incidents: 4,

      avgCost: 4800,

      avgDays: 2.1,

      trend: "stable"
    },

    {
      carrier: "Starken",

      score: 6.1,

      sla: 92.3,

      incidents: 12,

      avgCost: 4500,

      avgDays: 2.9,

      trend: "down"
    }
  ],

  prediction: {

    expectedIncidents: 3,

    stableCarrier: "Chilexpress",

    riskCarrier: "Starken",

    confidence: 92
  },

  simulation: {

    currentCarrier: "Blue Express",

    suggestedCarrier: "Chilexpress",

    monthlySavings: 42000,

    incidentReduction: 18,

    deliveryImprovement: 0.8
  },

  trends: {

    labels: [
      "Lun",
      "Mar",
      "Mié",
      "Jue",
      "Vie",
      "Sáb",
      "Dom"
    ],

    incidents: [
      6,
      5,
      3,
      4,
      2,
      2,
      1
    ],

    shipments: [
      145,
      162,
      180,
      172,
      201,
      195,
      188
    ]
  }

};