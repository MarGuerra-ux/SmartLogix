import { supabase } from "../lib/supabase";

export const demoShippingOptions = [
  {
    carrierName: "Starken",
    serviceName: "Envío Normal",
    price: 5000,
    estimatedDays: "5 días hábiles",
    label: "Más económico",
  },
  {
    carrierName: "Chilexpress",
    serviceName: "Express",
    price: 8000,
    estimatedDays: "1 día hábil",
    label: "Más rápido",
  },
  {
    carrierName: "Blue Express",
    serviceName: "Estándar",
    price: 6500,
    estimatedDays: "2 a 3 días hábiles",
    label: "Recomendado",
  },
];

export async function registerSelectedShipping(order, option) {
  const { data, error } = await supabase
    .from("shipping_quotes")
    .insert([
      {
        order_id: order.orderId,
        customer_name: order.customerName,
        product_name: order.productName,
        destination_city: order.destinationCity,
        carrier_name: option.carrierName,
        service_name: option.serviceName,
        price: option.price,
        estimated_days: option.estimatedDays,
        label: option.label,
        selected: true,
        payment_status: "approved",
      },
    ])
    .select();

  if (error) {
    console.error("Error registrando envío:", error);
    return { success: false, error };
  }

  return { success: true, data };
}