const trackingShipments = [
  {
    id: "STK-1001",
    orderNumber: "PED-2026-00125",
    trackingNumber: "STK998877665",

    customer: "Juan Pérez",

    product: "SmartWatch Pro X",

    carrier: "Starken",

    status: "En tránsito",

    address: "Av. Apoquindo 1234",

    commune: "Las Condes",

    region: "Región Metropolitana",

    service: "Normal",

    lastUpdate: "Hace 2 horas",

    estimatedDelivery: "16-06-2026"
  },

  {
    id: "CHX-1002",
    orderNumber: "PED-2026-00126",
    trackingNumber: "CHX554433221",

    customer: "María González",

    product: "Auriculares Bluetooth",

    carrier: "Chilexpress",

    status: "En reparto",

    address: "Av. O'Higgins 555",

    commune: "Concepción",

    region: "Biobío",

    service: "Express",

    lastUpdate: "Hace 35 min",

    estimatedDelivery: "15-06-2026"
  },

  {
    id: "BLU-1003",
    orderNumber: "PED-2026-00127",
    trackingNumber: "BLU112233445",

    customer: "Carlos Rojas",

    product: "Mouse Gamer RGB",

    carrier: "Blue Express",

    status: "Preparando entrega",

    address: "Av. Alemania 100",

    commune: "Temuco",

    region: "La Araucanía",

    service: "Normal",

    lastUpdate: "Hace 1 hora",

    estimatedDelivery: "17-06-2026"
  }
];

export function getTrackingShipments() {
  return trackingShipments;
}