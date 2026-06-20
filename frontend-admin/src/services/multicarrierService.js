/**
 * SmartLogix
 * Servicio Multicarrier
 *
 * MODO ACTUAL:
 * Datos Mock para desarrollo.
 *
 * MODO FUTURO:
 * Consumir API real desde RapidAPI.
 */

const mockQuotes = [
  {
    id: 1,
    carrier: "Starken",
    price: 4500,
    estimatedDays: 2,
    service: "Normal"
  },
  {
    id: 2,
    carrier: "Chilexpress",
    price: 5200,
    estimatedDays: 1,
    service: "Express"
  },
  {
    id: 3,
    carrier: "Blue Express",
    price: 4800,
    estimatedDays: 2,
    service: "Normal"
  }
];

/**
 * Cotización Mock
 */
export async function getShippingQuotes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockQuotes);
    }, 500);
  });
}

/*
====================================================
IMPLEMENTACIÓN API REAL (DESACTIVADA)
====================================================

const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;

export async function getShippingQuotes(payload) {

  const response = await fetch(
    "https://multicourier.p.rapidapi.com/pricing",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "multicourier.p.rapidapi.com"
      },

      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    throw new Error("Error obteniendo cotización");
  }

  return response.json();
}

====================================================
FIN IMPLEMENTACIÓN API REAL
====================================================
*/