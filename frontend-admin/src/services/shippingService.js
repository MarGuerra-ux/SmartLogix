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

export async function getShipments() {
  const { data, error } = await supabase
    .from("shipping_quotes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error obteniendo envíos:", error);
    return [];
  }

  return data;
}

export async function createDemoShipment() {
  const demoShipment = {
    order_id: `PED-${Date.now()}`,
    tracking_code: `TRK-${Date.now()}`,
    customer_name: "María González",
    product_name: "Notebook Lenovo LOQ",
    destination: "Santiago, Metropolitana",
    destination_city: "Santiago",
    carrier_name: "Chilexpress",
    service_name: "Express",
    price: 8000,
    estimated_days: "1 día hábil",
    label: "Más rápido",
    status: "Preparando envío",
    selected: true,
    payment_status: "approved",
  };

  const { data, error } = await supabase
    .from("shipping_quotes")
    .insert([demoShipment])
    .select();

  if (error) {
    console.error("Error creando envío demo:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function updateShipmentStatus(id, status) {
  const { data, error } = await supabase
    .from("shipping_quotes")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error actualizando estado del envío:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function deleteShipment(id) {
  const { error } = await supabase
    .from("shipping_quotes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error eliminando envío:", error);
    return { success: false, error };
  }

  return { success: true };
}

export async function registerSelectedShipping(order, option) {
  const { data, error } = await supabase
    .from("shipping_quotes")
    .insert([
      {
        order_id: order.orderId,
        tracking_code: `TRK-${Date.now()}`,
        customer_name: order.customerName,
        product_name: order.productName,
        destination: order.destinationCity,
        destination_city: order.destinationCity,
        carrier_name: option.carrierName,
        service_name: option.serviceName,
        price: option.price,
        estimated_days: option.estimatedDays,
        label: option.label,
        status: "Preparando envío",
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