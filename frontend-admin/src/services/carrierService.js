const carriers = [
  {
    id: 1,
    name: "Starken",
    status: "Activo",
    shipments: 125,
    avgDelivery: "2.1 días",
    successRate: "99%",
    tracking: true,
    labels: true,
    apiConnected: true
  },
  {
    id: 2,
    name: "Chilexpress",
    status: "Activo",
    shipments: 97,
    avgDelivery: "1.7 días",
    successRate: "98%",
    tracking: true,
    labels: true,
    apiConnected: true
  },
  {
    id: 3,
    name: "Blue Express",
    status: "Activo",
    shipments: 56,
    avgDelivery: "2.8 días",
    successRate: "97%",
    tracking: true,
    labels: true,
    apiConnected: true
  }
];

const recentShipments = [
  {
    id: "STK-1001",
    carrier: "Starken",
    status: "Entregado"
  },
  {
    id: "CHX-1002",
    carrier: "Chilexpress",
    status: "En tránsito"
  },
  {
    id: "BLU-1003",
    carrier: "Blue Express",
    status: "Preparando entrega"
  }
];

const DEFAULT_ASSIGNMENT_SETTINGS = {
  assignmentMode: "restricted",

  selectedCarrier: "Blue Express",

  enabledCarriers: [
    "Chilexpress",
    "Blue Express"
  ]
};

export const getCarriers = () => carriers;

export const getRecentShipments = () => recentShipments;

/**
 * Obtiene configuración de asignación
 */
export const getAssignmentSettings = () => {

  const saved = localStorage.getItem(
    "smartlogix_assignment_settings"
  );

  if (!saved) {
    return DEFAULT_ASSIGNMENT_SETTINGS;
  }

  return JSON.parse(saved);
};

/**
 * Guarda configuración
 */
export const saveAssignmentSettings = (
  settings
) => {

  localStorage.setItem(
    "smartlogix_assignment_settings",
    JSON.stringify(settings)
  );

  return true;
};

/*

====================================================
IMPLEMENTACIÓN FUTURA SUPABASE
====================================================

export async function getAssignmentSettings() {

  const { data } = await supabase
    .from("carrier_settings")
    .select("*")
    .single();

  return data;
}

export async function saveAssignmentSettings(
  settings
) {

  return await supabase
    .from("carrier_settings")
    .upsert(settings);
}

====================================================
FIN IMPLEMENTACIÓN SUPABASE
====================================================

*/